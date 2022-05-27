<template>
  <div
    class="outline"
    style="overflow: hidden"
    @mouseleave="show = false"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <square
      @click="clickImage(art.id)"
      :url="art.url"
      style="width: 100%"
      @mouseover="show = true"
    />
    <div v-if="toggle" class="toggleOn">
      <transition name="slide-fade">
        <div
          class="detail"
          style="display: flex; align-items: center"
          v-if="show"
        >
          <div style="margin: auto; width: 90%">
            <div style="display: flex">
              <p class="title" @click="clickShop(shop.id)">
                {{ shop.name }}
              </p>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div class="info">
              <span
                ><i class="bi bi-telephone-fill"></i>{{ shop.contact }}</span
              >
              <br v-if="width < 1200" />
              <span><i class="bi bi-geo-alt-fill"></i>{{ shop.address }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-if="!toggle" class="toggleOff">
      <div class="detail">
        <div style="margin: auto; width: 90%">
          <div style="display: flex; align-items: center">
            <p class="title" @click="clickShop(shop.id)">
              {{ shop.name }}
            </p>
            <i class="bi bi-chevron-right"></i>
          </div>
          <div class="flex-grow-1">
            <div class="info">
              <span
                ><i class="bi bi-telephone-fill"></i>{{ shop.contact }}</span
              >
              <br />
              <span><i class="bi bi-geo-alt-fill"></i>{{ shop.address }}</span>
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "@/components/Common/SquareComponent.vue";
export default {
  name: `ThumbnailComponent`,
  data() {
    return {
      shop: this.art.shop,
      show: false,
    };
  },
  props: {
    art: Object,
    toggle: Boolean,
  },
  components: {
    Square,
  },
  methods: {
    clickImage(id) {
      this.$store.dispatch("MonthlyartStore/fetchPost", id);
    },
    clickShop(id) {
      this.$router.push("/shop/" + id);
    },
  },
  computed: {
    width() {
      return this.$store.state.CommonStore.width;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//transition
.slide-fade-enter-active {
  transition: all 0.8s;
}
.slide-fade-leave-active {
  transition: all 0.8;
}
.slide-fade-enter-from/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 1;
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
//
.outline {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  font-size: 1vw;
  @include tablet {
    font-size: 2vw;
  }
  @include mobile-s {
    border-radius: 10px;
  }
}
.square {
  position: relative;
  z-index: 0;
}
.toggleOff .detail {
  width: 100%;
  z-index: 1;
  background: $pl-4;
  opacity: 0.8;
  padding: 6% 0 6% 0;
}

.toggleOn .detail {
  position: absolute;
  bottom: 0%;
  width: 100%;
  z-index: 1;
  background: white;
  opacity: 0.8;
  height: 35%;
  @include mobile-s {
    height: 45%;
  }
}
.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  font-weight: bold;
  margin: 0 0 1% 0;
}

.info {
  font-size: 70%;
}
.info span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info i {
  margin-right: 1%;
}
</style>
