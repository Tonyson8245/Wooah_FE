<template>
  <TopHeader :PageCondition="PageCondition" />
  <body>
    <div class="web--content">
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
    };
  },
  methods: {
    ChangePageCondition(page) {
      let newArray = ["", ""];

      this.PageCondition = [...newArray];
      switch (page) {
        case "collection":
          this.PageCondition[0] = "active";
          break;
        case "shop":
          this.PageCondition[1] = "active";
          break;
      }
    }, // 각 컴포넌트에서 본인으로 바뀌었다고 신호를 줌 -> 위쪽에서 이걸 TopHeader로 전달함
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";

.web--content {
  padding: 0 15% 0 15%;
  background: #ffffff;
  min-height: 800px;

  @include tablet {
    padding: 0 0 0 0;
  }
  @include mobile-s {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    min-height: 400px;
  }
}
.col {
  width: 100%;
}
</style>
