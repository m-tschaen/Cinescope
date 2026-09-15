import { useState } from "react"
import Navbar from "./components/Navbar"
import MovieGrid from "./components/MovieGrid"
import Favorites from "./components/Favorites"
import { movies } from "./data/movies"

function App() {
  const [favorites, setFavorites] = useState<number[]>([])

  function toggleFavorite(id: number) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>Découvrez votre prochain film</h1>

        <p>
          Explorez des films, trouvez vos favoris et construisez votre bibliothèque personnelle.
        </p>

        <section>
          <h2>Films populaires</h2>

          <MovieGrid
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        <Favorites
          movies={movies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </>
  )
}

export default App