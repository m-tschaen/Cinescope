import { useState } from "react"

type ProfileErrors = {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
}

function Profile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  const [errors, setErrors] = useState<ProfileErrors>({})
  const [success, setSuccess] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors: ProfileErrors = {}

    if (!firstName.trim()) {
      newErrors.firstName = "Le prénom est obligatoire."
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Le nom est obligatoire."
    }

    if (!username.trim()) {
      newErrors.username = "Le pseudonyme est obligatoire."
    }

    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire."
    } else if (!email.includes("@")) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }

  return (
    <main>
      <h1>Mon profil</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value)

              if (event.target.value.trim()) {
                setErrors((current) => ({
                  ...current,
                  firstName: undefined,
                }))
              }
            }}
          />

          {errors.firstName && (
            <p>{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            type="text"
            placeholder="Votre nom"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value)

              if (event.target.value.trim()) {
                setErrors((current) => ({
                  ...current,
                  lastName: undefined,
                }))
              }
            }}
          />

          {errors.lastName && (
            <p>{errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="username">Pseudonyme</label>
          <input
            id="username"
            type="text"
            placeholder="Votre pseudonyme"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)

              if (event.target.value.trim()) {
                setErrors((current) => ({
                  ...current,
                  username: undefined,
                }))
              }
            }}
          />

          {errors.username && (
            <p>{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            type="text"
            placeholder="votre@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)

              if (
                event.target.value.trim() &&
                event.target.value.includes("@")
              ) {
                setErrors((current) => ({
                  ...current,
                  email: undefined,
                }))
              }
            }}
          />

          {errors.email && (
            <p>{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio">Biographie</label>
          <textarea
            id="bio"
            placeholder="Parlez-nous un peu de vous..."
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>

        <button type="submit">
          Enregistrer mon profil
        </button>
      </form>

      {success && (
        <p>Profil enregistré avec succès.</p>
      )}
    </main>
  )
}

export default Profile