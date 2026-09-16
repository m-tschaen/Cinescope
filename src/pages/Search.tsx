import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import { searchMovies } from "../services/tmdb"
import type { Movie } from "../types/Movie"

type SearchProps = {
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function Search({
  favorites,
  onToggleFavorite,
}: SearchProps) {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    console.log("Recherche modifiée :", search)
  }, [search])

  async function handleSearch() {
    if (!search.trim()) {
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const data = await searchMovies(search)

      const formattedMovies: Movie[] = data.results.map(
        (movie: {
          id: number
          title: string
          poster_path: string | null
          release_date: string
          vote_average: number
        }) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
          releaseDate: movie.release_date,
          rating: movie.vote_average,
        })
      )

      setMovies(formattedMovies)
    } catch (error) {
      console.error(error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Rechercher un film</h1>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      {loading && <p>Recherche en cours...</p>}

      {!loading && hasSearched && movies.length === 0 && (
        <section>
          <p>Aucun résultat pour cette recherche.</p>
          <p>Essayez avec un autre titre.</p>
        </section>
      )}

      {!loading && movies.length > 0 && (
        <section>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some(
                (favorite) => favorite.id === movie.id
              )}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default Search