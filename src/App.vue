<template>
  <TopHeader class="top" />
  <body>
    <div class="web--content">
      <router-view />
    </div>
  </body>
  <BottomFooter />
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

.web--content {
  background: $pl-6;
  min-height: 720px;
  @include tablet {
  }
  @include mobile-s {
    min-height: 400px;
  }
}
.col {
  width: 100%;
}
</style>
