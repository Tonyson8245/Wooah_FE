<template>
  <div style="background: white; display: flex; flex-direction: column">
    <SearchPage></SearchPage>
    <TitleItem></TitleItem>
    <div
      class="shoplist"
      :style="ListHeight"
      v-if="!noResultlist"
      style="flex-grow: 1"
    >
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
    if (this.currentpage != 0) this.page = this.currentpage;
    this.$store.dispatch("ShopStore/getShops", this.page);
  },
  computed: {
    currentpage() {
      return this.$store.state.ShopStore.currentpage;
    },
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
    mapView() {
      return this.$store.state.ShopStore.SetMaMapViewpView;
    },
  },
  methods: {
    ClickShop(id, index) {
      if (
        this.shops[index].is_partner == null ||
        this.shops[index].is_partner == true
      ) {
        this.$router.push("/shop/" + id + "/info");
        this.$store.commit("ShopStore/SetShop", index); //vuex에 올려서, 마커 위로 올라올수 있게 하기 위함.
      }
    },
    FocusShop(index) {
      this.$store.commit("ShopStore/SetFocusmarker", index);
    },
    FocusoutShop() {
      this.$store.commit("ShopStore/SetFocusmarker", null);
    },
  },
  watch: {
    page(state) {
      if (this.keyword == "") this.$store.dispatch("ShopStore/getShops", state);
      else
        this.$store.dispatch("ShopStore/searchShops", {
          keyword: this.keyword,
          page: state,
        }); // 다음 페이지 불러오기
      // 검색 상태일 경우 검색api 활용/ 아닐 경우 일반 내주변 모아보기 api활용
      this.$store.commit("ShopStore/SetCurrentPage", state);
      if (!this.mapView)
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
    }, // 페이지 이동(조회) 시 요청
    keyword(state) {
      this.page = 1; //  페이지 초기화
      if (state != "") {
        this.$store.dispatch("ShopStore/searchShops", {
          keyword: state,
          page: 1,
        });
        // 첫 검색 요청
      } else this.$store.dispatch("ShopStore/getShops", 1);
    }, // 첫 조회 시 요청
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

.shoplist {
  overflow-y: auto;
  border: solid $pl-4 1px;

  height: $list-desktop-height;
  @include tablet-s {
    height: 100%;
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
