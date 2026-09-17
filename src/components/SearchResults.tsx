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
      <section className="rounded-xl bg-gray-800 p-8 text-center">
        <p className="mb-2 text-xl font-bold text-white">
          Aucun résultat pour cette recherche.
        </p>

        <p className="text-gray-400">
          Essayez avec un autre titre.
        </p>
      </section>
    )
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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