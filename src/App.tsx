import Navbar from "./components/Navbar"
import MovieGrid from "./components/MovieGrid"

function App() {
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
          <MovieGrid />
        </section>
      </main>
    </>
  )
}

export default App