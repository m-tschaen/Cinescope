import MovieGrid from "../components/MovieGrid"

type MoviesProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function Movies({
  favorites,
  onToggleFavorite,
}: MoviesProps) {
  return (
    <main>
      <h1>Films</h1>

      <MovieGrid
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        search=""
        onResetSearch={() => {}}
      />
    </main>
  )
}

export default Movies