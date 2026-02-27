export type EsrbRating = {
  id: number;
  slug: string;
  name: string;
}

export type PlatformDetails = {
  id: number;
  slug: string;
  name: string;
}

export type Requirements = {
  minimum: string;
  recommended: string;
}

export type Platform = {
  platform: PlatformDetails;
  released_at: string;
  requirements: Requirements;
}

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: object;
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

export type GamesResponse = {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}
