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
        <div v-if="totalStep >= step">
          <!-- <div v-if="false"> -->
          <div class="container__step">
            <Steps />
          </div>
          <div>
            <Detail />
          </div>
        </div>
        <div class="result__outline" v-else-if="result != undefined">
          <div class="result__container">
            <div class="result__header p-3">
              <div class="d-flex title">
                <div class="me-auto p-2 bd-highlight">비교결과</div>
                <div class="p-2 d-flex" @click="restart">
                  다시하기
                  <img src="@/assets/img/recheck.svg" alt="" />
                </div>
              </div>
              <div class="content">
                <div class="subtitle">내가 선택한 시술</div>
                <div class="estimate d-flex">
                  <div>
                    <img src="@/assets/img/nailicon.png" alt="" class="pe-2" />
                  </div>
                  <div class="align-self-center">
                    {{ menu }}
                  </div>
                </div>
              </div>
            </div>
            <div class="result__body mb-1">
              <ShopItem
                v-for="(shop, i) in shops"
                :key="i"
                :comparison="true"
                :index="i"
                :shop="shop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Region from "@/components/Common/RegionComponent.vue";
import Steps from "@/components/ComparisonPage/StepsComponent.vue";
import Detail from "@/components/ComparisonPage/DetailComponent.vue";
import ShopItem from "@/components/Common/ShopItem.vue";

export default {
  name: `comparison`,
  data() {
    return {};
  },
  methods: {
    clickPage(page) {
      this.$store.commit("ComparisonStore/setType", page);
      this.$store.commit("ComparisonStore/resetQuery");
      if (page == `foot`) {
        this.$store.commit("ComparisonStore/setTotalStep", 5);
      } else this.$store.commit("ComparisonStore/setTotalStep", 3);
    },
    restart() {
      this.$store.commit("ComparisonStore/resetQuery");
      this.$store.commit("ComparisonStore/resetStep");
    },
  },
  mounted() {
    this.$store.dispatch("ComparisonStore/fetchProcedure");
    this.$store.commit("Setpagecondition", "comparison");
    this.$store.commit("ComparisonStore/setType", "hand");
    this.restart();
  },
  components: {
    Region,
    Steps,
    Detail,
    ShopItem,
  },
  computed: {
    type() {
      return this.$store.state.ComparisonStore.type;
    },
    step() {
      return this.$store.state.ComparisonStore.step;
    },
    totalStep() {
      return this.$store.state.ComparisonStore.totalStep;
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
    result() {
      return this.$store.state.ComparisonStore.result[0];
    },
    menu() {
      return this.$store.state.ComparisonStore.result[0].estimate;
    },
    shops() {
      return this.$store.state.ComparisonStore.result[0].shops;
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
.result__outline {
  padding: 5% 0 0 0;
  display: flex;
  justify-content: center;
  @include mobile-s {
    padding: 8% 0 0 0;
  }
}
.result__container {
  background: white;
  border: #5200ff solid 2px;
  border-radius: 10px;
  width: 70%;
  @include tablet {
    width: 100%;
  }
}

.result__header .title {
  font-size: 1.2em;
  font-weight: bold;
  color: #5200ff;
}

.result__header .content {
  text-align: left;
  padding-inline: 2%;
}
.content .subtitle {
  font-size: 1.5em;
  font-weight: bold;
}

.estimate {
  padding: 1% 0 1% 0;
}
.result__body {
  background: #f0e9ff;
  max-height: 400px;
  overflow-y: scroll;
  @include mobile-s {
    max-height: none;
    overflow: hidden;
  }
}
</style>
