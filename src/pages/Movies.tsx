import { useState } from "react"
import MovieCard from "../components/MovieCard"
import useMovies from "../hooks/useMovies"
import { useAppContext } from "../context/AppContext"

function Movies() {
  const { favorites, toggleFavorite } = useAppContext()
  const [page, setPage] = useState(1)

  const {
    movies,
    loading,
    error,
    totalPages,
    reload,
  } = useMovies(page)

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-4xl font-bold">
            Films
          </h1>

          <p className="text-gray-400">
            Chargement des films...
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-4xl font-bold">
            Films
          </h1>

          <div className="rounded-xl bg-red-950 p-6">
            <p className="mb-2 font-bold text-red-300">
              Impossible de charger les films.
            </p>

            <p className="mb-4 text-red-200">
              Une erreur est survenue lors de la récupération des
              données. Veuillez réessayer.
            </p>

            <button
              onClick={reload}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Films
        </h1>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some(
                (favorite) => favorite.id === movie.id
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 font-medium hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Page précédente
          </button>

          <p className="text-gray-300">
            Page {page} sur {totalPages}
          </p>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 font-medium hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Page suivante
          </button>
        </div>
      </div>
    </main>
  )
}

export default Movies