import http from "./http";
// import store from "@/store"

export function getShops(page, sido, sigungu) {
  return http.get(
    `/shops?page=${page}&unit=10&sido=${sido}&sigungu=${sigungu}}`,
    {}
  );
}