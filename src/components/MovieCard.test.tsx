import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import MovieCard from "./MovieCard"
import type { Movie } from "../types/Movie"

const movie: Movie = {
  id: 1,
  title: "Interstellar",
  poster: "",
  releaseDate: "2014",
  rating: 8.7,
}

describe("MovieCard", () => {
  it("affiche le titre du film", () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={movie}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()
  })

  it("affiche l'année du film", () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={movie}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Année : 2014")
    ).toBeInTheDocument()
  })

  it("affiche la note du film", () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={movie}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Note : 8.7")
    ).toBeInTheDocument()
  })

  it("affiche le bouton de favori", () => {
    render(
      <MemoryRouter>
        <MovieCard
          movie={movie}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByRole("button", {
        name: "Ajouter aux favoris",
      })
    ).toBeInTheDocument()
  })

  it("appelle la fonction quand on clique sur Ajouter aux favoris", async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()

    render(
      <MemoryRouter>
        <MovieCard
          movie={movie}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Ajouter aux favoris",
      })
    )

    expect(onToggleFavorite).toHaveBeenCalled()
  })
})