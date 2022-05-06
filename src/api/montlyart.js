import http from "./http";

export function getThumbnails(sido, sigungu) {
  if (sigungu == 0) return http.get(`/monthly-arts?sido=${sido}&amount=4`, {});
  else
    return http.get(
      `/monthly-arts?sido=${sido}&sigungu=${sigungu}&amount=4`,
      {}
    );
}
