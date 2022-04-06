import http from "./http";
// import store from "@/store"

export function search(keyword) {
  return http.get(`/tags?query=${keyword}`, {});
}
// READ.ME 인증 관련 모듈을 모아둔 파일 (회원가입, 본인 인증 등 인증과 관련된 걸 모아둔다)
