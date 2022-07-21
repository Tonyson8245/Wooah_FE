<template>
  <div class="viewport" ref="viewport">
    <div style="position: sticky; right: 0; z-index: 2" class="border-bottom">
      <TopHeader />
    </div>
    <body>
      <div class="web--content">
        <router-view />
      </div>
    </body>
    <BottomFooter />
    <div class="d-none d-md-block d-lg-block d-xl-block fixed-bottom">
      <div class="fab-container">
        <div class="fab shadow">
          <i class="bi bi-question-circle-fill fab-content"></i>
          <!-- <div class="fab-content">문의하기</div> -->
        </div>
        <div class="sub-button">
          <a
            target="_blank"
            @click="onClickRedirect(`http://pf.kakao.com/_fRSHb/chat `)"
          >
            <i class="bi bi-chat-fill"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import BottomFooter from "./components/BottomFooter.vue";

export default {
  name: "App",
  components: {
    TopHeader,
    BottomFooter,
  },
  data() {
    return {
      width: ``,
      height: ``,
      htmlwidth: ``,
      htmlheight: ``,
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      console.log = function no_console() {};
      console.warn = function no_console() {};
    }
    this.$store.dispatch("CommonStore/getDistricts");
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    onClickRedirect: function (a) {
      window.open(a, "_blank");
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.$store.commit("CommonStore/SetSize", [this.width, this.height]);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";
.fab-container {
  font-family: "GoyangDeogyang";
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  position: absolute;
  bottom: 30px;
  right: 30px;
  &:hover {
    .sub-button:nth-child(2) {
      transform: translateY(-60px);
    }
    /* .sub-button:nth-child(3) {
      transform: translateY(-140px);
    }
    .sub-button:nth-child(4) {
      transform: translateY(-200px);
    }
    .sub-button:nth-child(5) {
      transform: translateY(-260px);
    }
    .sub-button:nth-child(6) {
      transform: translateY(-320px);
    } */
  }
  .fab {
    position: relative;
    height: 60px;
    width: 60px;
    background-color: $pl-3;
    border-radius: 50%;
    color: $pa;
    z-index: 2;
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      right: 0;
      height: 35px;
      width: 35px;
      background-color: inherit;
      border-radius: 0 0 10px 0;
      z-index: -1;
    }
    .fab-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      font-size: 2em;
    }
  }
  .sub-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    right: 5px;
    height: 50px;
    width: 50px;
    background-color: $pl-3;
    border-radius: 50%;
    transition: all 0.3s ease;
    &:hover {
      cursor: pointer;
    }
    i {
      color: $pa;
      padding-top: 6px;
    }
  }
}
.viewport {
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 100vh;
  @include mobile-s {
    height: auto;
    min-height: 700px;
  }
}
.web--content {
  height: 100%;
}
.col {
  width: 100%;
}
</style>
