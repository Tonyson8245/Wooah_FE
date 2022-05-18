<template>
  <div class="outline">
    <div class="container-lg p-lg-5 pt-lg-0">
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

  computed: {
    title() {
      var title;
      if (this.$route.path == "/monthlyart") title = "monthlyart";
      else {
        switch (this.$route.params.price) {
          case `10000`:
            title = `~ ` + (this.$route.params.price / 10000 + 1) + `만원 대`;
            break;
        }
      } //  가격에 따라 배너 타이틀 변경
      return title;
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
  background: $pl-6;
  min-height: 1000px;
  @include mobile-s {
    min-height: 500px;
  }
}
</style>
