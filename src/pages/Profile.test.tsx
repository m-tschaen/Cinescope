import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import Profile from "./Profile"

describe("Profile", () => {
  it("affiche les champs du formulaire", () => {
    render(<Profile />)

    expect(
      screen.getByRole("textbox", { name: "Prénom" })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("textbox", { name: "Nom" })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("textbox", { name: "Pseudonyme" })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("textbox", { name: "Adresse e-mail" })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("textbox", { name: "Biographie" })
    ).toBeInTheDocument()
  })

  it("permet de saisir les informations", async () => {
    const user = userEvent.setup()

    render(<Profile />)

    const firstName = screen.getByRole("textbox", {
      name: "Prénom",
    })

    const lastName = screen.getByRole("textbox", {
      name: "Nom",
    })

    const username = screen.getByRole("textbox", {
      name: "Pseudonyme",
    })

    const email = screen.getByRole("textbox", {
      name: "Adresse e-mail",
    })

    const bio = screen.getByRole("textbox", {
      name: "Biographie",
    })

    await user.type(firstName, "Alice")
    await user.type(lastName, "Martin")
    await user.type(username, "alice67")
    await user.type(email, "alice@mail.com")
    await user.type(bio, "J'aime le cinéma.")

    expect(firstName).toHaveValue("Alice")
    expect(lastName).toHaveValue("Martin")
    expect(username).toHaveValue("alice67")
    expect(email).toHaveValue("alice@mail.com")
    expect(bio).toHaveValue("J'aime le cinéma.")
  })

  it("affiche les erreurs des champs obligatoires", async () => {
    const user = userEvent.setup()

    render(<Profile />)

    await user.click(
      screen.getByRole("button", {
        name: "Enregistrer mon profil",
      })
    )

    expect(
      screen.getByText("Le prénom est obligatoire.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Le nom est obligatoire.")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Le pseudonyme est obligatoire.")
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        "L'adresse e-mail est obligatoire."
      )
    ).toBeInTheDocument()
  })

  it("affiche une erreur si l'adresse e-mail est invalide", async () => {
    const user = userEvent.setup()

    render(<Profile />)

    await user.type(
      screen.getByRole("textbox", {
        name: "Prénom",
      }),
      "Alice"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Nom",
      }),
      "Martin"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Pseudonyme",
      }),
      "alice67"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Adresse e-mail",
      }),
      "alicemail.com"
    )

    await user.click(
      screen.getByRole("button", {
        name: "Enregistrer mon profil",
      })
    )

    expect(
      screen.getByText(
        "Veuillez saisir une adresse e-mail valide."
      )
    ).toBeInTheDocument()
  })

  it("affiche le message de succès si le formulaire est valide", async () => {
    const user = userEvent.setup()

    render(<Profile />)

    await user.type(
      screen.getByRole("textbox", {
        name: "Prénom",
      }),
      "Alice"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Nom",
      }),
      "Martin"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Pseudonyme",
      }),
      "alice67"
    )

    await user.type(
      screen.getByRole("textbox", {
        name: "Adresse e-mail",
      }),
      "alice@mail.com"
    )

    await user.click(
      screen.getByRole("button", {
        name: "Enregistrer mon profil",
      })
    )

    expect(
      screen.getByText(
        "Profil enregistré avec succès."
      )
    ).toBeInTheDocument()
  })
})