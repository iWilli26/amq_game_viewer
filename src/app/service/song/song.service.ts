import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Song, emptySong } from 'src/model/amq';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  song: Song | undefined = undefined;

  private currentSong: BehaviorSubject<Song | undefined> = new BehaviorSubject(
    this.song
  );
  public currentSong$: Observable<Song | undefined> =
    this.currentSong.asObservable();

  constructor() {}

  getSong(): Observable<Song | undefined> {
    const song = of(this.song);
    return song;
  }

  setSong(song: Song): void {
    this.currentSong.next(song);
  }
}
