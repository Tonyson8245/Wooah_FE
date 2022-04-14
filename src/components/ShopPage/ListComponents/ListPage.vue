<template>
  <div>
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
  </div>
</template>

<script>
import SearchPage from "./SearchPage.vue";
import TitleItem from "./TitleItem.vue";
import ShopItem from "./ShopItem.vue";
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
  },
  watch: {},
  computed: {
    shops() {
      return this.$store.state.ShopStore.shops;
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
