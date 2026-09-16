import MovieGrid from "../components/MovieGrid"
import { useAppContext } from "../context/AppContext"

function Home() {
  const { favorites, toggleFavorite } = useAppContext()

  return (
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
          search=""
          onResetSearch={() => {}}
        />
      </section>
    </main>
  )
}

export default Home