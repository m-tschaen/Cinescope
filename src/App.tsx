import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import FavoritesPage from "./pages/FavoritesPage"
import Library from "./pages/Library"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/movies/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />

        <Route
          path="/library"
          element={<Library />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  )
}

export default App