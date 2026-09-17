import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"
import useMovieSearch from "../hooks/useMovieSearch"
import useMovies from "../hooks/useMovies"
import { useAppContext } from "../context/AppContext"

function Search() {
  const { favorites, toggleFavorite } = useAppContext()

  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const {
    movies: popularMovies,
    loading: popularLoading,
    error: popularError,
  } = useMovies(1)

  const {
    movies: searchMovies,
    loading: searchLoading,
    error: searchError,
    hasSearched,
    search,
    reset,
  } = useMovieSearch()

  useEffect(() => {
    console.log("Recherche modifiée :", searchValue)
  }, [searchValue])

  function handleSearch() {
    if (!searchValue.trim()) {
      return
    }

    setIsSearching(true)
    search(searchValue)
  }

  function handleReset() {
    setSearchValue("")
    setIsSearching(false)
    reset()
  }

  const movies = isSearching
    ? searchMovies
    : popularMovies

  const error = isSearching
    ? searchError
    : popularError

  return (
    <main>
      <h1>Rechercher un film</h1>

      <SearchBar
        search={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {!isSearching && popularLoading && (
        <p>Chargement des films...</p>
      )}

      {isSearching && searchLoading && (
        <p>Recherche en cours...</p>
      )}

      {error && (
        <p>Impossible d'effectuer la recherche.</p>
      )}

      {!popularLoading &&
        !searchLoading &&
        !error && (
          <SearchResults
            movies={movies}
            favorites={favorites}
            hasSearched={isSearching && hasSearched}
            onToggleFavorite={toggleFavorite}
          />
        )}
    </main>
  )
}

export default Search