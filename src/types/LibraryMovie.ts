import type { Movie } from "./Movie"

export type LibraryStatus =
  | "À regarder"
  | "En cours"
  | "Vu"

export type LibraryMovie = {
  movie: Movie
  status: LibraryStatus
}