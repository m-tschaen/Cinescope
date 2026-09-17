import { memo } from "react"
import { Link } from "react-router-dom"
import type { Movie } from "../types/Movie"

type MovieCardProps = {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
}

function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-gray-800 text-white shadow-lg">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-96 w-full object-cover"
        />
      ) : (
        <div className="flex h-96 items-center justify-center bg-gray-700">
          <p className="text-gray-300">
            Affiche indisponible
          </p>
        </div>
      )}

      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">
          {movie.title}
        </h2>

        <p className="text-sm text-gray-300">
          Année : {movie.releaseDate}
        </p>

        <p className="mb-4 text-sm text-gray-300">
          Note : {movie.rating}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onToggleFavorite(movie)}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
          >
            {isFavorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"}
          </button>

          <Link
            to={`/movies/${movie.id}`}
            className="rounded-lg bg-gray-700 px-4 py-2 text-center font-medium hover:bg-gray-600"
          >
            Voir le film
          </Link>
        </div>
      </div>
    </article>
  )
}

export default memo(MovieCard)