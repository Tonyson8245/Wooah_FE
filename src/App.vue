<template>
  <div
    class="viewport"
    style="display: flex; flex-direction: column; height: 100vh"
    ref="viewport"
  >
    <TopHeader class="top" />
    <body style="flex: 1">
      <div class="web--content">
        <router-view />
      </div>
    </body>
    <BottomFooter v-if="BottomShow()" />
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
    this.$store.dispatch("CommonStore/getDistricts");
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    BottomShow() {
      var path = this.$route.fullPath;
      if (path == "/shop" || path == "/comparison") return false;
      else return true;
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
.viewport {
  cursor: default;
}
.web--content {
  background: $pl-6;
  height: 100%;

  @include mobile-s {
    min-height: 400px;
  }
}
.col {
  width: 100%;
}
</style>
