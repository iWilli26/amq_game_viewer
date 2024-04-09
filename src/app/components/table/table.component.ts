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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(public dialog: MatDialog) {}

  @Input() jsonData: Amq = {
    roomName: '',
    startTime: '',
    songs: [],
  };
  displayedColumns: string[] = [
    'songNumber',
    'artist',
    'songName',
    'anime',
    'vintage',
  ];

  //i want row to be of type Song

  showDetails = (row: MatDialogConfig<Song>) => {
    const dialogRef = this.dialog.open(DialogDetails, { data: row });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
    console.log(row);
  };
}

@Component({
  selector: 'details-dialog',
  templateUrl: '../details-dialog/details-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDetails {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Song) {}
}
