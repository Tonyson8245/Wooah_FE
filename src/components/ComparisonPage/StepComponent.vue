<template>
  <div class="circle" :style="circleCSS">
    <div class="name" :style="nameCSS">
      <div>
        <span v-if="noStep">STEP <br /></span>{{ num }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `StepComponent`,
  data() {
    return {};
  },
  props: {
    num: Number,
    focus: Boolean,
    size: Number,
  },
  computed: {
    nameCSS() {
      if (!this.focus) return `color: #9900ff;`;
      else return `color: #ffffff;`;
    },
    circleCSS() {
      if (this.focus) return `background: #9900ff;` + this.size + `px`;
      else return `background: #ffffff; opacity: 0.5;` + this.size + `px`;
    },
    width() {
      return this.$store.state.CommonStore.width;
    },
    noStep() {
      if (this.width > 767) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
$tablet_circle: 40px;
$desktop_cricle: 70px;
.circle {
  margin: 0 auto;
  width: $desktop_cricle;
  height: $desktop_cricle;
  border: 3px solid #9900ff;
  border-radius: 50%;
  display: flex;

  @include tablet-s {
    width: $tablet_circle;
    height: $tablet_circle;
  }
}
.name {
  font-weight: bold;
  font-size: 1.3em;
  margin: auto;
}
.name span {
  font-size: 70%;
}
.name div {
  padding: none;
}
</style>
