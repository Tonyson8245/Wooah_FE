<template>
  <div class="container-sm p-lg-5 pt-lg-0">
    <div class="row d-flex justify-content-center align-items-center g-0">
      <div class="col-md-10">
        <banner :title="title" />
        <div class="monthlyart__container container">
          <region class="region" :fontSize="fontSize" />
          <router-view v-slot="{ Component }">
            <transition name="scale" mode="out-in">
              <component :is="Component" />
            </transition>
            <!-- router-transition -->
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "./BannerComponent.vue";
import region from "../Common/RegionComponent.vue";

export default {
  name: `Monthlyart`,
  data() {
    return {
      fontSize: `btn-lg`,
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
    click() {},
    reset() {
      this.$store.commit("MonthlyartStore/resetThumbnail");
    },
  },
  computed: {
    title() {
      var title;
      if (this.$route.path == "/monthlyart") title = "monthlyart";
      else {
        switch (this.$route.params.price) {
          case `10000`:
            title = `1만원 대`;
            break;
          case `20000`:
            title = `2만원 대`;
            break;
          case `30000`:
            title = `3만원 대`;
            break;
          case `40000`:
            title = `4만원 대`;
            break;
          case `50000`:
            title = `5만원 대`;
            break;
          case `60000`:
            title = `6만원 대`;
            break;
        }
      } //  가격에 따라 배너 타이틀 변경
      return title;
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
    updateDistrict(a) {
      if (a) {
        this.reset();
        this.getThumbnails();
        this.$store.commit("CommonStore/setUpdateDistrict", false);
      }
    },
  },
  components: {
    banner,
    region,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//router transition
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(1);
}

.monthlyart__container {
  font-family: "GoyangIlsan";
  padding-inline: 2%;
}
.region {
  text-align: right;
}
.outline {
}
</style>
