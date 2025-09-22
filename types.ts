export enum EntertainmentType {
  Movie = 'Movie',
  TVShow = 'TV Show',
  Book = 'Book',
  Game = 'Game',
}

export interface Recommendation {
  title: string;
  type: EntertainmentType;
  year: number;
  genres: string[];
  rating: number; // e.g., 8.5
  short_description: string;
  personalization_reason: string;
  poster_url?: string;
}