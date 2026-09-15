import MovieCard from "./MovieCard"
import { movies } from "../data/movies"

type MovieGridProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
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
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default MovieGrid