import http from "./httpService";

export function getCustomer() {
  return http.get("http://localhost:3009/api/customer");
}

export function saveCustomer(customer) {
  return http.post("http://localhost:3009/api/customer", customer);
}

export function deleteCustomer(customerId) {
  return http.delete("http://localhost:3009/api/customer/" + customerId);
}
