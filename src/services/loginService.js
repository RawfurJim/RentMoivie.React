import http from "./httpService";

export function Login(auth) {
  return http.post("http://localhost:3009/api/auth", auth);
}
