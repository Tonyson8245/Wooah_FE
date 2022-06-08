import http from "./http";

export function fetchProcedure() {
  return http.get(`/procedures`, {});
}

export function fetchPriceList(query, sido, sigungu) {
  if (sigungu != 0) {
    return http.get(
      `price-comparisons?ids=${query}&sido=${sido}&sigungu=${sigungu}`,
      {}
    );
  } else return http.get(`price-comparisons?ids=${query}&sido=${sido}`, {});
}