export type Movie = {
  id: number
  title: string
  poster: string
  releaseDate: string
  rating: number
  genres?: string[]
  duration?: number
  description?: string
}