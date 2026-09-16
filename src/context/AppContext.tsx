import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react"

import type { Movie } from "../types/Movie"
import type {
  LibraryMovie,
  LibraryStatus,
} from "../types/LibraryMovie"

type FavoritesAction =
  | { type: "ADD"; movie: Movie }
  | { type: "REMOVE"; id: number }

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

type AppContextType = {
  favorites: Movie[]
  library: LibraryMovie[]
  toggleFavorite: (movie: Movie) => void
  addToLibrary: (
    movie: Movie,
    status: LibraryStatus
  ) => void
  changeLibraryStatus: (
    id: number,
    status: LibraryStatus
  ) => void
  removeFromLibrary: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(
  undefined
)

function favoritesReducer(
  state: Movie[],
  action: FavoritesAction
): Movie[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.movie]

    case "REMOVE":
      return state.filter(
        (movie) => movie.id !== action.id
      )

    default:
      return state
  }
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

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({
  children,
}: AppProviderProps) {
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    []
  )

  const [library, dispatchLibrary] = useReducer(
    libraryReducer,
    []
  )

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
        movie,
      })
    }
  }

  function addToLibrary(
    movie: Movie,
    status: LibraryStatus
  ) {
    dispatchLibrary({
      type: "ADD",
      movie,
      status,
    })
  }

  function changeLibraryStatus(
    id: number,
    status: LibraryStatus
  ) {
    dispatchLibrary({
      type: "CHANGE_STATUS",
      id,
      status,
    })
  }

  function removeFromLibrary(id: number) {
    dispatchLibrary({
      type: "REMOVE",
      id,
    })
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        library,
        toggleFavorite,
        addToLibrary,
        changeLibraryStatus,
        removeFromLibrary,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      "useAppContext doit être utilisé dans AppProvider"
    )
  }

  return context
}