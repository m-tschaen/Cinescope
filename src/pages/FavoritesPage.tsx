import Favorites from "../components/Favorites"
import { useAppContext } from "../context/AppContext"

function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppContext()

  return (
    <Favorites
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  )
}

export default FavoritesPage