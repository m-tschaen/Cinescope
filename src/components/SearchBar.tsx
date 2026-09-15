type SearchBarProps = {
  search: string
  onSearchChange: (value: string) => void
  onSearch: () => void
}

function SearchBar({
  search,
  onSearchChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div>
      <label htmlFor="search">Rechercher un film</label>

      <input
        id="search"
        type="text"
        placeholder="Titre du film..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <button onClick={onSearch}>Rechercher</button>
    </div>
  )
}

export default SearchBar