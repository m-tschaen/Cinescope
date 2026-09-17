type MovieErrorProps = {
  notFound: boolean
}

function MovieError({ notFound }: MovieErrorProps) {
  if (notFound) {
    return (
      <main>
        <h1>Film introuvable</h1>
        <p>
          Le film demandé n'existe pas ou n'est plus disponible.
        </p>
      </main>
    )
  }

  return (
    <main>
      <p>Impossible de charger ce film.</p>
    </main>
  )
}

export default MovieError