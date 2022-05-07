import http from "./http";

export function getThumbnails(sido, sigungu) {
  if (sigungu == 0) return http.get(`/monthly-arts?sido=${sido}&amount=4`, {});
  else
    return http.get(
      `/monthly-arts?sido=${sido}&sigungu=${sigungu}&amount=4`,
      {}
    );
}
export function getPosts(page, sido, sigungu, price_range) {
  if (sigungu == 0)
    return http.get(
      `/monthly-arts/group?page=${page}&unit=16&sido=${sido}&price_range=${price_range}`,
      {}
    );
  else
    return http.get(
      `monthly-arts/group?page=${page}&unit=16&sido=${sido}&sigungu=${sigungu}&price_range=${price_range}`,
      {}
    );
}
