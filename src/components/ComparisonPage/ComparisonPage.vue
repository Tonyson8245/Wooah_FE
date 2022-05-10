<template>
  <div class="outline">
    <div class="header">
      <Region :font="font" />
      <p class="title">맞춤 시술 가격 비교</p>
    </div>
    <div class="body">
      <div class="container-lg">
        <div class="row">
          <div class="tab col-6" :class="tab[0]" @click="clickPage(`hand`)">
            네일(손)
          </div>
          <div class="tab col-6" :class="tab[1]" @click="clickPage(`foot`)">
            페디(발)
          </div>
        </div>
        <div class="container__step">
          <Steps :totalNum="totalNum" />
        </div>
        <div>
          <Detail />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Region from "@/components/Common/RegionComponent.vue";
import Steps from "@/components/ComparisonPage/StepsComponent.vue";
import Detail from "@/components/ComparisonPage/DetailComponent.vue";

export default {
  name: `comparison`,
  methods: {
    clickPage(page) {
      this.$stote.commit("ComparisonStore/setType", page);
    },
  },
  mounted() {
    var type = `hand`;
    if (this.$route.params.type == `foot`) type = `foot`;
    this.$store.commit("ComparisonStore/setType", type);
    this.$store.commit("Setpagecondition", "comparison");
  },
  components: {
    Region,
    Steps,
    Detail,
  },
  computed: {
    totalNum() {
      if (this.$store.state.ComparisonStore.type == "hand") return 3;
      else return 5;
    },
    tab() {
      if (this.$store.state.ComparisonStore.type == "hand")
        return ["active", ""];
      else return ["", "active"];
    },
    width() {
      return this.$store.state.CommonStore.width;
    },
    font() {
      var css = `color:#904DFF; font-weight: bold; padding-bottom:0; `;
      if (this.width < 420) return css + `font-size:100%`;
      else return css;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.outline {
  font-family: "GoyangIlsan";
  @include mobile-s {
    font-size: 80%;
  }
}
.header {
  text-align: center;
  padding: 2% 0 2% 0;
}
.header .title {
  font-weight: bold;
  color: #904dff;
  font-size: 1.8em;
  margin: 0;
}
.body {
  height: auto;
  background: #f8eeff;
  width: 100%;
  text-align: center;
}
.container-lg {
  display: inline-block;
  padding: 1.5% 10% 1.5% 10%;
  @include mobile-s {
    margin-top: 0;
    padding: 0 0 0 0;
  }
} // 가운데 정렬
.tab {
  background: #ecd7ff;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1%;
  color: #ba9aff;
}
.active {
  background: #ddb8ff;
  color: white;
}
.container__step {
  padding: 5% 0 0 0;
  display: flex;
  justify-content: center;
  @include mobile-s {
    padding: 8% 0 0 0;
  }
}
</style>
