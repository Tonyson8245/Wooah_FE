<template>
  <div>샵페이지</div>
  <UltimateScroll />
</template>

<script>
import UltimateScroll from "./UltimateScroll.vue";
export default {
  name: "ShopPage",
  mounted() {
    this.$emit("ChangePageCondition", "shop");
  },
  components: {
    UltimateScroll,
  },
};
</script>

<style></style>
