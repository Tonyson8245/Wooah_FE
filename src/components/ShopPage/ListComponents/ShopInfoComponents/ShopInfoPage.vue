<template>
  <div style="background: white">
    <div class="info_outline">
      <div class="banner card-header" style="padding: 2.5%">
        샵 정보
        <i class="bi bi-x-lg" @click="CloseInfo"></i>
      </div>
      <div class="info__content">
        <carousel v-if="ShopData.images.length > 0" :items-to-show="1">
          <slide class="square" v-for="slide in ShopData.images" :key="slide">
            <img class="inner" :src="slide" alt="" />
          </slide>
          <template #addons>
            <navigation class="mx-4" />
            <pagination />
          </template>
        </carousel>
        <div class="title p-1">{{ ShopData.name }}</div>
        <div class="container-fluid g-0 row tab mt-3">
          <div
            class="col-4 btn btn-light"
            :style="TabStatus[0]"
            @click="ClickTab(0)"
          >
            정보
          </div>
          <div
            class="col-4 btn btn-light"
            :style="TabStatus[1]"
            @click="ClickTab(1)"
          >
            가격정보
          </div>
          <div
            class="col-4 btn btn-light"
            :style="TabStatus[2]"
            @click="ClickTab(2)"
          >
            사진
          </div>
        </div>
        <div class="p-2" style="background: #fcfcfc">
          <router-view :ShopData="ShopData"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: `ShopInfoPage`,
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {},
  data() {
    return {
      TabStatus: [
        `border-width:1px 1px 0 1px;
  background: #fcfcfc;`,
        ``,
        ``,
      ],
    };
  },
  mounted() {
    this.FetchShopInfo();
  },
  computed: {
    ShopData() {
      return this.$store.state.ShopStore.shopinfo;
    },
  },
  methods: {
    FetchShopInfo() {
      var id = this.$route.params.id;
      this.$store.dispatch("ShopStore/getShopDetail", id);
    },
    CloseInfo() {
      this.$router.push("/shop");
    },
    ClickTab(num) {
      this.TabStatus = [``, ``, ``];
      this.TabStatus[num] = `border-width:1px 1px 0 1px; background: #fcfcfc; `;

      switch (num) {
        case 0:
          this.$router.push("/shop/" + this.$route.params.id + "/info");
          break;
        case 1:
          this.$router.push("/shop/" + this.$route.params.id + "/price");
          break;
        case 2:
          this.$router.push("/shop/" + this.$route.params.id + "/image");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//탭
.tab .btn {
  background: #f3f3f3;
  border: #e1e1e1 solid 1px;
}

///
.info_outline {
  border: solid 0.5px #e1e1e1;
  font-size: 16px;
  font-family: "GoyangIlsan";
  position: relative;
}
.info__content {
  overflow-y: scroll;
  height: 793px;
  @include mobile-s {
    overflow: none;
  }
}
//샵 이름 시작
.title {
  font-size: 1.8em;
  font-weight: bold;
  margin-left: 3%;
  @include mobile-s {
    font-size: 100%;
  }
}
//샵 이름 끝
//샵이미지
.carousel {
  width: 100%;
}

.square {
  width: 100%;
  position: relative;
  background: white;
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 60%;
}
.inner {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: solid #e1e1e1 1px;
}

//샵이미지 끝
//배너 시작
.banner {
  text-align: center;
  font-size: 1.3em;
  background: #c4c4c4;
  font-weight: bold;
  @include mobile-s {
    font-size: 70%;
  }
}
.bi-x-lg {
  position: absolute;
  right: 5%;
}

///
</style>
<style>
/* 외부 건드는것 */
ol {
  padding: unset !important;
  margin: unset !important;
}
.carousel___pagination {
  padding: initial;
}
.carousel__pagination-button {
  background-color: #c4c4c4 !important;
  bottom: 100%;
}
.carousel__pagination-button--active {
  background-color: #949494 !important;
}
.carousel__prev,
.carousel__next {
  background-color: #c4c4c4 !important;
}
</style>
