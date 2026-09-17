import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import SearchBar from "./SearchBar"

const movies = [
  "Interstellar",
  "Inception",
  "Avatar",
]

function SearchTest() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState(movies)

  function handleSearch() {
    const filteredMovies = movies.filter((movie) =>
      movie
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    setResults(filteredMovies)
  }

  function handleReset() {
    setSearch("")
    setResults(movies)
  }

  return (
    <>
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {results.map((movie) => (
        <p key={movie}>{movie}</p>
      ))}
    </>
  )
}

describe("Réinitialisation de la recherche", () => {
  it("permet de retrouver les résultats", async () => {
    const user = userEvent.setup()

    render(<SearchTest />)

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Inception")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Avatar")
    ).toBeInTheDocument()

    await user.type(
      screen.getByRole("textbox", {
        name: "Rechercher un film",
      }),
      "Interstellar"
    )

    await user.click(
      screen.getByRole("button", {
        name: "Rechercher",
      })
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    expect(
      screen.queryByText("Inception")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("Avatar")
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole("button", {
        name: "Réinitialiser",
      })
    )

    expect(
      screen.getByText("Interstellar")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Inception")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Avatar")
    ).toBeInTheDocument()
  })
})