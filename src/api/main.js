import http from "./http";

export function fetchTagrank(qty) {
  return http.get(`/tags/ranking?amount=${qty}`, {});
}
export function fetchThumbnails(sido, sigungu) {
  if (sigungu == 0) return http.get(`/monthly-arts?sido=${sido}&amount=1`, {});
  else
    return http.get(
      `/monthly-arts?sido=${sido}&sigungu=${sigungu}&amount=1`,
      {}
    );
}
