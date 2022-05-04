<template>
  <div>
    <banner :title="title" />
  </div>
</template>

<script>
import banner from "./BannerComponent.vue";

export default {
  name: `Monthlyart`,
  data() {
    return {};
  },
  computed: {
    title() {
      var title;
      if (this.$route.path == "/monthlyart") title = "monthlyart";
      return title;
    },
  },
  mounted() {
    this.$store.commit("Setpagecondition", "monthlyart");
  },
  components: {
    banner,
  },
};
</script>

<style></style>
