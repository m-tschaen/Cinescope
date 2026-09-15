import { useState } from "react"
import SearchBar from "../components/SearchBar"
import MovieGrid from "../components/MovieGrid"

type SearchProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function Search({
  favorites,
  onToggleFavorite,
}: SearchProps) {
  const [search, setSearch] = useState("")

  function resetSearch() {
    setSearch("")
  }

  return (
    <main>
      <h1>Recherche</h1>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
      />

      <MovieGrid
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        search={search}
        onResetSearch={resetSearch}
      />
    </main>
  )
}

export default Search