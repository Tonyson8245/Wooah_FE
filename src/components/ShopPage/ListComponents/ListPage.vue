<template>
  <div style="background: white">
    <SearchPage></SearchPage>
    <TitleItem></TitleItem>
    <div class="shoplist" :style="ListHeight" v-if="!noResultlist">
      <ShopItem
        v-for="(shop, index) in shops"
        :key="index"
        :shop="shop"
        :index="index"
        @click="ClickShop(shop.id, index)"
        @mouseover="FocusShop(index)"
        @mouseleave="FocusoutShop()"
      ></ShopItem>
    </div>
    <div
      class="shoplist parent"
      :style="ListHeight"
      v-else
      style="text-align: center"
    >
      <div class="child">조건에 맞는 샵이 존재하지 않습니다.</div>
    </div>
    <div style="text-align: center; margin-top: 2%">
      <div style="display: inline-block">
        <v-pagination
          v-model="page"
          :pages="totalPage"
          :range-size="1"
          active-color="#e4e4e4"
          :hideFirstButton="false"
          :hideLastButton="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchPage from "./SearchPage.vue";
import TitleItem from "./TitleItem.vue";
import ShopItem from "./ShopItem.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: `ListPage`,
  data() {
    return {
      ListHeight: ``,
      page: 1,
    };
  },
  props: {
    MapView: Boolean,
    width: Number,
  },
  components: {
    SearchPage,
    TitleItem,
    ShopItem,
    VPagination,
  },
  mounted() {
    this.$store.dispatch("ShopStore/getShops", 1);
    this.$store.dispatch("ShopStore/getDistricts");
  },
  computed: {
    pageReset() {
      return this.$store.state.ShopStore.pageReset;
    },
    shops() {
      return this.$store.state.ShopStore.shops;
    },
    totalPage() {
      return this.$store.state.ShopStore.totalpage;
    },
    keyword() {
      return this.$store.state.ShopStore.keyword;
    },
    noResultlist() {
      return this.$store.state.ShopStore.noResultlist;
    },
  },
  methods: {
    ClickShop(id, index) {
      if (
        this.shops[index].is_partner == null ||
        this.shops[index].is_partner == true
      ) {
        this.$router.push("/shop/" + id);
      }
      this.FocusoutShop(); // 해당 샵에서 포커스 벗어남
      this.$store.commit("ShopStore/SetShop", index); //vuex에 올려서, 마커 위로 올라올수 있게 하기 위함.
    },
    FocusShop(index) {
      this.$store.commit("ShopStore/SetFocusmarker", index);
    },
    FocusoutShop() {
      this.$store.commit("ShopStore/SetFocusmarker", null);
    },
  },
  watch: {
    pageReset(state) {
      if (state) {
        this.page = 1;
        this.$store.commit("ShopStore/SetPageReset", false);
      }
    },
    page(state) {
      if (this.keyword == "") this.$store.dispatch("ShopStore/getShops", state);
      else
        this.$store.dispatch("ShopStore/searchShops", {
          keyword: this.keyword,
          page: state,
        }); // 다음 페이지 불러오기 // 검색 상태일 경우 검색api 활용/ 아닐 경우 일반 내주변 모아보기 api활용
    },
    keyword(state) {
      if (state != "")
        this.$store.dispatch("ShopStore/searchShops", {
          keyword: state,
          page: 1,
        });
      // 검색 요청
      else this.$store.dispatch("ShopStore/getShops", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

.shoplist {
  overflow-y: auto;
  height: $list-desktop-height;
  @include tablet-s {
    height: $list-tablet-height;
  }
  @include tablet {
    height: $list-tablet-height + 145px;
  }
  @include mobile-s {
    height: auto;
    overflow: none;
  }
}
.parent {
  display: flex;
  align-items: center;
  text-align: center;
}
.child {
  font-family: "GoyangIlsan";
  margin: auto;
}
</style>
