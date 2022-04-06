import http from "./http";
// import store from "@/store"

export function search(keyword) {
  return http.get(`/tags?query=${keyword}`, {});
}

export function fetchRankTags() {
  return http.get(`/tags/trend?amount=10`, {});
}
