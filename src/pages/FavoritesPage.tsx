import Favorites from "../components/Favorites"
import type { Movie } from "../types/Movie"

type FavoritesPageProps = {
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function FavoritesPage({
  favorites,
  onToggleFavorite,
}: FavoritesPageProps) {
  return (
    <Favorites
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  )
}

export default FavoritesPage