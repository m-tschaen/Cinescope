import MovieGrid from "../components/MovieGrid"

type HomeProps = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function Home({
  favorites,
  onToggleFavorite,
}: HomeProps) {
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
          onToggleFavorite={onToggleFavorite}
          search=""
          onResetSearch={() => {}}
        />
      </section>
    </main>
  )
}

export default Home