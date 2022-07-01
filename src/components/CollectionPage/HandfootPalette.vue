<template>
  <div class="outer" @click="CheckLimbs">
    <div class="check" :class="Checked">
      <i class="bi bi-check-lg bi-secondary" style="color: #6545a4"></i>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <img
        :src="require(`@/assets/img/filter/${this.limbs.url}`)"
        alt=""
        class="m-auto"
      />
      <h6 class="py-1 fw-bold">{{ this.limbs.name }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "HandfootPalette.vue",
  props: {
    limbs: Object,
    SetFilterLimbs: Boolean,
    FilterCategory: String,
    index: Number,
    tempFilter: Array,
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
  computed: {
    show() {
      return this.tempFilter.indexOf(this.index);
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
img {
  width: 50%;
}
</style>
