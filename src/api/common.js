import http from "./http";
// import store from "@/store"

export function getDistricts() {
  return http.get(`/districts`, {});
}
