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
