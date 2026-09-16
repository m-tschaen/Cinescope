import { useEffect, useState } from "react"
import { getMovieDetails } from "../services/tmdb"

export type MovieDetailsData = {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genres: {
    id: number
    name: string
  }[]
  runtime: number
  overview: string
  original_language: string
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
}

function useMovieDetails(id: number) {
  const [movie, setMovie] =
    useState<MovieDetailsData | null>(null)

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