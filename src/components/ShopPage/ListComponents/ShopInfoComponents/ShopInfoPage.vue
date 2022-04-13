<template>
  <div class="outline">
    <div class="banner card-header m-1">
      샵 정보
      <i class="bi bi-x-lg"></i>
    </div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="ShopData.images[0]" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="ShopData.images[1]" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img :src="ShopData.images[2]" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div>샵 이름</div>
    <div>탭 3개</div>
    <div>
      <InfoTab />
      <PriceTab />
      <ImgTab />
    </div>
  </div>
</template>

<script>
import ImgTab from "./Tabs/ShopImgTab.vue";
import InfoTab from "./Tabs/ShopInfoTab.vue";
import PriceTab from "./Tabs/ShopPriceTab.vue";

export default {
  name: `ShopInfoPage`,
  components: {
    ImgTab,
    InfoTab,
    PriceTab,
  },
  computed: {
    ShopData() {
      return this.$store.state.ShopStore.shopinfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
.outline {
  border: solid 0.5px #e1e1e1;
  height: 100%;
  font-size: 16px;
  font-family: "GoyangIlsan";
  position: relative;
}
//배너 시작
.banner {
  text-align: center;
  font-size: 1.2em;
  background: white;
  font-weight: bold;
  @include mobile-s {
    font-size: 70%;
  }
}
.bi-x-lg {
  position: absolute;
  right: 5%;
}
</style>
