<template>
  <div style="background: white">
    <div class="info_outline" v-if="ShopData != null">
      <div class="banner card-header" style="padding: 2.5%">
        샵 정보
        <i class="bi bi-x-lg" @click="CloseInfo"></i>
      </div>
      <div class="info__content">
        <carousel
          v-if="ShopData.images.length > 0"
          :items-to-show="1"
          class="user-select-none"
        >
          <slide class="square" v-for="slide in ShopData.images" :key="slide">
            <img
              class="inner"
              :src="slide"
              alt=""
              style="object-fit: contain"
              @click="onClick($event.target, slide)"
              @load="onImgLoad"
              @error="onError"
            />
          </slide>
          <template #addons>
            <navigation class="mx-4" />
            <!-- <pagination /> -->
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
import img from "@/assets/img/failed_shop.png";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  name: `ShopInfoPage`,
  components: {
    Carousel,
    Slide,
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
      error: false,
      updated: false,
    };
  },
  mounted() {
    this.FetchShopInfo();
    var a = this.$route.path.split("/");
    if (a[1] == `shop` && a[2] != undefined) {
      // 샵페이지면서 샵아이디가 있을 경우에만 탭 이동
      switch (a[3]) {
        case "price":
          this.ClickTab(1);
          break;
        case "image":
          this.ClickTab(2);
          break;
        default:
          this.ClickTab(0);
          break;
      }
    }
  },
  computed: {
    ShopData() {
      return this.$store.state.ShopStore.shopinfo;
    },
    path() {
      return this.$route.path.split("/");
    },
  },

  methods: {
    onImgLoad() {
      this.isLoaded = "visible";

      if (!this.error) {
        this.error = false;
        this.updated = false;
      }
    },
    onError(e) {
      this.error = true;
      e.target.src = img; //어차피 오류나면 클릭해서 모달이 뜨지 않을테니, 그냥 새로고침하게 하자
      e.target.setAttribute(`data-bs-toggle`, "");
    },
    onClick(e, slide) {
      if (this.error) {
        e.src = slide + `?` + this.index + new Date().getTime();
        this.error = false;
      }
    },
    FetchShopInfo() {
      var id = this.$route.params.id;
      this.$store.dispatch("ShopStore/getShopDetail", id);
    },
    CloseInfo() {
      this.$router.push("/shop");
      this.$store.commit("ShopStore/SetShop", null);
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
  beforeUnmount() {
    this.$store.commit("ShopStore/SetShop", null);
    this.$store.commit("ShopStore/FetchShopinfo", null);
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//탭
.tab .btn {
  color: black;
  border: $pl-4 solid 1px;
  font-size: 1em;
}

///
.info_outline {
  font-size: 16px;
  font-family: "GoyangIlsan";
  position: relative;
}
.info__content {
  background: #fcfcfc;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 800px;
  @include tablet-s {
    height: auto;
    overflow: hidden;
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
  background: $pl-4;
  color: $pa;
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

.carousel__prev,
.carousel__next {
  background-color: #cf88db !important;
  color: white;
}
.carousel__prev {
  /* left: 4%; */
}
.carousel__next {
  /* right: 4%; */
}
</style>
