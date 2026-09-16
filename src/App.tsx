import { useEffect, useReducer } from "react"
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

import { getPopularMovies } from "./services/tmdb"
import type { Movie } from "./types/Movie"

type FavoritesAction =
  | { type: "ADD"; movie: Movie }
  | { type: "REMOVE"; id: number }

function favoritesReducer(
  state: Movie[],
  action: FavoritesAction
): Movie[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.movie]

    case "REMOVE":
      return state.filter((movie) => movie.id !== action.id)

    default:
      return state
  }
}

function App() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    []
  )

  useEffect(() => {
    async function testTMDB() {
      try {
        const data = await getPopularMovies()
        console.log("Réponse TMDB :", data)
      } catch (error) {
        console.error(error)
      }
    }

    testTMDB()
  }, [])

  function toggleFavorite(movie: Movie) {
    const isFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    )

    if (isFavorite) {
      dispatch({
        type: "REMOVE",
        id: movie.id,
      })
    } else {
      dispatch({
        type: "ADD",
        movie: movie,
      })
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
          element={
            <Search
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
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