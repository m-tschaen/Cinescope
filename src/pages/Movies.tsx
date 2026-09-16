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
      <main>
        <h1>Films</h1>
        <p>Chargement des films...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <h1>Films</h1>

        <p>Impossible de charger les films.</p>

        <p>
          Une erreur est survenue lors de la récupération des données. Veuillez réessayer.
        </p>

        <button onClick={reload}>
          Réessayer
        </button>
      </main>
    )
  }

  return (
    <main>
      <h1>Films</h1>

      <section>
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

      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Page précédente
        </button>

        <p>
          Page {page} sur {totalPages}
        </p>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Page suivante
        </button>
      </div>
    </main>
  )
}

export default Movies