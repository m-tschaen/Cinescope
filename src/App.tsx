import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import FavoritesPage from "./pages/FavoritesPage"
import Library from "./pages/Library"
import Profile from "./pages/Profile"
import Search from "./pages/Search"

function App() {
  const [favorites, setFavorites] = useState<number[]>([])

  function toggleFavorite(id: number) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/movies"
          element={
            <Movies
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/movies/:id"
          element={
            <MovieDetails
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route path="/library" element={<Library />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/search"
          element={
            <Search
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App