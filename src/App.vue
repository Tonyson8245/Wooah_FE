<template>
  <TopHeader />
  <body>
    <div class="web--content" :style="padding">
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
      padding: ``,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";

.web--content {
  background: #fafafa;
  min-height: 750px;

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
