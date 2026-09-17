import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

type MovieGridProps = {
  movies: Movie[]
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
}: MovieGridProps) {
  return (
    <section>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.some(
            (favorite) => favorite.id === movie.id
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default MovieGrid