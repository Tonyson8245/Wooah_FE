<template>
  <div class="outer align-middle" @click="CheckLimbs">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg bi-secondary" style="color: black"></i>
    </div>
    <i class="bi bi-fingerprint img" style="color: #c4c4c4"></i>
  </div>
</template>

<script>
export default {
  name: "HandfootPalette.vue",
  props: {
    limbs: Object,
    SetFilterLimbs: Boolean,
    FilterCategory: String,
  },
  data() {
    return {
      Checked: "d-none",
    };
  },
  methods: {
    CheckLimbs() {
      this.$emit("CheckFilter", this.limbs.id);

      if (this.Checked == "d-none") {
        this.Checked = "visible";
      } else {
        this.Checked = "d-none";
      }
    },
  },
  watch: {
    FilterCategory(data) {
      if (data == "" || data == "손발") {
        if (this.SetFilterLimbs == true) this.Checked = "visible";
        else this.Checked = "d-none";
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
  left: 41%;
  top: 10%;
  z-index: 2;
  font-size: 30px;
  @include mobile-s {
    top: 9%;
    left: 39%;
  }
}
.img {
  font-size: 50px;
  @include mobile-xs {
    font-size: 40px;
  }
}
</style>
