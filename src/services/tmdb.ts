const TMDB_URL = "https://api.themoviedb.org/3"

const token = import.meta.env.VITE_TMDB_TOKEN

export async function getPopularMovies() {
  const response = await fetch(`${TMDB_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des films")
  }

  const data = await response.json()

  return data
}