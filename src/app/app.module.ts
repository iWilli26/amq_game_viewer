import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { PlayerComponent } from './components/player/player.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DetailsDialogComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
