import { useEffect, useState } from "react"
import { getPopularMovies } from "../services/tmdb"
import type { Movie } from "../types/Movie"
import { toMovie } from "../utils/movieMapper"

function useMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  async function loadMovies() {
    try {
      setLoading(true)
      setError(false)

      const data = await getPopularMovies(page)

      const formattedMovies: Movie[] = data.results.map(toMovie)

      setMovies(formattedMovies)
      setTotalPages(data.total_pages)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [page])

  return {
    movies,
    loading,
    error,
    totalPages,
    reload: loadMovies,
  }
}

export default useMovies