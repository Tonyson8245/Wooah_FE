<template>
  <div class="outer align-middle" @click="CheckShape">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg" :style="`color:${shape.border};`"></i>
    </div>
    <i class="bi bi-fingerprint img"></i>
  </div>
</template>

<script>
export default {
  name: "ShapePalette.vue",
  props: {
    shape: Object,
  },
  data() {
    return {
      Checked: "d-none",
    };
  },
  methods: {
    CheckShape() {
      if (this.Checked == "d-none") this.Checked = "visible";
      else {
        this.Checked = "d-none";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.outer {
  font-family: "GoyangIlsan";
  font-size: 10px;
  text-align: center;
  position: relative;
  @include mobile-xs {
    font-size: 12px;
  }
}
.check {
  position: absolute;
  left: 32%;
  top: 15%;
  z-index: 2;
  font-size: 30px;
}
.img {
  font-size: 50px;
  @include mobile-xs {
    font-size: 40px;
  }
}
</style>
