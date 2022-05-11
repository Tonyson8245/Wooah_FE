<template>
  <div class="d-flex">
    <div v-for="i in totalStep" :key="i" class="d-flex">
      <StepComponent :num="i" :focus="step == i" />
      <img src="@/assets/icon/dotthree.png" alt="" v-if="i != totalStep" />
    </div>
  </div>
</template>

<script>
import StepComponent from "@/components/ComparisonPage/StepComponent.vue";
export default {
  name: `StepsComponent`,
  data() {
    return {};
  },

  components: {
    StepComponent,
  },
  computed: {
    step() {
      return this.$store.state.ComparisonStore.step;
    },
    totalStep() {
      return this.$store.state.ComparisonStore.totalStep;
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
