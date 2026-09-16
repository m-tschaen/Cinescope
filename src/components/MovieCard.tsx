import { memo } from "react"
import { Link } from "react-router-dom"
import type { Movie } from "../types/Movie"

type MovieCardProps = {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
}

function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <article>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} />
      ) : (
        <p>Affiche indisponible</p>
      )}

      <h2>{movie.title}</h2>
      <p>Année : {movie.releaseDate}</p>
      <p>Note : {movie.rating}</p>

      <button onClick={() => onToggleFavorite(movie)}>
        {isFavorite
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
      </button>

      <Link to={`/movies/${movie.id}`}>
        Voir le film
      </Link>
    </article>
  )
}

export default memo(MovieCard)