// const { defineConfig } = require("@vue/cli-service");
// (module.exports = defineConfig({
//   transpileDependencies: true,
// })),
//   {
//     devServer: {
//       proxy: "http://15.164.228.184/",
//     },
//   };
const target = "http://15.164.228.184";

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      //proxy 요청을 보낼 api 시작 부분
      "^/api": {
        target,
        changeOrigin: true,
      },
    },
  },
};
