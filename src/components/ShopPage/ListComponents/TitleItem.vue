<template>
  <div class="title__container container-fluid row g-0 user-select-none">
    <div class="col-6 title">
      <span>{{ title }}</span>
    </div>
    <div class="col-6 region">
      <!-- <div class="dropdown">
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
      </div> -->
      <region :font="'color:#6545A4; font-size:1.1em; padding:0 0 0 0'" />
    </div>
  </div>
</template>

<script>
import region from "@/components/Common/RegionComponent.vue";
export default {
  name: `TitleItem`,
  data() {
    return {};
  },
  components: {
    region,
  },
  mounted() {
    this.$store.dispatch("ShopStore/getShops", {
      page: 1,
      sido: this.sido,
      sigungu: this.sigungu,
    });
  },
  computed: {
    districtData() {
      return this.$store.state.CommonStore.districtData;
    },
    title() {
      if (this.$store.state.ShopStore.keyword == "") {
        return `내 주변 샵보기`;
      } else {
        return `검색 결과`;
      }
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
  },
  watch: {
    sigungu(a) {
      this.$store.dispatch("ShopStore/getShops", {
        page: 1,
        sido: this.sido,
        sigungu: a,
      }); // 시군구가 바뀔때, 바뀌게함
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//제목 시작
.title__container {
  border: $pl-4 0.5px solid;
  color: $pa;
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
  padding-right: 0.5em;
}

.dropdown-menu span,
.dropdown-item {
  color: $pl-2;
}
.dropdown-toggle {
  box-shadow: unset;
  color: $pl-1;
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
