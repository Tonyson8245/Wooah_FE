<template>
  <div class="outer align-middle">
    <i class="bi bi-fingerprint img"></i>
  </div>
</template>

<script>
export default {
  name: "OptionPalette.vue",
  props: {
    option: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.outer {
  font-family: "GoyangIlsan";
  font-size: 10px;
  text-align: center;
  @include mobile-xs {
    font-size: 12px;
  }
}
.img {
  font-size: 50px;
  @include mobile-xs {
    font-size: 40px;
  }
}
</style>
