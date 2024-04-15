import { Component, Inject, Input } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { SongService } from 'src/app/service/song/song.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  currentSong: Song | null = null;
  subscription: Subscription;
  constructor(public dialog: MatDialog, private songService: SongService) {
    this.subscription = this.songService.currentSong$.subscribe((song) => {
      this.currentSong = song;
    });
  }

  @Input() jsonData: Amq = {
    roomName: '',
    startTime: '',
    songs: [],
  };
  displayedColumns: string[] = [
    'songNumber',
    'fullType',
    'artist',
    'songName',
    'anime',
    'vintage',
  ];

  setSong = (row: Song) => {
    this.songService.setSong(row);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
