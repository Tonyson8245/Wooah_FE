<template>
  <div>
    <AlertDialog />
    <div class="outline">
      <GDialog :yesno="true" />
      <div class="header">
        <Region :font="font" />
        <p class="title">맞춤 시술 견적</p>
      </div>
      <div class="body">
        <div class="container-lg" style="flex-direction: column; flex: 1">
          <div class="row g-0 pe-click">
            <div
              class="tab col-6"
              :class="tab[0]"
              @click="
                this.page = `hand`;
                clickPage();
              "
            >
              네일(손)
            </div>
            <div
              class="tab col-6"
              :class="tab[1]"
              @click="
                this.page = `foot`;
                clickPage();
              "
            >
              페디(발)
            </div>
          </div>

          <div v-if="totalStep >= step">
            <!-- <div v-if="false"> -->
            <div
              class="container__step"
              @click="this.$gtag.event(`Click_comparison_step`)"
            >
              <Steps />
            </div>
            <div>
              <Detail />
            </div>
          </div>
          <div class="result__outline" v-else-if="result != ``">
            <div class="result__container">
              <div class="result__header p-3">
                <div class="d-flex title" style="align-items: center">
                  <div class="me-auto bd-highlight">
                    비교결과 {{ districttext }}
                  </div>
                  <div
                    class="d-flex"
                    style="align-items: center"
                    @click="restart"
                  >
                    다시하기
                    <img class="ms-1" src="@/assets/img/recheck.svg" alt="" />
                  </div>
                </div>
                <div class="content">
                  <div class="subtitle">내가 선택한 시술</div>
                  <div class="estimate d-flex">
                    <div>
                      <img
                        src="@/assets/img/nailicon.png"
                        alt=""
                        class="pe-2"
                      />
                    </div>
                    <div class="align-self-center">
                      {{ menu }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="result__body mb-1" v-if="this.result[0].has_result">
                <ShopItem
                  v-for="(shop, i) in shops"
                  :key="i"
                  :comparison="true"
                  :index="i"
                  :shop="shop"
                  @click="clickShopItem(shop)"
                />
              </div>
              <div v-else class="p-5">조건에 맞는 샵이 없습니다.</div>
            </div>
          </div>
          <div class="result__outline" v-else-if="noQuery != ``">
            <div class="result__container">
              <div class="result__header p-3">
                <div class="d-flex title" style="align-items: center">
                  <div class="me-auto bd-highlight">
                    비교결과 {{ districttext }}
                  </div>
                  <div
                    class="d-flex"
                    style="align-items: center"
                    @click="restart"
                  >
                    다시하기
                    <img class="ms-1" src="@/assets/img/recheck.svg" alt="" />
                  </div>
                </div>
                <div class="content">
                  <div class="subtitle">내가 선택한 시술</div>
                  <div class="estimate d-flex">
                    <div>
                      <img
                        src="@/assets/img/nailicon.png"
                        alt=""
                        class="pe-2"
                      />
                    </div>
                    <div class="align-self-center">선택한 시술이 없습니다.</div>
                  </div>
                </div>
              </div>

              <div class="p-5">시술을 한 개 이상 선택하셔야 합니다.</div>
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
import GDialog from "@/components/Common/AlertDialog.vue";
import AlertDialog from "@/components/Common/AlertDialog.vue";

export default {
  name: `comparison`,
  data() {
    return {
      property: "value",
      page: "",
    };
  },
  methods: {
    clickShopItem(shop) {
      // console.log(shop);
      this.$router.push("/shop/" + shop.id + "/info");
    },
    clickPage() {
      if (this.query.length > 0 && this.result.length == 0) {
        this.$store.commit("alertStore/ChangeState");
        this.$store.commit(
          "alertStore/ChangeComment",
          "선택한 정보가 초기화됩니다."
        );
        return 0;
      } else {
        this.changeTab(this.page);
      }
    },
    changeTab() {
      this.restart();
      this.$store.commit("ComparisonStore/setType", this.page);
      this.$store.commit("ComparisonStore/resetQuery");
      if (this.page == `foot`) {
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
    AlertDialog,
  },

  computed: {
    noQuery() {
      return this.$store.state.ComparisonStore.noQuery;
    },
    dialogResult() {
      return this.$store.state.alertStore.dialogResult;
    },
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
      var css = `color:#6545A4; font-weight: bold; padding-bottom:0; `;
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
        return this.$store.state.ComparisonStore.result[0].estimate;
      } else return "";
    },
    shops() {
      if (this.result.length > 0) {
        if (this.result[0].has_result) {
          return this.$store.state.ComparisonStore.result[0].shops;
        } else return "";
      } else return "";
    },
    updateDistrict() {
      return this.$store.state.CommonStore.updateDistrict;
    },
    query() {
      return this.$store.state.ComparisonStore.query;
    },
  },
  watch: {
    dialogResult(a) {
      if (a) {
        this.changeTab();
        this.$store.commit("alertStore/ChangeResult", null); // 확인 취소 여부 초기화
      }
    },
    districttext() {
      if (this.result.length > 0) {
        this.$store.dispatch("ComparisonStore/fetchPriceList", {
          sido: this.sido,
          sigungu: this.sigungu,
        });
      } // 결과가 있는 상태에서 텍스트가 바뀌면 지역 바꿔서 검색 결과 노출
    },
    updateDistrict(a) {
      if (a) {
        this.$store.commit("CommonStore/setUpdateDistrict", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.outline {
  background: linear-gradient(to top, $pl-4, 20%, white);
  height: inherit;
  font-family: "GoyangIlsan";
  @include mobile-s {
    font-size: 90%;
  }
}
.header {
  background: white;
  text-align: center;
  padding: 1.5% 0 1.5% 0;
}
.header .title {
  font-weight: bold;
  color: $pa;
  font-size: 1.8em;
  margin: 0;
}
.body {
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
  background: $pl-4;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1%;
  color: $pa;
}
.active {
  background: $pl-2;
  color: $pl-4;
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
  font-size: 1vw;
  min-height: 400px;
  @include tablet {
    min-height: 400px;
    font-size: 2.5vw;
  }
  @include mobile-s {
    min-height: 300px;
    padding: 8% 0 0 0;
  }
}

.result__container {
  background: white;
  border: $pa solid 2px;
  border-radius: 10px;
  width: 70%;
  @include tablet {
    width: 100%;
  }
}

.result__header .title {
  font-weight: bold;
  color: $pa;
}

.result__header .content {
  text-align: left;
}
.content .subtitle {
  font-weight: bold;
}

.estimate {
  padding: 1% 0 1% 0;
}
.result__body {
  background: $pl-4;
  max-height: 400px;
  overflow-y: auto;
  @include mobile-s {
    max-height: none;
    overflow: hidden;
  }
}
</style>
