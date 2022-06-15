<template>
  <div
    class="container-fluid pe-1 ps-3 row align-items-center g-0"
    :style="background"
  >
    <div class="col-8 info__container">
      <div class="title">{{ shop.name }}</div>
      <div class="address">{{ shop.address }}</div>
      <div>
        <div
          class="badge rounded-pill text-dark keyword"
          v-for="a in shop.keywords"
          :key="a"
        >
          {{ a }}
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="square" style="float: none; margin: 0 auto">
        <img
          class="inner"
          :src="url"
          alt="..."
          v-if="!(shop.is_partner == false)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import img from "@/assets/img/400x400.png";
export default {
  name: `ShopItem`,
  props: {
    shop: Object,
    index: Number,
  },
  computed: {
    background() {
      if (this.index % 2 == 0) return `background:#E7DAFF`;
      return ``;
    },
    url() {
      if (this.shop.url == undefined) return img;
      else return this.shop.url;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

.container-fluid {
  color: $pa;
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
  color: $pa;
  font-family: "GoyangIlsan";
}
.info__container .title {
  font-weight: bold;
  font-size: 1.1em;
}
.info__container .address {
  font-size: 0.7em;
}
.info__container .keyword {
  font-size: 0.5em;
  margin-right: 3%;
  background: $pl-3;
  font-weight: 500;
  color: white;
  font-style: italic;
  white-space: nowrap;
}

//샵 정보 끝
//이미지 시작
.square {
  width: 90%;
  position: relative;
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
