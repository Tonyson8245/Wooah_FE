import http from "./http";

export function fetchProcedure() {
  return http.get(`/procedures`, {});
}

export function fetchPriceList(query, body_part, sido, sigungu) {
  if (sigungu != 0) {
    return http.get(
      `price-comparisons/${query}?body_part=${body_part}&sido=${sido}&sigungu=${sigungu}`,
      {}
    );
  } else if (query == "") {
    return http.get(
      `price-comparisons?body_part=${body_part}&sido=${sido}`,
      {}
    );
  } else
    return http.get(
      `price-comparisons/${query}?body_part=${body_part}&sido=${sido}`,
      {}
    );
}
