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
    return {
      title: "내 주변 샵 보기",
      region: "서울특별시 동작구",
    };
  },
  computed: {
    districtData() {
      return this.$store.state.ShopStore.districtData;
    },
  },
  methods: {
    changeDistrict(sido, sigungu) {
      this.region = sido.name + ` ` + sigungu.name;
      this.$store.commit("ShopStore/SetDistrict", [sido, sigungu]);
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
