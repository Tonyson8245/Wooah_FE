<template>
  <div class="viewport" ref="viewport">
    <div :style="Bottomstyle()"><TopHeader /></div>
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
    this.handleResize();
  },

  methods: {
    BottomShow() {
      var path = this.$route.fullPath;
      if (path == "/shop" || path == "/comparison") return false;
      else return true;
    },
    Bottomstyle() {
      var path = this.$route.fullPath;
      if (path == "/shop" || path == "/comparison") return `margin-right:17px`;
      else return ``;
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  @include mobile-s {
    height: auto;
    min-height: 400px;
  }
}
.web--content {
  background: $pl-6;
  height: 100%;
}
.col {
  width: 100%;
}
</style>
