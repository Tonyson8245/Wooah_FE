<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      :style="css + font"
      :class="fontSize"
      @click="changeState"
    >
      {{ region }}
    </button>
    <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <template v-for="(sido, i) in districtData" :key="i">
        <span class="dropdown-header">{{ sido.name }}</span>
        <a class="dropdown-item" @click="changeDistrict(sido, 0)"> 전체 </a>
        <a
          v-for="sigungu in districtData[i].sigungu"
          :key="sigungu"
          class="dropdown-item"
          @click="changeDistrict(sido, sigungu)"
          >{{ sigungu.name }}</a
        >
      </template>
    </div> -->
    <GDialog v-model="dialogState" max-width="300">
      <transition name="fade">
        <div class="wrapper">
          <div class="content p-3 py-4">
            <h6 class="text-center">서울특별시</h6>
            <div>
              <div
                v-for="(sido, i) in districtData"
                :key="i"
                class="text-center"
              >
                <div class="d-block">
                  <span class="p-0" @click="changeTempDistict(1, { id: 0 })">
                    <span
                      v-if="this.sigunguTemp == 0"
                      class="badge rounded-pill text-dark m-1 pe-click sigungu px-3"
                      style="
                        background: #a863ea !important;
                        color: white !important;
                      "
                      >전체</span
                    >
                    <span
                      v-else
                      class="badge rounded-pill text-dark m-1 pe-click sigungu px-3"
                      style="background: #ceb5ff"
                      >전체</span
                    >
                  </span>
                  <span
                    class="p-0"
                    v-for="sigungu in districtData[i].sigungu"
                    :key="sigungu"
                    @click="changeTempDistict(1, sigungu)"
                  >
                    <span
                      v-if="this.sigunguTemp == sigungu.id"
                      class="badge rounded-pill text-dark m-1 pe-click sigungu"
                      style="
                        background: #a862ea !important;
                        color: white !important;
                      "
                      >{{ sigungu.name }}</span
                    >
                    <span
                      v-else
                      class="badge rounded-pill text-dark m-1 pe-click sigungu"
                      style="background: #ceb5ff"
                      >{{ sigungu.name }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="actions container-fluid row g-0 text-center">
            <div class="col-6">
              <div class="btn" @click="changeDistrict">설정</div>
            </div>
            <div
              class="col-6 border-start border-1"
              style="border-color: #cbc0e0 !important"
            >
              <div class="btn" @click="changeState">취소</div>
            </div>
          </div>
        </div>
      </transition>
    </GDialog>
  </div>
</template>

<script>
export default {
  name: `RegionComponent`,

  data() {
    return {
      css: "outline: none !important; box-shadow: none;",
      dialogState: false,
      sidoTemp: 1,
      sigunguTemp: 1,
    };
  },
  props: {
    font: String,
  },
  mounted() {
    this.sigunguTemp = this.$store.state.CommonStore.sigungu;
  },
  computed: {
    districtData() {
      return this.$store.state.CommonStore.districtData;
    },
    region() {
      var text;
      var data = this.$store.state.CommonStore.districtData;
      if (data.length > 0) {
        var sigungu = this.$store.state.CommonStore.sigungu;
        var sido = this.$store.state.CommonStore.sido;

        var sigunguName, sidoName;

        if (sigungu != 0) {
          sigunguName = data[sido - 1].sigungu[sigungu - 1].name;
          sidoName = data[sido - 1].name;

          text = sidoName + ` ` + sigunguName;
        } else {
          sidoName = data[sido - 1].name;

          text = sidoName + ` 전체`;
        }
      } else text = "서울특별시 전체";

      this.$store.commit("CommonStore/setDistricttext", text);
      return text;
    },
    fontSize() {
      if (this.$store.state.CommonStore.width > 767) return `btn-lg`;
      else return ``;
    },
  },
  watch: {},
  methods: {
    changeState() {
      this.dialogState = !this.dialogState;
    },
    changeTempDistict(sido, sigungu) {
      this.sidoTemp = sido;
      this.sigunguTemp = sigungu.id;
    },
    changeDistrict() {
      this.$store.commit("CommonStore/SetDistrict", {
        sido: this.sidoTemp,
        sigungu: this.sigunguTemp,
      });
      this.$store.commit("CommonStore/setUpdateDistrict", true);
      // if (sigungu == 0)
      //   this.$emit("changeDistrict", { sido: sido.id, sigungu: 0 });
      // else this.$emit("changeDistrict", { sido: sido.id, sigungu: sigungu.id });
      this.dialogState = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style.scss";

.wrapper {
  color: #000;
  font-family: "GoyangIlsan";
}
.btn {
  color: #000;
  @include mobile-s {
    font-size: 12px;
  }
}

.content {
  padding: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
}

.actions {
  background: $pl-4;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.actions button {
  width: 100%;
  font-size: 80%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.badge {
  font-size: 0.9em;
  font-weight: 500;
}

/* .sigungu:hover,
.sigungu:focus,
.sigungu:active,
.sigungu.active,
.open > .sigungu :hover {
  background: $pa !important;
  color: white !important;
} */
</style>
