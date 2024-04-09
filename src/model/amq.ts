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
};

export type SongInfo = {
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
