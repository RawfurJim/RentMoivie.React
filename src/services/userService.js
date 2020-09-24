import http from "./httpService";

export function getUser() {
  return http.get("http://localhost:3009/api/user");
}

export function saveUser(user) {
  return http.post("http://localhost:3009/api/user", user);
}
