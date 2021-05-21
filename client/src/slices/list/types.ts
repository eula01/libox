interface MovieListItem {
  id: number,
  posterPath: string | null
  title: string
  releaseDate: string
  runtime: number | null
  revenue: number
}

export interface InitialState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
  watchlist: MovieListItem[],
  watchedlist: MovieListItem[],
}

export interface GetMovieDetailsParams {
  listId: 'watchlist' | 'watchedlist',
  id: number
}

export interface AddMoviePayload {
  listId: 'watchlist' | 'watchedlist',
  movie: MovieDetails
}



// export interface User {
//   id: number,
//   username: string,
//   password: string,
//   lists: Record<ListId, MovieListItem>
//   ratings: Record<MovieId, RatingInfo>

// }



// export interface MovieDetails {
//   id: number
//   title: string
//   tagline: string | null
//   releaseDate: string
//   overview: string | null
//   runtime: number | null
//   backdropPath: string | null
//   posterPath: string | null
//   budget: number
//   revenue: number
//   userRating: number | null
//   belongsToLists: string[] | null
// }

// interface RatingInfo {
//   title: string
//   userRating: number
// }

/*
User to Movie
1 to many

Watchlist to Movie
1 to many

Watchedlist to Movie
1 to many

User to Lists
1 to many

Movie to Rating
1 to 1
*/
