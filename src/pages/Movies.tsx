import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies } from "../services/tmdb"
import type { Movie } from "../types/Movie"

type MoviesProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function Movies({
  favorites,
  onToggleFavorite,
}: MoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadMovies() {
    try {
      setLoading(true)
      setError(false)

      const data = await getPopularMovies()

      const formattedMovies: Movie[] = data.results.map(
        (movie: {
          id: number
          title: string
          poster_path: string | null
          release_date: string
          vote_average: number
        }) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
          releaseDate: movie.release_date,
          rating: movie.vote_average,
        })
      )

      setMovies(formattedMovies)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

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
        <button onClick={loadMovies}>Réessayer</button>
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
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </section>
    </main>
  )
}

export default Movies