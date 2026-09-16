import { useAppContext } from "../context/AppContext"
import type { LibraryStatus } from "../types/LibraryMovie"

function Library() {
  const {
    library,
    changeLibraryStatus,
    removeFromLibrary,
  } = useAppContext()

  const statuses: LibraryStatus[] = [
    "À regarder",
    "En cours",
    "Vu",
  ]

  return (
    <main>
      <h1>Ma bibliothèque</h1>

      {statuses.map((status) => {
        const movies = library.filter(
          (item) => item.status === status
        )

        return (
          <section key={status}>
            <h2>{status}</h2>

            {movies.length === 0 ? (
              <p>Aucun film dans cette liste.</p>
            ) : (
              movies.map((item) => (
                <article key={item.movie.id}>
                  <h3>{item.movie.title}</h3>

                  <p>Statut : {item.status}</p>

                  <select
                    value={item.status}
                    onChange={(event) =>
                      changeLibraryStatus(
                        item.movie.id,
                        event.target.value as LibraryStatus
                      )
                    }
                  >
                    <option value="À regarder">
                      À regarder
                    </option>

                    <option value="En cours">
                      En cours
                    </option>

                    <option value="Vu">
                      Vu
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      removeFromLibrary(item.movie.id)
                    }
                  >
                    Retirer de la bibliothèque
                  </button>
                </article>
              ))
            )}
          </section>
        )
      })}
    </main>
  )
}

export default Library