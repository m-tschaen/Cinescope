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
import type {
  LibraryMovie,
  LibraryStatus,
} from "./types/LibraryMovie"

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

type LibraryAction =
  | {
      type: "ADD"
      movie: Movie
      status: LibraryStatus
    }
  | {
      type: "CHANGE_STATUS"
      id: number
      status: LibraryStatus
    }
  | {
      type: "REMOVE"
      id: number
    }

function libraryReducer(
  state: LibraryMovie[],
  action: LibraryAction
): LibraryMovie[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          movie: action.movie,
          status: action.status,
        },
      ]

    case "CHANGE_STATUS":
      return state.map((item) =>
        item.movie.id === action.id
          ? {
              ...item,
              status: action.status,
            }
          : item
      )

    case "REMOVE":
      return state.filter(
        (item) => item.movie.id !== action.id
      )

    default:
      return state
  }
}

function App() {
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    []
  )

  const [library, dispatchLibrary] = useReducer(
    libraryReducer,
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
      dispatchFavorites({
        type: "REMOVE",
        id: movie.id,
      })
    } else {
      dispatchFavorites({
        type: "ADD",
        movie: movie,
      })
    }
  }

  function addToLibrary(
    movie: Movie,
    status: LibraryStatus
  ) {
    dispatchLibrary({
      type: "ADD",
      movie: movie,
      status: status,
    })
  }

  function changeLibraryStatus(
    id: number,
    status: LibraryStatus
  ) {
    dispatchLibrary({
      type: "CHANGE_STATUS",
      id: id,
      status: status,
    })
  }

  function removeFromLibrary(id: number) {
    dispatchLibrary({
      type: "REMOVE",
      id: id,
    })
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
              onAddToLibrary={addToLibrary}
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
          element={
            <Library
              library={library}
              onChangeStatus={changeLibraryStatus}
              onRemove={removeFromLibrary}
            />
          }
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