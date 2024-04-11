export interface AnimeThemeResponse {
  search: { animethemes: AnimeTheme[] };
}

export interface AnimeTheme {
  id: Number;
  group: String;
  slug: String;
  type: String;
  sequence: Number;
  anime: Anime;
  entries: AnimeThemeEntry[];
  songs: ThemeSong[];
}

export interface Anime {
  name: String;
  slug: String;
  year: Number;
  season: String;
  images: Image[];
}

export interface Image {
  facet: String;
  link: String;
}

export interface AnimeThemeEntry {
  version: Number;
  episodes: Number;
  spoiler: Boolean;
  nsfw: Boolean;
  videos: Video[];
}

export interface Video {
  id: Number;
  tags: String;
  resolution: Number;
  nc: Boolean;
  subbed: Boolean;
  lyrics: Boolean;
  uncen: Boolean;
  source: String;
  overlap: Boolean;
  basename: String;
}

export interface ThemeSong {
  id: Number;
  title: String;
  artists: Artist[];
}

export interface Artist {
  as: String;
}
