<template>
  <footer>
    <div class="container-lg">
      <div class="info row" style="display: flex">
        <table class="col-lg-6 col-md-6">
          <tr>
            <td><span class="title">상호</span>우아</td>
            <td><span class="title">대표</span>윤지열</td>
            <th colspan="2" style="font-weight: normal">
              <span class="title">주소</span>서울시 동작구 사당로 16길7(07011)
            </th>
          </tr>
          <tr>
            <td><span class="link">회사소개</span></td>
            <td><span class="link">서비스 이용약관</span></td>
            <td><span class="link">개인정보 처리 방침</span></td>
            <td><span class="link">오픈소스 라이센스</span></td>
          </tr>
          <tr>
            <th colspan="4">Copyright Since 2022, Woo-uA All rights</th>
          </tr>
        </table>
        <div class="col-lg-6 col-md-6">
          <img
            class="footer-button"
            src="../assets/img/AppStoreDownloadButton.svg"
            alt=""
          />
          <img
            class="footer-button"
            src="../assets/img/PlaystoreDownloadButton.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

footer {
  background: linear-gradient(to bottom, $pl-4, 85%, white);
  width: 100%;
  height: auto;
  padding: 2.4em 0 2.4em 0;

  display: flex;
  align-items: center;
  text-align: center;
}
.info {
  /* display: inline-block; */
  font-family: "GoyangIlsan";
  text-align: center;
  font-size: 12px;
  margin: auto;
  max-width: 60em;

  @include tablet {
    max-width: 60em;
  }
  @include mobile-xs {
    font-size: 0.1em;
    max-width: none;
    margin: none;
  }
}
.title {
  font-weight: bold;
  margin-right: 0.25em;
}
.link {
  font-weight: bold;
  margin-right: 0.125em;
}
.footer-button {
  margin: 0.25em;
  @include mobile-xs {
    width: 45%;
  }
}
</style>
