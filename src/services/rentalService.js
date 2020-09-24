import http from "./httpService";

export function getRentals() {
  return http.get("http://localhost:3009/api/rental");
}
export function saveRental(rental) {
  return http.post("http://localhost:3009/api/rental", rental);
}
