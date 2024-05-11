import { Component } from '@angular/core';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { SongService } from 'src/app/service/song/song.service';
import { Song, SongInfo, emptySong } from 'src/model/amq';
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
  cache: { key: string; urlFound: boolean | undefined }[] = [];
  currentSong: Song | undefined = undefined;
  songSubscription: Subscription;
  mode: 'determinate' | 'query' = 'query';
  progressFilled: number = 100;
  constructor(private songService: SongService) {
    this.songSubscription = songService.currentSong$.subscribe(async (song) => {
      const progressBar = document.getElementById('progress-bar');
      progressBar?.style.setProperty('display', 'block');
      progressBar?.style.setProperty(
        '--mdc-linear-progress-active-indicator-color',
        '#3f51b5'
      );
      this.mode = 'query';
      this.currentSong = song;
      if (!this.currentSong) {
        return;
      }
      const key = toCashKey(this.currentSong);
      const videoUrl = this.currentSong.videoUrl;
      const video = document.getElementById('videoPlayer') as HTMLVideoElement;
      video.pause();
      if (videoUrl) {
        this.loadVideo(this.currentSong.videoUrl);
        return;
      }
      //check if the key is in the cache
      const cacheEntry = this.cache.find((entry) => entry.key === key);
      if (cacheEntry) {
        if (videoUrl) {
          this.loadVideo(this.currentSong.videoUrl);
        } else {
          video.style.display = 'none';
          progressBar?.style.setProperty(
            '--mdc-linear-progress-active-indicator-color',
            'red'
          );
          this.mode = 'determinate';
        }
      } else {
        const urlFound = (await this.loadURL()) ? true : false;
        if (!this.cache.includes({ key, urlFound })) {
          this.cache.push({ key, urlFound });
        }
      }
    });
  }

  isLoading: boolean = false;

  defaultAnime: Anime = emptyAnime;

  animeNotFound: boolean = true;

  anilistFetched: AnilistResponse = emptyAnilist;

  animeThemeFetched: AnimeThemeResponse = emptyAnimeThemeResponse;

  clickedAnime: Anime = this.defaultAnime;

  clickedAnimeTheme: AnimeTheme = emptyAnimeTheme;

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  loadURL = async (): Promise<string | undefined> => {
    this.isLoading = true;
    const progressBar = document.getElementById('progress-bar');
    progressBar?.style.setProperty('display', 'block');
    progressBar?.style.setProperty(
      '--mdc-linear-progress-active-indicator-color',
      '#3f51b5'
    );
    this.mode = 'query';
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
      for (
        let i = 0;
        i < responseAnilist.data.data.Media.relations.edges.length;
        i++
      ) {
        if (
          responseAnilist.data.data.Media.relations.edges[i].relationType ===
          'PARENT'
        ) {
          const responseAnilistParent = await axios.post(
            'https://graphql.anilist.co',
            JSON.stringify({
              query: query,
              variables: {
                id: responseAnilist.data.data.Media.relations.edges[i].node.id,
              },
            }),
            {
              headers: this.headers,
            }
          );
          this.anilistFetched = responseAnilistParent.data.data.Media;
          break;
        }
      }

      const otherURL =
        'https://api.animethemes.moe/anime?page[size]=15&page[number]=1&q=' +
        this.anilistFetched.title.userPreferred.replaceAll(' ', '+') +
        '&include=animethemes.animethemeentries.videos,animethemes.song';

      const responseAnimeTheme = await axios.get(otherURL);
      this.animeThemeFetched = responseAnimeTheme.data;

      for (let i = 0; i < this.animeThemeFetched.anime.length; i++) {
        if (
          slugify(this.animeThemeFetched.anime[i].name.toLowerCase()) ===
            slugify(this.anilistFetched.title.userPreferred) ||
          slugify(this.animeThemeFetched.anime[i].name.toLowerCase()) ===
            slugify(this.anilistFetched.title.english) ||
          slugify(this.animeThemeFetched.anime[i].name.toLowerCase()) ===
            slugify(this.anilistFetched.title.romaji)
        ) {
          this.clickedAnime = this.animeThemeFetched.anime[i];
          break;
        }
      }

      if (this.clickedAnime === this.defaultAnime) {
        this.animeNotFound = true;

        progressBar?.style.setProperty(
          '--mdc-linear-progress-active-indicator-color',
          'red'
        );
        this.mode = 'determinate';
        return;
      }

      for (let i = 0; i < this.clickedAnime.animethemes.length; i++) {
        if (
          this.clickedAnime.animethemes[i].slug ===
          this.currentSong.songInfo.fullType
        ) {
          this.clickedAnimeTheme = this.clickedAnime.animethemes[i];
          this.currentSong.videoUrl = this.clickedAnimeTheme
            .animethemeentries[0].videos[0].link as string;
          break;
        }
      }

      if (this.currentSong.videoUrl === undefined) {
        this.animeNotFound = true;

        progressBar?.style.setProperty(
          '--mdc-linear-progress-active-indicator-color',
          'red'
        );
        this.mode = 'determinate';
        return;
      }

      this.loadVideo(this.currentSong.videoUrl);

      return this.currentSong.videoUrl;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  loadVideo(videoUrl: string): void {
    const videoElement = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;
    this.animeNotFound = false;
    if (videoElement) {
      videoElement.src = videoUrl;
      videoElement.load();
      videoElement.onloadeddata = () => {
        this.play();
        document
          .getElementById('progress-bar')
          ?.style.setProperty('display', 'none');
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
    this.songSubscription.unsubscribe();
  }
}

const slugify = (str: String) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^-+|-+$/g, '');

const toCashKey = (song: Song) => {
  return `${song.songInfo.artist}-${song.songInfo.songName}`;
};

const query = `
    query ($id: Int) { 
      Media (id: $id, type: ANIME) { 
        id
			  type
    		format
        relations {
          edges{
            relationType
            node {
              id
              title{
                userPreferred
              }
            }
          }
        }
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
