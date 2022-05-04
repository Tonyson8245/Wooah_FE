<template>
  <div>
    <banner :title="title" />
    <div class="monthlyart__container container">
      <region class="region" :fontSize="fontSize" />
      <list
        v-for="(thumbnail, i) in this.thumbnails"
        :key="i"
        :thumbnail="thumbnail"
      />
    </div>
  </div>
</template>

<script>
import banner from "./BannerComponent.vue";
import region from "../Common/RegionComponent.vue";
import list from "./ListComponent.vue";

export default {
  name: `Monthlyart`,
  data() {
    return {
      fontSize: `btn-lg`,
    };
  },
  computed: {
    title() {
      var title;
      if (this.$route.path == "/monthlyart") title = "monthlyart";
      return title;
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    thumbnails() {
      return this.$store.state.MonthlyartStore.thumbnails;
    },
  },
  mounted() {
    this.$store.commit("Setpagecondition", "monthlyart");
    this.$store.dispatch("MonthlyartStore/getThumbnails", [
      this.sido,
      this.sigungu,
    ]);
  },
  components: {
    banner,
    region,
    list,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
.monthlyart__container {
  font-family: "GoyangIlsan";
}
.region {
  text-align: right;
}
</style>
