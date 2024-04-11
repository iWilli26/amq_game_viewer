import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Amq, Song } from 'src/model/amq';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { OnInit } from '@angular/core';
import { AnimeThemeResponse } from 'src/model/animeTheme';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Song) {}

  query = `
  query ($id: Int) { 
    Media (id: $id, type: ANIME) { 
      id
      title {
        userPreferred
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

  variables = {
    id: this.data.songInfo.siteIds.aniListId,
  };

  animeThemeURL = `https://api.animethemes.moe/search?page[limit]=4&fields[search]=animethemes&q=${
    this.data.songInfo.animeNames.english.replaceAll(' ', '+') +
    '+' +
    this.data.songInfo.fullType
  }&include[anime]=animethemes.animethemeentries.videos,animethemes.song,images&include[animetheme]=animethemeentries.videos,anime.images,song.artists&include[artist]=images,songs&fields[anime]=name,slug,year,season&fields[animetheme]=type,sequence,slug,group,id&fields[animethemeentry]=version,episodes,spoiler,nsfw&fields[video]=id,tags,resolution,nc,subbed,lyrics,uncen,source,overlap,basename&fields[image]=facet,link&fields[song]=id,title&fields[artist]=name,slug&fields[series]=name,slug`;

  fetchedData: AnimeThemeResponse = {
    search: {
      animethemes: [],
    },
  };

  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  fetchData = async () => {
    try {
      // const response = await axios.post(
      //   'https://graphql.anilist.co',
      //   JSON.stringify({
      //     query: this.query,
      //     variables: this.variables,
      //   }),
      //   {
      //     headers: this.headers,
      //   }
      // );
      const response = await axios.get(this.animeThemeURL);
      this.fetchedData = response.data;
      console.log(this.fetchedData.search);
    } catch (error) {
      console.error(error);
    }
  };

  ngOnInit() {
    this.fetchData();
    console.log(this.animeThemeURL);
  }
}
