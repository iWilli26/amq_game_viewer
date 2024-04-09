import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [BrowserModule, MatTableModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
