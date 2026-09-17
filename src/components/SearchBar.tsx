type SearchBarProps = {
  search: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  onReset: () => void
}

function SearchBar({
  search,
  onSearchChange,
  onSearch,
  onReset,
}: SearchBarProps) {
  return (
    <div className="mb-8">
      <label
        htmlFor="search"
        className="mb-3 block text-lg font-medium text-white"
      >
        Rechercher un film
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="search"
          type="text"
          placeholder="Titre du film..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
        />

        <button
          onClick={onSearch}
          className="cursor-pointer rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
        >
          Rechercher
        </button>

        <button
          onClick={onReset}
          className="cursor-pointer rounded-lg bg-gray-800 px-5 py-3 font-medium text-white hover:bg-gray-700"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  )
}

export default SearchBar