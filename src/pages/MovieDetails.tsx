import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getMovieDetails } from "../services/tmdb"

type MovieDetailsProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

type MovieDetailsData = {
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

function MovieDetails({
  favorites,
  onToggleFavorite,
}: MovieDetailsProps) {
  const { id } = useParams()

  const [movie, setMovie] = useState<MovieDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true)
        setError(false)
        setNotFound(false)

        const data = await getMovieDetails(Number(id))

        if (!data) {
          setNotFound(true)
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

  if (loading) {
    return (
      <main>
        <p>Chargement du film...</p>
      </main>
    )
  }

  if (notFound) {
    return (
      <main>
        <h1>Film introuvable</h1>
        <p>
          Le film demandé n'existe pas ou n'est plus disponible.
        </p>
      </main>
    )
  }

  if (error || !movie) {
    return (
      <main>
        <p>Impossible de charger ce film.</p>
      </main>
    )
  }

  const isFavorite = favorites.includes(movie.id)

  return (
    <main>
      <h1>{movie.title}</h1>

      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <p>Affiche indisponible</p>
      )}

      <p>Date de sortie : {movie.release_date}</p>
      <p>Note : {movie.vote_average}</p>
      <p>Nombre de votes : {movie.vote_count}</p>

      <p>
        Genres : {movie.genres.map((genre) => genre.name).join(", ")}
      </p>

      <p>Durée : {movie.runtime} minutes</p>
      <p>{movie.overview}</p>
      <p>Langue originale : {movie.original_language}</p>

      <p>
        Pays de production :{" "}
        {movie.production_countries
          .map((country) => country.name)
          .join(", ")}
      </p>

      <button onClick={() => onToggleFavorite(movie.id)}>
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <Link to="/movies">Retour aux films</Link>
    </main>
  )
}

export default MovieDetails