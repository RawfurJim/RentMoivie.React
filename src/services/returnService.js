import http from "./httpService";

export function saveReturn(ret) {
  return http.post("http://localhost:3009/api/return", ret);
}
