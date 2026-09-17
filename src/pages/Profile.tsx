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
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">
          Mon profil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-gray-800 p-8 shadow-lg"
        >
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block font-medium"
            >
              Prénom
            </label>

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
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
            />

            {errors.firstName && (
              <p className="mt-2 text-sm text-red-400">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block font-medium"
            >
              Nom
            </label>

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
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
            />

            {errors.lastName && (
              <p className="mt-2 text-sm text-red-400">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-medium"
            >
              Pseudonyme
            </label>

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
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
            />

            {errors.username && (
              <p className="mt-2 text-sm text-red-400">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium"
            >
              Adresse e-mail
            </label>

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
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="mb-2 block font-medium"
            >
              Biographie
            </label>

            <textarea
              id="bio"
              placeholder="Parlez-nous un peu de vous..."
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
          >
            Enregistrer mon profil
          </button>
        </form>

        {success && (
          <p className="mt-6 rounded-lg bg-green-950 p-4 text-green-300">
            Profil enregistré avec succès.
          </p>
        )}
      </div>
    </main>
  )
}

export default Profile