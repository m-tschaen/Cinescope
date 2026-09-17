export interface TmdbMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export interface TmdbMoviesResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbCountry {
  iso_3166_1: string
  name: string
}

export interface TmdbMovieDetails {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genres: TmdbGenre[]
  runtime: number
  overview: string
  original_language: string
  production_countries: TmdbCountry[]
}