import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import MovieError from "./MovieError"

describe("MovieError", () => {
  it("affiche un message quand le film est introuvable", () => {
    render(<MovieError notFound={true} />)

    expect(
      screen.getByText("Film introuvable")
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "Le film demandé n'existe pas ou n'est plus disponible."
      )
    ).toBeInTheDocument()
  })

  it("affiche un message quand le chargement du film échoue", () => {
    render(<MovieError notFound={false} />)

    expect(
      screen.getByText("Impossible de charger ce film.")
    ).toBeInTheDocument()
  })
})