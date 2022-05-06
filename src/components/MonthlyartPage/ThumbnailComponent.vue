<template>
  <div class="outline" style="overflow: hidden" @mouseleave="show = false">
    <square
      @click="clickImage(art.id)"
      :url="art.url"
      style="width: 100%"
      @mouseover="show = true"
    />
    <transition name="slide-fade">
      <div class="detail" style="display: flex" v-if="show">
        <div style="margin: auto; width: 90%">
          <p class="title" @click="clickShop(shop.id)">
            {{ shop.name }} <i class="bi bi-chevron-right"></i>
          </p>
          <div class="info">
            <span><i class="bi bi-telephone-fill"></i>{{ shop.contact }}</span>
            <br v-if="width < 1200" />
            <span><i class="bi bi-geo-alt-fill"></i>{{ shop.address }}</span>
          </div>
        </div>
      </div>
    </transition>
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
  },
  components: {
    Square,
  },
  methods: {
    clickImage(id) {
      this.$router.push("/library/p/" + id);
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
  transition: all 0.8s;
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
  @include mobile-s {
    font-size: 70%;
  }
}
.square {
  position: relative;
  z-index: 0;
}
.detail {
  position: absolute;
  bottom: 0%;
  width: 100%;
  z-index: 1;
  background: #e4e4e4;
  opacity: 0.8;
  height: 35%;
  @include mobile-s {
    height: 45%;
  }
}
.title {
  font-size: 1.1em;
  font-weight: bold;
  margin: 0 0 1% 0;
}

.info {
  font-size: 0.8em;
}
.info span {
  margin-right: 3%;
}
.info i {
  margin-right: 1%;
}
</style>
