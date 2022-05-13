<template>
  <div class="container-fluid g-0" :style="background">
    <div class="row align-items-center" v-if="comparison">
      <div class="col-3">
        <thumbnail :url="shop.url" />
      </div>
      <div class="col-9 info__container" style="text-align: left">
        <div class="title p-1">{{ shop.name }}</div>
        <div class="d-flex p-1">
          <div class="address pe-2">
            <i class="bi bi-geo-alt-fill"></i> {{ shop.address }}
          </div>
          <div class="address pe-2">
            <i class="bi bi-telephone-fill"></i> {{ shop.contact }}
          </div>
        </div>
        <div class="d-flex p-1">
          <div class="me-auto">
            <div class="d-flex">
              <span
                class="badge rounded-pill text-dark keyword"
                v-for="a in shop.keywords"
                :key="a"
                >{{ a }}</span
              >
            </div>
          </div>
          <div style="font-weight: bold">{{ shop.price }} 원</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!comparison">
    <div class="col-8 info__container">
      <div class="title">{{ shop.name }}</div>
      <div class="address">{{ shop.address }}</div>
      <div>
        <span
          class="badge rounded-pill text-dark keyword"
          v-for="a in shop.keywords"
          :key="a"
          >{{ a }}</span
        >
      </div>
    </div>
    <div class="col-4">
      <thumbnail :url="shop.url" />
    </div>
  </div>
</template>

<script>
import thumbnail from "@/components/Common/SquareComponent.vue";
export default {
  name: `ShopItem`,
  props: {
    shop: Object,
    index: Number,
    comparison: Boolean,
  },
  components: {
    thumbnail,
  },
  computed: {
    background() {
      if (this.index % 2 == 0) return `background:#f1f1f1`;
      return ``;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

.container-fluid {
  border: solid #e1e1e1 1px;
  padding: 3%;
  font-size: 130%;

  @include tablet-s {
    font-size: 100%;
  }
  @include mobile-s {
    font-size: 100%;
  }
}
//샵 정보 시작
.info__container {
  font-family: "GoyangIlsan";
}
.info__container .title {
  font-weight: bold;
  font-size: 1em;
}
.info__container .address {
  font-size: 0.7em;
  color: #0a0a0a;
}
.info__container .keyword {
  margin-right: 3%;
  padding-inline: 3%;
  background: #e4e4e4;
  border: #c4c4c4 0.5px solid;
  font-size: 0.6em;
  font-weight: 500;
  font-style: italic;
}
</style>
