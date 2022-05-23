<template>
  <div class="outline">
    <GDialog :yesno="true" />
    <div class="header">
      <Region :font="font" />
      <p class="title">맞춤 시술 가격 비교</p>
    </div>
    <div class="body">
      <div class="container-lg" style="flex-direction: column; flex: 1">
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
        <div class="result__outline" v-else-if="result">
          <div class="result__container">
            <div class="result__header p-3">
              <div class="d-flex title">
                <div class="me-auto p-2 bd-highlight">
                  비교결과 {{ districttext }}
                </div>
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
            <div class="result__body mb-1" v-if="this.result.length > 0">
              <ShopItem
                v-for="(shop, i) in shops"
                :key="i"
                :comparison="true"
                :index="i"
                :shop="shop"
              />
            </div>
            <div v-else class="p-5">조건에 맞는 샵이 없습니다.</div>
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
import GDialog from "@/components/Common/AlertDialog.vue";

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
      this.$store.commit("ComparisonStore/setResult", []);
    },
  },
  mounted() {
    this.$store.dispatch("ComparisonStore/fetchProcedure");
    this.$store.commit("Setpagecondition", "comparison");
    this.$store.commit("ComparisonStore/setType", "hand");
    this.restart();
    if (this.page == `foot`) {
      this.$store.commit("ComparisonStore/setTotalStep", 5);
    } else this.$store.commit("ComparisonStore/setTotalStep", 3);
  },
  components: {
    Region,
    Steps,
    Detail,
    ShopItem,
    GDialog,
  },

  computed: {
    districttext() {
      return "- " + this.$store.state.CommonStore.districttext;
    },
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
      var css = `color:#d500f9; font-weight: bold; padding-bottom:0; `;
      if (this.width < 420) return css + `font-size:100%`;
      else return css;
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    result() {
      return this.$store.state.ComparisonStore.result;
    },
    menu() {
      if (this.result.length > 0) {
        console.log(123);
        return this.$store.state.ComparisonStore.result[0].estimate;
      } else return "";
    },
    shops() {
      if (this.result.length > 0) {
        return this.$store.state.ComparisonStore.result[0].shops;
      } else return "";
    },
  },
  watch: {
    districttext() {
      if (this.result.length > 0) {
        this.$store.dispatch("ComparisonStore/fetchPriceList", {
          qeury: this.query,
          sido: this.sido,
          sigungu: this.sigungu,
        });
      } // 결과가 있는 상태에서 텍스트가 바뀌면 지역 바꿔서 검색 결과 노출
    },
  },
  shops(a) {
    console.log(a);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.outline {
  background: $pl-6;
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
  color: $pa-1;
  font-size: 1.8em;
  margin: 0;
}
.body {
  height: auto;
  background: $pl-5;
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
  background: $pa-0;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1%;
  color: $pl-6;
}
.active {
  background: $pa-1;
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
  border: $pa-2 solid 2px;
  border-radius: 10px;
  width: 70%;
  @include tablet {
    width: 100%;
  }
}

.result__header .title {
  font-size: 1.2em;
  font-weight: bold;
  color: $pa-2;
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
  background: $pl-6;
  max-height: 400px;
  overflow-y: scroll;
  @include mobile-s {
    max-height: none;
    overflow: hidden;
  }
}
</style>
