import http from "./http";
// import store from "@/store"

export function search(keyword) {
  return http.get(`/tags?query=${keyword}&amount=6`, {});
}

export function fetchRankTags() {
  return http.get(`/tags/trend?amount=10`, {});
}

export function fetchPosts(page, unit, query) {
  let url = `/designs?page=${page}&unit=${unit}`;
  if (query != null) url += `${query}`;

  return http.get(url, {});
}

export function fetchPost(id) {
  let url = `/designs/${id}`;
  return http.get(url, {});
}
