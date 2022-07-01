<template>
  <div class="outer" @click="CheckOption">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg bi-secondary" style="color: #6545a4"></i>
    </div>
    <!-- <i class="bi bi-fingerprint img"></i> -->

    <div class="d-flex flex-column justify-content-center">
      <img
        :src="require(`@/assets/img/filter/${this.option.url}`)"
        alt=""
        class="m-auto"
      />
      <span class="py-2 fw-bold">{{ this.option.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionPalette",
  props: {
    option: Object,
    tempFilterfull: Boolean,
    SetFilterOption: Boolean,
    FilterCategory: String,
  },
  data() {
    return {
      Checked: "d-none",
      src: this.option.url,
    };
  },
  methods: {
    CheckOption() {
      this.$emit("CheckFilter", this.option.id);

      if (this.Checked == "d-none" && !this.tempFilterfull) {
        this.Checked = "visible";
      } else {
        this.Checked = "d-none";
      }
    },
  },
  watch: {
    FilterCategory(data) {
      if (data == "" || data == "옵션") {
        if (this.SetFilterOption == true) this.Checked = "visible";
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
  left: 37%;
  top: 15%;
  z-index: 2;
  font-size: 30px;
  @include mobile-s {
    top: 6%;
    left: 34%;
  }
}
img {
  width: 40%;
}
</style>
