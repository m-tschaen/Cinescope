import { useEffect, useState } from "react"
import { getPopularMovies } from "../services/tmdb"
import type { Movie } from "../types/Movie"

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