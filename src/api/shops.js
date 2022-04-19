import http from "./http";
// import store from "@/store"

export function getShops(page, sido, sigungu) {
  return http.get(
    `/shops?page=${page}&unit=6&sido=${sido}&sigungu=${sigungu}`,
    {}
  );
}

export function getDistricts() {
  return http.get(`/districts`, {});
}
