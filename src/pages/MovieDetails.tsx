import { Link, useParams } from "react-router-dom"
import { movies } from "../data/movies"

type MovieDetailsProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function MovieDetails({
  favorites,
  onToggleFavorite,
}: MovieDetailsProps) {
  const { id } = useParams()

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  )

  if (!movie) {
    return <p>Film introuvable</p>
  }

  const isFavorite = favorites.includes(movie.id)

  return (
    <main>
      <h1>{movie.title}</h1>

      <img src={movie.poster} alt={movie.title} />

      <p>Année : {movie.releaseDate}</p>
      <p>Note : {movie.rating}</p>

      {movie.genres && (
        <p>Genres : {movie.genres.join(", ")}</p>
      )}

      {movie.duration && (
        <p>Durée : {movie.duration} minutes</p>
      )}

      {movie.description && (
        <p>{movie.description}</p>
      )}

      <button onClick={() => onToggleFavorite(movie.id)}>
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <Link to="/movies">Retour aux films</Link>
    </main>
  )
}

export default MovieDetails