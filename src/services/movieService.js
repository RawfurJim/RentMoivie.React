import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3009/api/movie");
}
export function deleteMovie(movieId) {
  return http.delete("http://localhost:3009/api/movie/" + movieId);
}
export function getMoviesById(movieId) {
  return http.get("http://localhost:3009/api/movie/" + movieId);
}
export function saveMovie(movie) {
  return http.post("http://localhost:3009/api/movie", movie);
}
export function editMovie(movieId, movie) {
  return http.put("http://localhost:3009/api/movie/" + movieId, movie);
}
