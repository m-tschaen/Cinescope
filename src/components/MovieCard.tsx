import type { Movie } from "../types/Movie"

type MovieCardProps = {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article>
      <img src={movie.poster} alt={movie.title} />

      <h2>{movie.title}</h2>
      <p>Année : {movie.releaseDate}</p>
      <p>Note : {movie.rating}</p>

      <button>Ajouter aux favoris</button>
      <button>Voir le film</button>
    </article>
  )
}

export default MovieCard