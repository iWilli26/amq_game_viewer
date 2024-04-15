import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongService } from 'src/app/service/song/song.service';
import { Song } from 'src/model/amq';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  currentSong: Song | null = null;
  subscription: Subscription;
  constructor(private songService: SongService) {
    this.subscription = songService.currentSong$.subscribe((song) => {
      this.currentSong = song;
    });
  }

  test() {
    console.log(this.currentSong);
  }
}
