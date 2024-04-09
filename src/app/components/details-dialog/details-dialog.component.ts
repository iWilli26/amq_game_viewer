import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Amq, Song } from 'src/model/amq';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent {
  @Inject(MAT_DIALOG_DATA) public data: Song = {
    songNumber: 0,
    songInfo: {
      animeNames: {
        english: '',
        romaji: '',
      },
      anime: '',
      altAnimeNames: [],
      altAnimeNamesAnswers: [],
      artist: '',
      songName: '',
      type: 0,
      typeNumber: 0,
      annId: 0,
      animeScore: 0,
      animeType: '',
      vintage: '',
      animeDifficulty: 0,
      siteIds: {
        annId: 0,
        malId: 0,
        kitsuId: 0,
        aniListId: 0,
      },
      animeTags: [],
      animeGenre: [],
    },
    answer: '',
    correctGuess: 0,
    wrongGuess: false,
    correctCount: 0,
    wrongCount: 0,
    startPoint: 0,
    videoLength: 0,
  };

  fetchedData: any = {};

  ngOnInit(): void {
    axios.get;
  }
}
