import http from "./httpService";

export function getJhonras() {
  return http.get("http://localhost:3009/api/jhonras");
}
