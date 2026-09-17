import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import SearchResults from "./SearchResults"
import type { Movie } from "../types/Movie"

const interstellar: Movie = {
  id: 1,
  title: "Interstellar",
  poster: "",
  releaseDate: "2014",
  rating: 8.7,
}

describe("SearchResults", () => {
  it("affiche les résultats correspondants", () => {
    render(
      <MemoryRouter>
        <SearchResults
          movies={[interstellar]}
          favorites={[]}
          hasSearched={true}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()
  })

  it("affiche un message quand aucun résultat n'est trouvé", () => {
    render(
      <MemoryRouter>
        <SearchResults
          movies={[]}
          favorites={[]}
          hasSearched={true}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByText(
        "Aucun résultat pour cette recherche."
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "Essayez avec un autre titre."
      )
    ).toBeInTheDocument()
  })
})