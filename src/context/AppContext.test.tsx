import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  AppProvider,
  useAppContext,
} from "./AppContext"

import type { Movie } from "../types/Movie"

const movie: Movie = {
  id: 1,
  title: "Interstellar",
  poster: "",
  releaseDate: "2014",
  rating: 8.7,
}

function LibraryTest() {
  const {
    library,
    addToLibrary,
    changeLibraryStatus,
    removeFromLibrary,
  } = useAppContext()

  return (
    <div>
      <button
        onClick={() =>
          addToLibrary(movie, "À regarder")
        }
      >
        Ajouter Interstellar
      </button>

      {library.map((item) => (
        <div key={item.movie.id}>
          <p>{item.movie.title}</p>
          <p>{item.status}</p>

          <button
            onClick={() =>
              changeLibraryStatus(
                item.movie.id,
                "Vu"
              )
            }
          >
            Marquer comme vu
          </button>

          <button
            onClick={() =>
              removeFromLibrary(item.movie.id)
            }
          >
            Retirer Interstellar
          </button>
        </div>
      ))}
    </div>
  )
}

describe("Bibliothèque", () => {
  it("ajoute un film dans la bibliothèque", async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <LibraryTest />
      </AppProvider>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Ajouter Interstellar",
      })
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    expect(
      screen.getByText("À regarder")
    ).toBeInTheDocument()
  })

  it("change le statut d'un film", async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <LibraryTest />
      </AppProvider>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Ajouter Interstellar",
      })
    )

    await user.click(
      screen.getByRole("button", {
        name: "Marquer comme vu",
      })
    )

    expect(
      screen.getByText("Vu")
    ).toBeInTheDocument()
  })

  it("retire un film de la bibliothèque", async () => {
    const user = userEvent.setup()

    render(
      <AppProvider>
        <LibraryTest />
      </AppProvider>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Ajouter Interstellar",
      })
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole("button", {
        name: "Retirer Interstellar",
      })
    )

    expect(
      screen.queryByText("Interstellar")
    ).not.toBeInTheDocument()
  })
})