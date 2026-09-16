import MovieCard from "./MovieCard"
import { movies } from "../data/movies"
import type { Movie } from "../types/Movie"

type MovieGridProps = {
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
  search: string
  onResetSearch: () => void
}

function MovieGrid({
  favorites,
  onToggleFavorite,
  search,
  onResetSearch,
}: MovieGridProps) {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredMovies.length === 0) {
    return (
      <section>
        <p>Aucun film trouvé</p>
        <p>Essayez avec un autre titre ou une autre recherche.</p>

        <button onClick={onResetSearch}>
          Réinitialiser la recherche
        </button>
      </section>
    )
  }

  return (
    <section>
      {filteredMovies.map((movie) => (
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