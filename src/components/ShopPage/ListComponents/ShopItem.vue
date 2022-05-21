<template>
  <div class="container-fluid g-0" :style="background">
    <div class="row align-items-center">
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
        <div class="square">
          <img class="inner" :src="shop.url" alt="..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ShopItem`,
  props: {
    shop: Object,
    index: Number,
  },
  computed: {
    background() {
      if (this.index % 2 == 0) return `background:#fbebfd`;
      return ``;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

.container-fluid {
  color: $pl-0;
  border: solid $pl-5 1px;
  padding: 3%;
  font-size: 130%;
  @include desktop {
    font-size: 100%;
  }
  @include tablet {
    font-size: 80%;
  }
  @include tablet-s {
    font-size: 130%;
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
  color: $pl-0;
}
.info__container .keyword {
  margin-right: 3%;
  padding-inline: 3%;
  background: $pl-4;
  border: $pl-2 0.5px solid;
  font-size: 0.6em;
  font-weight: 500;
  font-style: italic;
  color: $pl-0 !important;
}

//샵 정보 끝
//이미지 시작
.square {
  width: 100%;
  position: relative;
  background: white;
  border-radius: 10%;
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10%;
  border: solid #e1e1e1 1px;
}
//이미지 끝
</style>
