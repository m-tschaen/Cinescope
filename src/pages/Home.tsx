import MovieGrid from "../components/MovieGrid"
import { useAppContext } from "../context/AppContext"
import useMovies from "../hooks/useMovies"

function Home() {
  const { favorites, toggleFavorite } = useAppContext()

  const {
    movies,
    loading,
    error,
  } = useMovies(1)

  return (
    <main>
      <h1>Découvrez votre prochain film</h1>

      <p>
        Explorez des films, trouvez vos favoris et construisez votre bibliothèque personnelle.
      </p>

      <section>
        <h2>Films populaires</h2>

        {loading && (
          <p>Chargement des films...</p>
        )}

        {error && (
          <p>Impossible de charger les films.</p>
        )}

        {!loading && !error && (
          <MovieGrid
            movies={movies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>
    </main>
  )
}

export default Home