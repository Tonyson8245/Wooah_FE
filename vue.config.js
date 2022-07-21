// const { defineConfig } = require("@vue/cli-service");
// (module.exports = defineConfig({
//   transpileDependencies: true,
// })),
//   {
//     devServer: {
//       proxy: "http://15.164.228.184/",
//     },
//   };
// const target = "http://15.164.228.184";

// module.exports = {
//   devServer: {
//     port: 8080,
//     proxy: {
//       //proxy 요청을 보낼 api 시작 부분
//       "^/api": {
//         target,
//         changeOrigin: true,
//       },
//     },
//   },
// };
// const target = "https://openapi.naver.com/";

// module.exports = {
//   devServer: {
//     port: 8080,
//     proxy: {
//       //proxy 요청을 보낼 api 시작 부분
//       "^/v1": {
//         target,
//         changeOrigin: true,
//       },
//     },
//   },
// };

module.exports = {
  outputDir: "D:/응용 2단게/project/frontend-web-production/dist", // git 경로
  // outputDir: "D:/응용 2단게/project/frontend-web-production-test/dist", // test 경로

  //   publicPath: "./", //해당 설정을 추가 해줍니다. 상대경로인 ./ 로 설정 합니다......
  //   assetsDir: "./", //만약 css, js, img 등 어셋 경로가 다를 경우 해당 경로도 수정 해야 합니다.
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ["vue-meta"],
};
