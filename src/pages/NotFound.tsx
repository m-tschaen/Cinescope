import { Link } from "react-router-dom"

function NotFound() {
  return (
    <main>
      <h1>Page introuvable</h1>

      <p>
        La page que vous recherchez n'existe pas ou n'est plus disponible.
      </p>

      <Link to="/">Retour à l'accueil</Link>
    </main>
  )
}

export default NotFound