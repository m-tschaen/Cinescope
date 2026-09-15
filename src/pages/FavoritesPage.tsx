import Favorites from "../components/Favorites"
import { movies } from "../data/movies"

type FavoritesPageProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function FavoritesPage({
  favorites,
  onToggleFavorite,
}: FavoritesPageProps) {
  return (
    <Favorites
      movies={movies}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  )
}

export default FavoritesPage