import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: "api", // 저 instance 로 보내지는 domain은 무조건 baseURL 를 따르게 한다.
});
// instance.interceptors.request.use(function (config) {
//   //서버에 요청 보낼때 넣는 것은 .request/ 서버에서 보내준 데이터를 먼저 사용할 경우 .response
//   if (store.state.auth.token != null) {
//     config["headers"] = {
//       Authorization: `Bearer ${store.state.auth.token}`,
//     };
//   }
//   return config;
// });
instance.defaults.timeout = 6000;

instance.interceptors.response.use(
  function (response) {
    store.commit("error/setValidationError", {}); // 요청이 성공했다면 ValidationError 내용을 모두 비워준다.
    return response;
  },
  function (errors) {
    if (errors.response.status === 422) {
      store.commit("error/setValidationError", errors.response.data.data);
    } else {
      return Promise.reject(errors); // 만약 에러이지만 422이 아닐경우 그냥 그대로 보내서 catch 코드에서 잡히게 한다.
    }
  }
);

export default instance; //위의 instance 를 외부에서 사용 할수 있도록 export 함

//여기 전체 코드에 axios를 사용할 때, 공통으로 사용되는 부분들을 넣어주면 간편하게 사용이 가능하다.
