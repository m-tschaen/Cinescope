import type { Movie } from "../types/Movie"

type MovieCardProps = {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <article>
      <img src={movie.poster} alt={movie.title} />

      <h2>{movie.title}</h2>
      <p>Année : {movie.releaseDate}</p>
      <p>Note : {movie.rating}</p>

      <button onClick={() => onToggleFavorite(movie.id)}>
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <button>Voir le film</button>
    </article>
  )
}

export default MovieCard