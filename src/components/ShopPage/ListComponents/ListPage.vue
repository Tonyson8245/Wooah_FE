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
        @click="ClickShop(shop.id)"
      ></ShopItem>
    </div>
    <div style="text-align: center">
      <div style="display: inline-block">
        <v-pagination
          v-model="page"
          :pages="totalPage"
          :range-size="3"
          active-color="#000000"
          @update:modelValue="updateHandler"
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
  watch: {},
  computed: {
    shops() {
      return this.$store.state.ShopStore.shops;
    },
    totalPage() {
      return 3;
    },
  },
  methods: {
    ClickShop(id) {
      this.$router.push("/shop/" + id);
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
