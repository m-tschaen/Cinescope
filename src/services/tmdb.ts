import type {
  TmdbMovieDetails,
  TmdbMoviesResponse,
} from "../types/Tmdb"

const TMDB_URL = "https://api.themoviedb.org/3"

const token = import.meta.env.VITE_TMDB_TOKEN

export async function getPopularMovies(
  page: number = 1
): Promise<TmdbMoviesResponse> {
  const response = await fetch(
    `${TMDB_URL}/movie/popular?language=fr-FR&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films")
  }

  const data = await response.json()

  return data
}

export async function searchMovies(
  query: string
): Promise<TmdbMoviesResponse> {
  const response = await fetch(
    `${TMDB_URL}/search/movie?query=${encodeURIComponent(query)}&language=fr-FR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche")
  }

  const data = await response.json()

  return data
}

export async function getMovieDetails(
  id: number
): Promise<TmdbMovieDetails | null> {
  const response = await fetch(
    `${TMDB_URL}/movie/${id}?language=fr-FR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du film")
  }

  const data = await response.json()

  return data
}