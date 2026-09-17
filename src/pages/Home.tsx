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
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Découvrez votre prochain film
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Explorez des films, trouvez vos favoris et construisez
            votre bibliothèque personnelle.
          </p>
        </div>

        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Films populaires
          </h2>

          {loading && (
            <p className="text-gray-400">
              Chargement des films...
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-950 p-4 text-red-300">
              Impossible de charger les films.
            </p>
          )}

          {!loading && !error && (
            <MovieGrid
              movies={movies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </section>
      </section>
    </main>
  )
}

export default Home