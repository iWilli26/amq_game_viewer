export type Amq = {
  roomName: string;
  startTime: string;
  songs: Song[];
};

export type Song = {
  songNumber: number;
  songInfo: SongInfo;
  answer: string;
  correctGuess: number;
  wrongGuess: boolean;
  correctCount: number;
  wrongCount: number;
  startPoint: number;
  videoLength: number;
  videoUrl: string | null;
  correctGuessPlayers: string[] | null;
  listStates: { name: string; status: number; score: number }[] | null;
};

export const emptySong: Song = {
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

export type SongInfo = {
  fullType: string;
  animeNames: Names;
  anime: string;
  altAnimeNames: string[];
  altAnimeNamesAnswers: string[];
  artist: string;
  songName: string;
  type: number;
  typeNumber: number;
  annId: number;
  animeScore: number;
  animeType: string;
  vintage: string;
  animeDifficulty: number;
  siteIds: SiteIds;
  animeTags: string[];
  animeGenre: string[];
};

export type Names = {
  english: string;
  romaji: string;
};

export type SiteIds = {
  aniListId: number;
  malId: number;
  annId: number;
  kitsuId: number;
};
