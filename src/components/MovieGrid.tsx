import MovieCard from "./MovieCard"
import { movies } from "../data/movies"

type MovieGridProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function MovieGrid({
  favorites,
  onToggleFavorite,
}: MovieGridProps) {
  return (
    <section>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default MovieGrid