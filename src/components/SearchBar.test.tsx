import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import SearchBar from "./SearchBar"

describe("SearchBar", () => {
  it("permet de saisir une recherche", async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()

    render(
      <SearchBar
        search=""
        onSearchChange={onSearchChange}
        onSearch={() => {}}
        onReset={() => {}}
      />
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Rechercher un film",
      }),
      "Interstellar"
    )

    expect(onSearchChange).toHaveBeenCalled()
  })

  it("lance la recherche", async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(
      <SearchBar
        search="Interstellar"
        onSearchChange={() => {}}
        onSearch={onSearch}
        onReset={() => {}}
      />
    )

    await user.click(
      screen.getByRole("button", {
        name: "Rechercher",
      })
    )

    expect(onSearch).toHaveBeenCalled()
  })

  it("réinitialise la recherche", async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()

    render(
      <SearchBar
        search="Interstellar"
        onSearchChange={() => {}}
        onSearch={() => {}}
        onReset={onReset}
      />
    )

    await user.click(
      screen.getByRole("button", {
        name: "Réinitialiser",
      })
    )

    expect(onReset).toHaveBeenCalled()
  })
})