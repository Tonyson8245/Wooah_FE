<template>
  <div style="width: 100%">
    <div v-if="!nothumbnails" :key="componentKey">
      <list
        v-for="(thumbnail, i) in thumbnails"
        :key="i"
        :thumbnail="thumbnail"
      />
    </div>
  </div>
</template>

<script>
import list from "../ListComponent.vue";
export default {
  name: `MonthlyarMain`,
  data() {
    return {
      districtCheck: ``,
      componentKey: 0,
    };
  },
  computed: {
    thumbnails() {
      return this.$store.state.MonthlyartStore.thumbnails;
    },
    nothumbnails() {
      return this.$store.state.MonthlyartStore.nothumbnails;
    },
  },
  watch: {
    thumbnails() {
      this.componentKey += 1; // 갱신이 안되는 문제 가 있어 component 키를 올려줌으로서 갱신을 시킴
    },
  },
  components: {
    list,
  },
};
</script>

<style></style>
