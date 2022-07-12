<template>
  <div class="container_outer p-lg-2">
    <div class="container-lg">
      <div class="row flex-row-reverse">
        <div
          v-show="MapView"
          class="col-lg-8 col-md-7 col-sm-12 map__outer g-0"
        >
          <NaverMap :width="width" />
        </div>

        <div
          class="col-lg-4 col-md-5 col-sm-12 g-0 list"
          style="display: flex; flex-direction: column; height: 100%"
        >
          <div class="btn__set">
            <button class="btn col-12 p-0" v-if="MapView" @click="CloseMap">
              지도 숨기기
            </button>
            <button
              class="btn col-12 p-0"
              v-if="!MapView"
              @click="
                OpenMap();
                this.$gtag.event(`Click_open_Map`);
              "
            >
              지도 보기
            </button>
          </div>
          <router-view v-slot="{ Component }" style="flex: 1">
            <transition name="scale" mode="out-in">
              <component :MapView="MapView" :width="width" :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NaverMap from "./MapComponents/NaverMap.vue";
export default {
  name: "ShopPage",
  data() {
    return {
      width: 0,
      height: 0,
      ShopId: undefined,
    };
  },
  components: {
    NaverMap,
  },
  mounted() {
    this.$store.dispatch("CommonStore/getDistricts");
    this.$store.commit("Setpagecondition", "shop");
    this.reset();
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // 화면 넓이를 측정 중 ...//
    this.ShopId = this.$route.params.id; // 현재 샵 상세를 찾는지 확인

    if (this.ShopId == undefined && this.width < 768) {
      // 현재 화면 넓이가 태블릿보다 좁으면 지도 끔
      this.CloseMap();
    } else this.OpenMap();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    CloseMap() {
      this.$store.commit("ShopStore/SetMapView", false);
    },
    OpenMap() {
      this.$store.commit("ShopStore/SetMapView", true);
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    reset() {
      this.$store.commit("ShopStore/Reset"); // 초기화
    },
  },
  watch: {
    width(state) {
      if (state > 767) this.$store.commit("ShopStore/SetMapView", true);
      else this.$store.commit("ShopStore/SetMapView", false);
    },
  },
  computed: {
    MapView() {
      return this.$store.state.ShopStore.MapView;
    },
    path() {
      return this.$route.path;
    },
    keyword() {
      return this.$store.state.ShopStore.keyword;
    },
    shop() {
      return this.$store.state.ShopStore.shop;
    },
    shops() {
      return this.$store.state.ShopStore.shops;
    },
    shopinfo() {
      return this.$store.state.ShopStore.shopinfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$desktop-height: 850px;
$tablet-height: 350px;
$mobile-height: 250px;
.scale-enter-active,
.scale-leave-active {
  transition: all 0.08s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0.5;
  transform: scale(1);
}

//transtition 끝
.container_outer {
  background: white;
  height: 100%;
  display: grid;
  align-items: center;
  @include desktop {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }
  @include tablet {
    width: 100%;
    align-items: baseline;
  }
}
.container-lg {
  display: inline;
  height: $desktop-height;
  flex-wrap: wrap-reverse;
  border: $pl-4 1px solid;
  border-radius: 15px;
  overflow: hidden;
  @include tablet {
    height: 100%;
    border-radius: 0px;
  }
  @include mobile-s {
    height: 100%;
    border: none;
  }
}
.container-lg .row {
  @include tablet {
    height: 100%;
  }
}

.map__outer {
  height: $desktop-height;
  @include tablet {
    height: 100%;
  }
  @include tablet-s {
    height: $mobile-height - 50;
    /* height: 0px; */
  }
}

.btn__set {
  display: none;
  @include tablet-s {
    display: unset;
  }
}
.btn__set button {
  color: $pa;
  font-family: "GoyangIlsan";
  font-size: 1em;
  @include mobile-s {
    font-size: 0.5em;
  }
}

/* TRANSITION */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
