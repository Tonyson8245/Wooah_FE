<template>
  <TopHeader :PageCondition="PageCondition" />
  <body>
    <div class="web--content" :style="padding">
      <router-view @ChangePageCondition="ChangePageCondition" />
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
      PageCondition: ["", ""],
      padding: ``,
    };
  },

  methods: {
    ChangePageCondition(page) {
      let newArray = ["", ""];
      this.padding = ``;
      this.PageCondition = [...newArray];
      switch (page) {
        case "collection":
          this.PageCondition[0] = "active";
          break;
        case "shop":
          this.PageCondition[1] = "active";
          // this.padding = `padding: 0 0 0 0`;
          break;
      }
    }, // 각 컴포넌트에서 본인으로 바뀌었다고 신호를 줌 -> 위쪽에서 이걸 TopHeader로 전달함
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";

/* .web--content {
  padding: 0 20% 0 20%;
  background: #ffffff;

  @include tablet {
    padding: 0 0 0 0;
  }
  @include mobile-s {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }
} */
.col {
  width: 100%;
}
</style>
