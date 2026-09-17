import { useState } from "react"
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
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Rechercher un film
        </h1>

        <SearchBar
          search={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {!isSearching && popularLoading && (
          <p className="text-gray-400">
            Chargement des films...
          </p>
        )}

        {isSearching && searchLoading && (
          <p className="text-gray-400">
            Recherche en cours...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-950 p-4 text-red-300">
            Impossible d'effectuer la recherche.
          </p>
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
      </div>
    </main>
  )
}

export default Search