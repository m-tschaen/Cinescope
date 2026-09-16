import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

type FavoritesProps = {
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function Favorites({
  favorites,
  onToggleFavorite,
}: FavoritesProps) {
  return (
    <section>
      <h1>Mes favoris</h1>

      {favorites.length === 0 ? (
        <>
          <p>Vous n'avez pas encore de favoris.</p>
          <p>
            Ajoutez des films à vos favoris pour les retrouver ici.
          </p>

          <Link to="/movies">
            Découvrir les films
          </Link>
        </>
      ) : (
        favorites.map((movie) => (
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