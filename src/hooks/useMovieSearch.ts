import { useState } from "react"
import { searchMovies } from "../services/tmdb"
import type { Movie } from "../types/Movie"

function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function search(query: string) {
    if (!query.trim()) {
      return
    }

    try {
      setLoading(true)
      setError(false)
      setHasSearched(true)

      const data = await searchMovies(query)

      const formattedMovies: Movie[] = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        releaseDate: movie.release_date,
        rating: movie.vote_average,
      }))

      setMovies(formattedMovies)
    } catch {
      setError(true)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setMovies([])
    setLoading(false)
    setError(false)
    setHasSearched(false)
  }

  return {
    movies,
    loading,
    error,
    hasSearched,
    search,
    reset,
  }
}

export default useMovieSearch