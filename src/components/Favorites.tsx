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
      <h1 className="mb-8 text-4xl font-bold">
        Mes favoris
      </h1>

      {favorites.length === 0 ? (
        <div className="rounded-xl bg-gray-800 p-8 text-center">
          <p className="mb-2 text-xl font-bold">
            Vous n'avez encore aucun film favori.
          </p>

          <p className="mb-6 text-gray-400">
            Ajoutez des films à vos favoris pour les retrouver ici.
          </p>

          <Link
            to="/movies"
            className="inline-block rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
          >
            Découvrir les films
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites