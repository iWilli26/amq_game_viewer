import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Amq, Song } from 'src/model/amq';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { OnInit } from '@angular/core';
import { Anime, AnimeTheme, AnimeThemeResponse } from 'src/model/animeTheme';
import { AnilistResponse } from 'src/model/anilist';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Song) {}

  defaultAnime: Anime = {
    id: 0,
    name: '',
    media_format: '',
    season: '',
    slug: '',
    synopsis: '',
    year: 0,
    animethemes: [],
  };

  animeNotFound = false;

  anilistFetched: AnilistResponse = {
    id: 0,
    title: {
      userPreferred: '',
      english: '',
      romaji: '',
    },
    coverImage: {
      extraLarge: '',
      large: '',
      medium: '',
      color: '',
    },
    description: '',
  };

  animeThemeFetched: AnimeThemeResponse = {
    anime: [],
    links: {
      first: '',
      last: '',
      prev: '',
      next: '',
    },
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      path: '',
      per_page: 0,
      to: 0,
      total: 0,
      links: [],
    },
  };

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  clickedAnime: Anime = this.defaultAnime;

  clickedAnimeTheme: AnimeTheme = {
    id: 0,
    group: '',
    sequence: 0,
    slug: '',
    type: '',
    animethemeentries: [],
    songs: [],
  };

  //create an async boolean to check if the data has been fetched
  //if the data has been fetched, then display the data
  themeLoaded = false;

  fetchData = async () => {
    try {
      const responseAnilist = await axios.post(
        'https://graphql.anilist.co',
        JSON.stringify({
          query: query,
          variables: {
            id: this.data.songInfo.siteIds.aniListId,
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
      }

      for (let i = 0; i < this.clickedAnime.animethemes.length; i++) {
        if (
          this.clickedAnime.animethemes[i].slug === this.data.songInfo.fullType
        ) {
          this.clickedAnimeTheme = this.clickedAnime.animethemes[i];
          this.themeLoaded = true;
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  ngOnInit() {
    this.fetchData();
  }

  onVideoLoaded(): void {
    console.log('Video loaded');
    this.play();
  }

  play = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.paused ? video.play() : video.pause();
  };

  changeVolume = (event: Event) => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const volume = (event.target as HTMLInputElement).value;
    video.volume = parseFloat(volume) / 100;
  };
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
