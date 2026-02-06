export interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

export interface PlatformDetails {
  id: number;
  slug: string;
  name: string;
}

export interface Requirements {
  minimum: string;
  recommended: string;
}

export interface Platform {
  platform: PlatformDetails;
  released_at: string;
  requirements: Requirements;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings:object;
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: object;
  description: string;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: EsrbRating;
  platforms: Platform[];
}

export interface GamesResponse {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}
