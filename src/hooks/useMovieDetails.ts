import { useEffect, useState } from "react"
import { getMovieDetails } from "../services/tmdb"
import type { TmdbMovieDetails } from "../types/Tmdb"

function useMovieDetails(id: number) {
  const [movie, setMovie] = useState<TmdbMovieDetails | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true)
        setError(false)
        setNotFound(false)

        const data = await getMovieDetails(id)

        if (!data) {
          setNotFound(true)
          setMovie(null)
          return
        }

        setMovie(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  return {
    movie,
    loading,
    error,
    notFound,
  }
}

export default useMovieDetails