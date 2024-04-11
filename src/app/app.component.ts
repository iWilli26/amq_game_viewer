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
    if (file.type !== 'application/json') {
      console.error('Error: File type must be JSON');
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        this.jsonData = JSON.parse(reader.result as string);
        this.jsonData.songs = this.jsonData.songs.map((song, index) => {
          song.songInfo.anime =
            song.songInfo.animeNames.english !== song.songInfo.animeNames.romaji
              ? song.songInfo.animeNames.english +
                '\n' +
                song.songInfo.animeNames.romaji
              : song.songInfo.animeNames.english;
          song.songInfo.fullType =
            song.songInfo.type === 1
              ? 'OP' + song.songInfo.typeNumber
              : song.songInfo.type === 2
              ? 'ED' + song.songInfo.typeNumber
              : 'Insert';

          return song;
        });
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
  }
}
