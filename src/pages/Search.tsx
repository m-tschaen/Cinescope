import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import useMovieSearch from "../hooks/useMovieSearch"
import { useAppContext } from "../context/AppContext"

function Search() {
  const { favorites, toggleFavorite } = useAppContext()

  const [searchValue, setSearchValue] = useState("")

  const {
    movies,
    loading,
    error,
    hasSearched,
    search,
  } = useMovieSearch()

  useEffect(() => {
    console.log("Recherche modifiée :", searchValue)
  }, [searchValue])

  function handleSearch() {
    search(searchValue)
  }

  return (
    <main>
      <h1>Rechercher un film</h1>

      <SearchBar
        search={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
      />

      {loading && <p>Recherche en cours...</p>}

      {error && (
        <p>Impossible d'effectuer la recherche.</p>
      )}

      {!loading &&
        !error &&
        hasSearched &&
        movies.length === 0 && (
          <section>
            <p>Aucun résultat pour cette recherche.</p>
            <p>Essayez avec un autre titre.</p>
          </section>
        )}

      {!loading && !error && movies.length > 0 && (
        <section>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some(
                (favorite) => favorite.id === movie.id
              )}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default Search