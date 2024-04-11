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
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

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
    'fullType',
    'artist',
    'songName',
    'anime',
    'vintage',
  ];

  showDetails = (row: MatDialogConfig<Song>) => {
    const dialogRef = this.dialog.open(DetailsDialogComponent, { data: row });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  };
}
