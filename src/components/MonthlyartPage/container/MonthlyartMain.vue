<template>
  <div style="width: 100%">
    <div v-if="!nothumbnails" :key="componentKey">
      <list
        v-for="(thumbnail, i) in thumbnails"
        :key="i"
        :thumbnail="thumbnail"
      />
    </div>
    <div v-if="nothumbnails" class="noResult">
      <span class="item">조회 결과가 없습니다.</span>
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
  mounted() {
    this.$store.commit("Setpagecondition", "monthlyart");
    this.reset();
    this.getThumbnails();
  },
  methods: {
    getThumbnails() {
      this.$store.dispatch("MonthlyartStore/getThumbnails", {
        sido: this.sido,
        sigungu: this.sigungu,
      });
    },
    reset() {
      this.$store.commit("MonthlyartStore/resetThumbnail");
    },
  },
  computed: {
    thumbnails() {
      return this.$store.state.MonthlyartStore.thumbnails;
    },
    nothumbnails() {
      return this.$store.state.MonthlyartStore.nothumbnails;
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    updateDistrict() {
      return this.$store.state.CommonStore.updateDistrict;
    },
  },
  watch: {
    thumbnails() {
      this.componentKey += 1; // 갱신이 안되는 문제 가 있어 component 키를 올려줌으로서 갱신을 시킴
    },
    sigungu() {
      this.reset();
      this.getThumbnails();
      this.$store.commit("CommonStore/setUpdateDistrict", false);
    },
  },
  components: {
    list,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.noResult {
  text-align: center;
  padding: 15% 0 15% 0;
  @include tablet {
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 70%;
  }
}
</style>
