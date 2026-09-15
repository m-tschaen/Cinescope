import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

type FavoritesProps = {
  movies: Movie[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function Favorites({
  movies,
  favorites,
  onToggleFavorite,
}: FavoritesProps) {
  const favoriteMovies = movies.filter((movie) =>
    favorites.includes(movie.id)
  )

  return (
    <section>
      <h1>Mes favoris</h1>

      {favoriteMovies.length === 0 ? (
        <>
          <p>Vous n'avez pas encore de favoris.</p>
          <p>Ajoutez des films à vos favoris pour les retrouver ici.</p>
          <button>Découvrir les films</button>
        </>
      ) : (
        favoriteMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      )}
    </section>
  )
}

export default Favorites