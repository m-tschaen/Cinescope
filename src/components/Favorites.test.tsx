import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import Favorites from "./Favorites"
import type { Movie } from "../types/Movie"

const interstellar: Movie = {
  id: 1,
  title: "Interstellar",
  poster: "",
  releaseDate: "2014",
  rating: 8.7,
}

const inception: Movie = {
  id: 2,
  title: "Inception",
  poster: "",
  releaseDate: "2010",
  rating: 8.8,
}

describe("Favorites", () => {
  it("affiche un favori", () => {
    render(
      <MemoryRouter>
        <Favorites
          favorites={[interstellar]}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()
  })

  it("affiche plusieurs favoris", () => {
    render(
      <MemoryRouter>
        <Favorites
          favorites={[interstellar, inception]}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Inception")
    ).toBeInTheDocument()
  })

  it("retire un favori", async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()

    render(
      <MemoryRouter>
        <Favorites
          favorites={[interstellar]}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Retirer des favoris",
      })
    )

    expect(onToggleFavorite).toHaveBeenCalled()
  })
})