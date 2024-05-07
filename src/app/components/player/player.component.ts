import { Component } from '@angular/core';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { SongService } from 'src/app/service/song/song.service';
import { Song, emptySong } from 'src/model/amq';
import { AnilistResponse, emptyAnilist } from 'src/model/anilist';
import {
  Anime,
  AnimeTheme,
  AnimeThemeResponse,
  emptyAnime,
  emptyAnimeTheme,
  emptyAnimeThemeResponse,
} from 'src/model/animeTheme';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  currentSong: Song | undefined = undefined;
  subscription: Subscription;
  constructor(private songService: SongService) {
    this.subscription = songService.currentSong$.subscribe(async (song) => {
      this.currentSong = song;
      console.log('1');

      if (!this.currentSong) {
        return;
      }
      console.log('2');

      if (this.currentSong.videoUrl) {
        console.log('3');
        this.loadVideo(this.currentSong.videoUrl);
      } else {
        console.log('4');
        await this.loadURL();
      }
    });
  }

  defaultAnime: Anime = emptyAnime;

  animeNotFound = false;

  anilistFetched: AnilistResponse = emptyAnilist;

  animeThemeFetched: AnimeThemeResponse = emptyAnimeThemeResponse;

  themeLoaded = false;

  clickedAnime: Anime = this.defaultAnime;

  clickedAnimeTheme: AnimeTheme = emptyAnimeTheme;

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  loadURL = async () => {
    this.clickedAnime = this.defaultAnime;
    if (this.currentSong === undefined) {
      return;
    }
    try {
      const responseAnilist = await axios.post(
        'https://graphql.anilist.co',
        JSON.stringify({
          query: query,
          variables: {
            id: this.currentSong.songInfo.siteIds.aniListId,
          },
        }),
        {
          headers: this.headers,
        }
      );
      this.anilistFetched = responseAnilist.data.data.Media;

      const otherURL =
        'https://api.animethemes.moe/anime?page[size]=15&page[number]=1&q=' +
        this.anilistFetched.title.userPreferred.replaceAll(' ', '+') +
        '&include=animethemes.animethemeentries.videos,animethemes.song';

      const responseAnimeTheme = await axios.get(otherURL);
      this.animeThemeFetched = responseAnimeTheme.data;

      this.animeThemeFetched.anime.forEach((anime) => {
        if (
          slugify(anime.name.toLowerCase()) ===
            slugify(this.anilistFetched.title.userPreferred) ||
          slugify(anime.name.toLowerCase()) ===
            slugify(this.anilistFetched.title.english) ||
          slugify(anime.name.toLowerCase()) ===
            slugify(this.anilistFetched.title.romaji)
        ) {
          this.clickedAnime = anime;
        }
      });
      if (this.clickedAnime === this.defaultAnime) {
        this.animeNotFound = true;
        console.log('Anime not found');
        this.themeLoaded = false;
        //show error message in the UI
        return;
      }

      for (let i = 0; i < this.clickedAnime.animethemes.length; i++) {
        if (
          this.clickedAnime.animethemes[i].slug ===
          this.currentSong.songInfo.fullType
        ) {
          this.clickedAnimeTheme = this.clickedAnime.animethemes[i];
          break;
        }
      }
      this.loadVideo(
        this.clickedAnimeTheme.animethemeentries[0].videos[0].link as string
      );
    } catch (error) {
      console.log('error');
      console.error(error);
    }
  };

  loadVideo(videoUrl: string): void {
    console.log('5');
    this.themeLoaded = true;

    const videoElement = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = videoUrl;
      videoElement.load();
      //first vid not loading correctly
      videoElement.onloadeddata = () => {
        console.log('6');

        this.play();
      };
    }
  }

  play = () => {
    const video = document.getElementById('videoPlayer') as HTMLVideoElement;
    video.paused ? video.play() : video.pause();
  };

  changeVolume = (event: Event) => {
    const video = document.getElementById('videoPlayer') as HTMLVideoElement;
    const volume = (event.target as HTMLInputElement).value;
    video.volume = parseFloat(volume) / 100;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

const slugify = (str: String) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '') // remove leading, trailing -
    .replace(/-/g, ''); // replace remaining - with nothing

const query = `
    query ($id: Int) { 
      Media (id: $id, type: ANIME) { 
        id
        title {
          userPreferred
          english
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        description
      }
    }
    `;
