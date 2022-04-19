import http from "./http";
// import store from "@/store"

export function getShops(page, sido, sigungu) {
  return http.get(
    `/shops?page=${page}&unit=10&sido=${sido}&sigungu=${sigungu}`,
    {}
  );
}

export function getDistricts() {
  return http.get(`/districts`, {});
}

export function getShopDetail(id) {
  return http.get(`/shops/${id}/info`, {});
}

export function getShopImg(id, page) {
  return http.get(`/shops/${id}/designs?page=${page}&unit=12`, {});
}
