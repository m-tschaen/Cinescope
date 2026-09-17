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
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold">
          Ma bibliothèque
        </h1>

        <div className="space-y-10">
          {statuses.map((status) => {
            const movies = library.filter(
              (item) => item.status === status
            )

            return (
              <section key={status}>
                <h2 className="mb-5 text-2xl font-bold">
                  {status}
                </h2>

                {movies.length === 0 ? (
                  <p className="rounded-xl bg-gray-800 p-6 text-gray-400">
                    Aucun film dans cette liste.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {movies.map((item) => (
                      <article
                        key={item.movie.id}
                        className="rounded-xl bg-gray-800 p-6 shadow-lg"
                      >
                        <h3 className="mb-2 text-xl font-bold">
                          {item.movie.title}
                        </h3>

                        <p className="mb-4 text-gray-400">
                          Statut : {item.status}
                        </p>

                        <select
                          value={item.status}
                          onChange={(event) =>
                            changeLibraryStatus(
                              item.movie.id,
                              event.target.value as LibraryStatus
                            )
                          }
                          className="mb-3 w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white outline-none focus:border-red-500"
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
                          className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
                        >
                          Retirer de la bibliothèque
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Library