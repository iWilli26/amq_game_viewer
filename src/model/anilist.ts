export interface AnilistResponse {
  id: number;
  title: {
    userPreferred: string;
    english: string;
    romaji: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  description: string;
}

export const emptyAnilist: AnilistResponse = {
  id: 0,
  title: {
    userPreferred: '',
    english: '',
    romaji: '',
  },
  coverImage: {
    extraLarge: '',
    large: '',
    medium: '',
    color: '',
  },
  description: '',
};
