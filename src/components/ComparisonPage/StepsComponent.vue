<template>
  <div class="d-flex">
    <div v-for="i in totalNum" :key="i" class="d-flex">
      <Step :num="i" :focus="focusNum == i" />
      <img src="@/assets/icon/dotthree.png" alt="" v-if="i != totalNum" />
    </div>
  </div>
</template>

<script>
import Step from "@/components/ComparisonPage/StepComponent.vue";
export default {
  name: `StepsComponent`,
  data() {
    return {};
  },
  props: {
    totalNum: Number,
  },
  components: {
    Step,
  },
  computed: {
    focusNum() {
      return this.$store.state.ComparisonStore.focusNum;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style.scss";
$tablet_circle: 30px;
$desktop_cricle: 60px;
img {
  margin: auto;
  padding: 10%;
  width: $desktop_cricle;
  height: $desktop_cricle;
  @include tablet {
    padding: 5%;
    width: $tablet_circle;
    height: $tablet_circle;
  }
}
</style>
