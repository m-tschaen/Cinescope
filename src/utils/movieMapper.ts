import type { Movie } from "../types/Movie"
import type { TmdbMovie } from "../types/Tmdb"

export function toMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
    releaseDate: movie.release_date,
    rating: movie.vote_average,
  }
}