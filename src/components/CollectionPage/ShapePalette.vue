<template>
  <div class="outer" @click="CheckShape">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg bi-secondary" style="color: #6545a4"></i>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <img
        :src="require(`@/assets/img/filter/${this.shape.url}`)"
        alt=""
        class="m-auto"
      />
      <span class="py-1 fw-bold">{{ this.shape.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShapePalette.vue",
  props: {
    shape: Object,
    tempFilterfull: Boolean,
    SetFilterShape: Boolean,
    FilterCategory: String,
  },
  data() {
    return {
      Checked: "d-none",
    };
  },
  methods: {
    CheckShape() {
      this.$emit("CheckFilter", this.shape.id);

      if (this.Checked == "d-none" && !this.tempFilterfull) {
        this.Checked = "visible";
      } else {
        this.Checked = "d-none";
      }
    },
  },
  watch: {
    FilterCategory(data) {
      if (data == "" || data == "쉐입") {
        if (this.SetFilterShape == true) this.Checked = "visible";
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
  left: 32%;
  top: 15%;
  z-index: 2;
  font-size: 30px;
  @include mobile-s {
    top: 5%;
    left: 29%;
  }
}
img {
  width: 40%;
  @include tablet {
    width: 30%;
  }
}
</style>
