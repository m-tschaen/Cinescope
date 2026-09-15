import { useState } from "react"
import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster: "",
    releaseDate: "2014",
    rating: 8.7,
    genres: ["Science-fiction", "Drame", "Aventure"],
    duration: 169,
    description:
      "Une équipe d'explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète habitable pour l'humanité.",
  },
  {
    id: 2,
    title: "Inception",
    poster: "",
    releaseDate: "2010",
    rating: 8.8,
    genres: ["Action", "Science-fiction", "Thriller"],
    duration: 148,
    description:
      "Un spécialiste de l'extraction de secrets pénètre dans les rêves d'autres personnes et reçoit une mission particulièrement difficile.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "",
    releaseDate: "2008",
    rating: 9.0,
    genres: ["Drame", "Action", "Crime"],
    duration: 152,
    description:
      "Batman affronte un criminel qui cherche à plonger Gotham City dans le chaos.",
  },
  {
    id: 4,
    title: "The Matrix",
    poster: "",
    releaseDate: "1999",
    rating: 8.7,
  },
  {
    id: 5,
    title: "Parasite",
    poster: "",
    releaseDate: "2019",
    rating: 8.5,
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    poster: "",
    releaseDate: "1994",
    rating: 9.3,
  },
]

function MovieGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  function toggleFavorite(id: number) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  )
}

export default MovieGrid