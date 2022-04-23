<template>
  <div class="title__container container-fluid row g-0">
    <div class="col-6 title">
      <span>{{ title }}</span>
    </div>
    <div class="col-6 region">
      <div class="dropdown">
        <button
          class="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ region }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <template v-for="(sido, i) in districtData" :key="i">
            <span class="dropdown-header">{{ sido.name }}</span>
            <li>
              <a class="dropdown-item" @click="changeDistrict(sido, 0)">
                전체
              </a>
            </li>
            <li v-for="sigungu in districtData[i].sigungu" :key="sigungu">
              <a class="dropdown-item" @click="changeDistrict(sido, sigungu)">{{
                sigungu.name
              }}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `TitleItem`,
  data() {
    return {};
  },
  beforemounted() {},
  computed: {
    districtData() {
      return this.$store.state.ShopStore.districtData;
    },
    title() {
      if (this.$store.state.ShopStore.keyword == "") {
        return `내 주변 샵보기`;
      } else {
        return `검색 결과`;
      }
    },
    region() {
      var data = this.$store.state.ShopStore.districtData;
      if (data.length > 0) {
        var sigungu = this.$store.state.ShopStore.sigungu;
        var sido = this.$store.state.ShopStore.sido;

        var sigunguName, sidoName;

        if (sigungu != 0) {
          sigunguName = data[sido - 1].sigungu[sigungu - 1].name;
          sidoName = data[sido - 1].name;

          return sidoName + ` ` + sigunguName;
        } else {
          sidoName = data[sido - 1].name;

          return sidoName + ` 전체`;
        }
      } else return "서울특별시 전체";
    },
  },
  methods: {
    changeDistrict(sido, sigungu) {
      this.$store.commit("ShopStore/SetDistrict", [
        sido,
        sigungu,
        Math.random(),
      ]);
      this.$store.dispatch("ShopStore/getShops", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//제목 시작
.title__container {
  height: 4em;
  width: 100%;
  @include tablet {
    font-size: 70%;
  }
}
.title__container .title {
  font-family: "GoyangIlsan";
  margin: auto;
  padding-left: 6%;
  font-size: 1.2em;
  font-weight: bold;
  @include tablet {
    font-size: 1.5em;
    padding-left: 3%;
  }
}
.title__container .region {
  font-family: "GoyangIlsan";
  margin: auto;
  font-size: 1em;
  text-align: right;
}
.dropdown-toggle {
  @include tablet-s {
    font-size: 1.8em;
  }
  @include tablet {
    font-size: 1.3em;
  }
}
.btn__name {
  white-space: nowrap;
  @include tablet {
    font-size: 11px;
  }
}
//제목 끝
</style>
