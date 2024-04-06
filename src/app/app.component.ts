import { Component } from '@angular/core';
import { Amq } from 'src/model/amq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AMQ';
  jsonData: Amq = {
    roomName: '',
    startTime: '',
    songs: [],
  };
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log(file);
    if (file.type !== 'application/json') {
      console.error('Error: File type must be JSON');
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      try {
        this.jsonData = JSON.parse(reader.result as string);
        console.log(this.jsonData.songs);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
  }
}
