<template>
  <div class="outer align-middle" @click="CheckOption">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg bi-secondary" style="color: black"></i>
    </div>
    <i class="bi bi-fingerprint img" style="color: #c4c4c4"></i>
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
      if (data == "" || data != "옵션") {
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
  left: 35%;
  top: 15%;
  z-index: 2;
  font-size: 30px;
  @include mobile-s {
    top: 6%;
    left: 34%;
  }
}
.img {
  font-size: 50px;
  @include mobile-xs {
    font-size: 40px;
  }
}
</style>
