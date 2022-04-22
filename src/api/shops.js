import http from "./http";
// import store from "@/store"

export function getShops(page, sido, sigungu) {
  if (sigungu != 0) {
    return http.get(
      `/shops?page=${page}&unit=6&sido=${sido}&sigungu=${sigungu}`,
      {}
    );
  } else return http.get(`/shops?page=${page}&unit=6&sido=${sido}`, {});
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

export function searchShops(page, sido, sigungu, query) {
  if (sigungu != 0) {
    return http.get(
      `/search/shops?page=${page}&unit=6&query=${query}&sido=${sido}&sigungu=${sigungu}`,
      {}
    );
  } else
    return http.get(
      `/search/shops?page=${page}&unit=6&query=${query}&sido=${sido}`,
      {}
    );
}
