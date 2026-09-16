import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import useMovieDetails from "../hooks/useMovieDetails"
import { useAppContext } from "../context/AppContext"
import type { Movie } from "../types/Movie"

function MovieDetails() {
  const {
    favorites,
    toggleFavorite,
    addToLibrary,
  } = useAppContext()

  const { id } = useParams()

  const {
    movie,
    loading,
    error,
    notFound,
  } = useMovieDetails(Number(id))

  const [personalRating, setPersonalRating] = useState<number | null>(
    null
  )
  const [ratingMessage, setRatingMessage] = useState("")

  function handleSaveRating() {
    if (personalRating === null) {
      setRatingMessage("Veuillez sélectionner une note.")
      return
    }

    setRatingMessage("Votre note a été enregistrée.")
  }

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

  const formattedMovie: Movie = {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    genres: movie.genres.map((genre) => genre.name),
    duration: movie.runtime,
    description: movie.overview,
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  )

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
        Genres :{" "}
        {movie.genres
          .map((genre) => genre.name)
          .join(", ")}
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

      <button
        onClick={() => toggleFavorite(formattedMovie)}
      >
        {isFavorite
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
      </button>

      <button
        onClick={() =>
          addToLibrary(formattedMovie, "À regarder")
        }
      >
        Ajouter à la bibliothèque
      </button>

      <section>
        <h2>Ma note</h2>

        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => {
              setPersonalRating(rating)
              setRatingMessage("")
            }}
          >
            {rating <= (personalRating ?? 0) ? "★" : "☆"}
          </button>
        ))}

        <button
          type="button"
          onClick={handleSaveRating}
        >
          Enregistrer ma note
        </button>

        {ratingMessage && (
          <p>{ratingMessage}</p>
        )}
      </section>

      <Link to="/movies">
        Retour aux films
      </Link>
    </main>
  )
}

export default MovieDetails