import http from "./http";
// import store from "@/store"

export function search(keyword) {
  return http.get(`/tags?query=${keyword}`, {});
}

export function fetchRankTags() {
  return http.get(`/tags/trend?amount=10`, {});
}

export function fetchNewPost(page, unit, query) {
  let url = `/designs?page=${page}&unit=${unit}`;
  if (query != null) url += `&${query}`;

  return http.get(url, {});
}
