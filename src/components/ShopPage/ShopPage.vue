<template>
  <div class="container_outer p-lg-2">
    <div class="container-md">
      <div class="row flex-row-reverse">
        <div v-if="MapView" class="col-md-8 col-sm-12 map__outer g-0">
          <NaverMap :width="width" />
        </div>

        <div class="col-md-4 col-sm-12 list__outer g-0">
          <div class="btn__set">
            <button class="btn col-12 p-0" v-if="MapView" @click="CloseMap">
              지도 숨기기
            </button>
            <button class="btn col-12 p-0" v-if="!MapView" @click="OpenMap">
              지도 보기
            </button>
          </div>
          <router-view v-slot="{ Component }">
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
    this.$store.commit("Setpagecondition", "shop");
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
  },
  watch: {
    width(state) {
      if (state > 768) this.$store.commit("ShopStore/SetMapView", true);
    },
  },
  computed: {
    MapView() {
      return this.$store.state.ShopStore.MapView;
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
  background: $pl-6;
  @include desktop {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }
  @include tablet {
    width: 100%;
  }
}
.container-md {
  margin-top: 1%;
  margin-bottom: 1%;
  height: $desktop-height;
  flex-wrap: wrap-reverse;
  border: $pl-4 1px solid;
  border-radius: 15px;
  overflow: hidden;
  @include tablet {
    height: auto;
    border-radius: 0px;
  }
  @include mobile-s {
    height: auto;
    border: none;
  }
}

.map__outer {
  height: $desktop-height;
  @include tablet-s {
    height: $tablet-height - 50;
  }
  @include mobile-s {
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
  font-family: "GoyangIlsan";
  font-size: 1em;
  @include mobile-s {
    font-size: 0.5em;
  }
}
</style>
