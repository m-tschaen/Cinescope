import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

type SearchResultsProps = {
  movies: Movie[]
  favorites: Movie[]
  hasSearched: boolean
  onToggleFavorite: (movie: Movie) => void
}

function SearchResults({
  movies,
  favorites,
  hasSearched,
  onToggleFavorite,
}: SearchResultsProps) {
  if (hasSearched && movies.length === 0) {
    return (
      <section>
        <p>Aucun résultat pour cette recherche.</p>
        <p>Essayez avec un autre titre.</p>
      </section>
    )
  }

  if (movies.length === 0) {
    return null
  }

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

export default SearchResults