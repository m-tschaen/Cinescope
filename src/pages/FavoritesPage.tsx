import Favorites from "../components/Favorites"
import { useAppContext } from "../context/AppContext"

function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppContext()

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Favorites
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </main>
  )
}

export default FavoritesPage