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
