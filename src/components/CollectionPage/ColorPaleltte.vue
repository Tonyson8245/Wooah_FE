<template>
  <div class="outer align-middle" @click="CheckColor">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg" :style="`color:${color.border};`"></i>
    </div>
    <div
      class="circle"
      :style="`background:${color.code}; border:${color.border} solid 0.5px;`"
    ></div>
    <br /><span>{{ color.name }}</span>
  </div>
</template>

<script>
export default {
  name: "ColorPaltte.vue",
  props: {
    color: Object,
    tempFilterfull: Boolean,
    SetFilterColor: Boolean,
    FilterCategory: String,
  },
  data() {
    return {
      Checked: "d-none",
    };
  },
  methods: {
    CheckColor() {
      this.$emit("CheckFilter", this.color.id);

      if (this.Checked == "d-none" && !this.tempFilterfull) {
        this.Checked = "visible";
      } else {
        this.Checked = "d-none";
      }
    },
  },
  watch: {
    FilterCategory(data) {
      if (data == "" || data != "디자인 컬러") {
        if (this.SetFilterColor == true) this.Checked = "visible";
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
  font-size: 14px;
  text-align: center;
  position: relative;
  @include tablet {
    font-size: 12px;
  }
}
.check {
  position: absolute;
  left: 32%;
  top: 10%;
  z-index: 2;
  font-size: 30px;
  @include mobile-s {
    top: 3%;
    left: 30%;
  }
}
.circle {
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  @include mobile-s {
    width: 40px;
    height: 40px;
  }
}
</style>
