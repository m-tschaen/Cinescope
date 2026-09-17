import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-900 px-8 py-4 text-white">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        CineScope
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Accueil
        </Link>

        <Link
          to="/movies"
          className="hover:text-gray-300"
        >
          Films
        </Link>

        <Link
          to="/search"
          className="hover:text-gray-300"
        >
          Recherche
        </Link>

        <Link
          to="/favorites"
          className="hover:text-gray-300"
        >
          Favoris
        </Link>

        <Link
          to="/library"
          className="hover:text-gray-300"
        >
          Bibliothèque
        </Link>

        <Link
          to="/profile"
          className="hover:text-gray-300"
        >
          Profil
        </Link>
      </div>
    </nav>
  )
}

export default Navbar