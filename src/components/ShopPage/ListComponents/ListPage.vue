<template>
  <div style="background: white">
    <SearchPage></SearchPage>
    <TitleItem></TitleItem>
    <div class="shoplist" :style="ListHeight">
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
    <div style="text-align: center">
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
      pindex: null,
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
    shops() {
      return this.$store.state.ShopStore.shops;
    },
    totalPage() {
      return this.$store.state.ShopStore.totalpage;
    },
  },
  methods: {
    ClickShop(id, index) {
      this.$router.push("/shop/" + id);
      this.FocusoutShop();
      this.$store.commit("ShopStore/SetShop", index);
    },
    FocusShop(index) {
      if (this.pindex != index) {
        this.$store.commit("ShopStore/SetFocusmarker", index);
        this.pindex = index;
      }
    },
    FocusoutShop() {
      if (this.pindex != null) {
        this.$store.commit("ShopStore/SetFocusmarker", null);
      }
    },
  },
  watch: {
    page(state) {
      this.$store.dispatch("ShopStore/getShops", state);
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
</style>
