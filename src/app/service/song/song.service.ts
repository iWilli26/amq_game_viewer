import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Song } from 'src/model/amq';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  song: Song = {
    songNumber: 0,
    songInfo: {
      fullType: '',
      animeNames: { english: '', romaji: '' },
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
      siteIds: { aniListId: 0, malId: 0, annId: 0, kitsuId: 0 },
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
    videoUrl: '',
    correctGuessPlayers: [],
    listStates: [],
  };

  private currentSong: BehaviorSubject<Song> = new BehaviorSubject(this.song);
  public currentSong$: Observable<Song> = this.currentSong.asObservable();

  constructor() {}

  getSong(): Observable<Song> {
    const song = of(this.song);
    return song;
  }

  setSong(song: Song): void {
    this.currentSong.next(song);
    console.log(song);
  }
}
