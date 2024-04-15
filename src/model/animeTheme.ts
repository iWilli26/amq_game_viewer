export interface AnimeThemeResponse {
  anime: Anime[];
  links: {
    first: String;
    last: String;
    prev: String;
    next: String;
  };
  meta: {
    current_page: Number;
    from: Number;
    last_page: Number;
    path: String;
    per_page: Number;
    to: Number;
    total: Number;
    links: {
      url: String;
      label: String;
      active: Boolean;
    }[];
  };
}

export interface Anime {
  id: Number;
  name: String;
  media_format: String;
  season: String;
  slug: String;
  synopsis: String;
  year: Number;
  animethemes: AnimeTheme[];
}

export interface AnimeTheme {
  id: Number;
  group: String;
  sequence: Number;
  slug: String;
  type: String;
  animethemeentries: AnimeThemeEntry[];
  songs: ThemeSong[];
}
export interface Image {
  facet: String;
  link: String;
}

export interface AnimeThemeEntry {
  id: Number;
  notes: String;
  episodes: Number;
  nsfw: Boolean;
  spoiler: Boolean;
  version: Number;
  videos: Video[];
}

export interface Video {
  id: Number;
  basename: String;
  filename: String;
  lyrics: Boolean;
  nc: Boolean;
  overlap: String;
  path: String;
  resolution: Number;
  size: Number;
  source: String;
  subbed: Boolean;
  uncen: Boolean;
  tags: String;
  link: String;
}

export interface ThemeSong {
  id: Number;
  title: String;
  artists: Artist[];
}

export interface Artist {
  as: String;
}
