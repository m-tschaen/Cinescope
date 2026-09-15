import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">CineScope</Link>

      <Link to="/">Accueil</Link>
      <Link to="/movies">Films</Link>
      <Link to="/favorites">Favoris</Link>
      <Link to="/library">Bibliothèque</Link>
      <Link to="/profile">Profil</Link>

      <Link to="/search">Rechercher</Link>
    </nav>
  )
}

export default Navbar