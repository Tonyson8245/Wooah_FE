<template>
  <footer>
    <GDialog :yesno="false" />
    <div class="container-lg">
      <div class="info row" style="display: flex">
        <table class="col-lg-6 col-md-6">
          <tr>
            <td>
              <span class="title">상호</span>우아(우리들의 아름다움)<span
                class="title"
                >대표</span
              >윤지열 <span class="title">주소</span
              ><span>경기도 파주시 미래로 422, 103동 1401호</span>
            </td>
            <td></td>
            <!-- <th colspan="2" style="font-weight: normal">
             
            </th> -->
          </tr>
          <tr>
            <td>
              <span class="title">사업자등록번호</span>179-09-01778
              <span
                class="link"
                @click="onClickRedirect(`http://pf.kakao.com/_fRSHb/chat `)"
                >1:1 문의</span
              ><span
                class="link"
                @click="
                  onClickRedirect(
                    `https://wooah.notion.site/2022-06-17-c3af1c94433d47debeb827904d657f48`
                  )
                "
                >서비스이용약관</span
              ><span
                class="link"
                style="color: #aa00ff"
                @click="
                  onClickRedirect(
                    `https://wooah.notion.site/2022-06-17-8003577b00b04f10b2ceb0d495f3c186`
                  )
                "
                >개인정보처리방침</span
              ><span
                class="link"
                @click="
                  onClickRedirect(
                    `https://wooah.notion.site/Web-40bcc432ef6f4b539d40179710ad8dd1`
                  )
                "
                >오픈소스라이센스</span
              >
            </td>
            <!-- <td>
             
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td> -->
          </tr>
          <tr>
            <th colspan="4">Copyright Since 2022, Wooah All rights</th>
          </tr>
        </table>
        <div class="col-lg-6 col-md-6">
          <img
            class="footer-button"
            src="../assets/img/AppStoreDownloadButton.svg"
            alt=""
            @click="
              onClickRedirect(
                `https://apps.apple.com/kr/app/%EC%9A%B0%EC%95%84/id1631369961`
              )
            "
          />
          <img
            class="footer-button"
            src="../assets/img/PlaystoreDownloadButton.svg"
            alt=""
            @click="
              onClickRedirect(
                `https://play.google.com/store/apps/details?id=com.changchanghada.woo_ah&hl=ko`
              )
            "
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import GDialog from "@/components/Common/AlertDialog.vue";
export default {
  props: {},
  methods: {
    onClickRedirect: function (a) {
      window.open(a, "_blank");
    },
    Download() {
      this.$store.commit("alertStore/ChangeState");
      this.$store.commit("alertStore/ChangeComment", "준비 중입니다.");
    },
  },
  components: {
    GDialog,
  },
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
  max-width: 90em;

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
  margin-inline: 0.5em;
  white-space: pre;
}
.link {
  font-weight: bold;
  margin-inline: 0.25em;
  white-space: pre;
}
.footer-button {
  margin: 0.25em;
  @include mobile-xs {
    width: 45%;
  }
}
</style>
