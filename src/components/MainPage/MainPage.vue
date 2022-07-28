<template>
  <div class="outline">
    <!-- 상단 배너 시작 -->
    <div
      id="carouselExampleControlsNoTouching"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner" @click="clickBanner">
        <div class="carousel-item banner_1 active">
          <img
            src="@/assets/img/banner_1.png"
            v-if="bannerStatus == `desktop`"
            alt="..."
          />
          <!-- 모바일용 -->
          <img v-else src="@/assets/img/mobile_banner_1.png" alt="..." />
          <!-- 이거 이미지 사이즈 1200 이여야지 "자동 넘어가기" 된다. -->
        </div>
        <div class="carousel-item banner_2">
          <img
            src="@/assets/img/banner_2.png"
            v-if="bannerStatus == `desktop`"
            alt="..."
          />
          <!-- 모바일용 -->
          <img v-else src="@/assets/img/mobile_banner_2.png" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 상단 배너 끝 -->
    <!-- 최신 아트 디자인 시작 -->
    <div class="newest">
      <div class="newest_header pb-lg-4" @click="this.$router.push('/library')">
        <div class="title_en">NEWEST DESIGN</div>
        <div class="title_ko">최신 업데이트 디자인</div>
      </div>
      <div class="newest_body">
        <div class="container-lg p-lg-0 px-4 py-1">
          <carousel
            :settings="settings"
            :breakpoints="breakpoints"
            v-if="designs.length !== 0"
          >
            <slide
              class="pe-click"
              v-for="(design, i) in designs"
              :key="i"
              @click="
                clickNewestDesign(design.id);
                this.$gtag.event(`Click_design_` + design.id);
              "
            >
              <div class="carousel__item">
                <Square :url="design.url" />
                <div class="outer">
                  <div class="title">{{ design.shop.name }}</div>
                  <div class="tags" v-if="design.tags != null">
                    <span v-for="tag in design.tags" :key="tag"
                      >#{{ tag + " " }}
                    </span>
                  </div>
                </div>
              </div>
            </slide>

            <template #addons>
              <Navigation />
            </template>
          </carousel>
        </div>
      </div>
    </div>

    <!-- 최신 아트 디자인 끝 -->
    <!-- 태그 랭크 시작 -->
    <div class="tag_rank__outer p-lg-5">
      <div class="container-lg p-lg-5">
        <div class="row tag_rank__inner">
          <div class="d-sm-none intro fw-bold">
            <span>#태그로 알아보는 #네일아트 디자인 #트렌드</span>
          </div>
          <div class="col-sm-6 col-12 rank">
            <div class="square rank_table">
              <div class="rank_table__inner inner">
                <div class="title fw-bold">태그 검색 순위</div>
                <table class="table table-sm table-borderless m-0">
                  <tr
                    class="pe-click"
                    v-for="tag in tagrank"
                    :key="tag"
                    @click="clicktag(tag.content)"
                  >
                    <td scope="row" class="col-2">
                      {{ tag.rank }}
                    </td>
                    <td class="col-8">{{ tag.content }}</td>
                    <td class="col-2 text-center">{{ tag.count }}건</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="d-none d-sm-block col-sm-6 intro fw-bold">
            <span
              >#태그로 알아보는 <br />
              #네일아트 디자인 #트렌드</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 태그 랭크 끝 -->
    <!-- 이달의 아트 시작 -->
    <div class="monthlyart__outer">
      <div class="container-lg">
        <div class="monthlyart__inner row">
          <div class="col-sm-6 col-12 title p-0">
            <div class="square_half">
              <div class="inner" @click="this.$router.push('/monthlyart')">
                <span class="monthly_title_span fw-bold"
                  >{{ Month }}월의 아트</span
                >
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12 link p-0">
            <div class="square">
              <div class="inner">
                <div class="row fw-bold m-0" v-if="this.monthlyart.length > 0">
                  <div
                    class="col-6 tile p-0 pe-click"
                    v-for="i in 3"
                    :key="i"
                    @click="clickMonthlyart(i - 1)"
                  >
                    <square
                      :url="monthlyart_url(i - 1)"
                      :style="background(monthlyart_url(i - 1))"
                    />
                    <div
                      class="text fw-bold"
                      v-if="monthlyart_url(i - 1) != ``"
                    >
                      {{ price_range(i - 1) }}
                    </div>
                  </div>

                  <div
                    class="col-6 tile p-0 pe-click"
                    @click="clickMonthlyart(`more`)"
                  >
                    <square
                      :url="monthlyart_url(3)"
                      style="background: #ceb5ff; border-radius: 0px"
                    />
                    <div class="text fw-bold">더보기...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 이달의 아트 끝 -->
    <div class="shops__outer">
      <div class="container-lg">
        <div class="shops__inner row">
          <div class="title col-sm-3">
            <Region :font="'color:white; '" />
            <div>네일샵</div>
            <button class="btn" @click="clickShop(`more`)">샵 더보기</button>
          </div>
          <div class="content col-sm-9 col-12 align-self-center px-4">
            <Carousel
              :settings="settings_shop"
              :breakpoints="breakpoints_shop"
              :snapAlign="ShopsnapAlign"
              v-if="shops.length !== 0"
            >
              <Slide v-for="(shop, i) in shops" :key="i" class="pe-click">
                <div
                  class="m-lg-3 m-1"
                  style="
                    background: white;
                    padding: 5%;
                    width: 100%;
                    border-radius: 15px;
                  "
                  @click="clickShop(shop.id)"
                >
                  <Square :url="shop.url" />
                  <div class="shopinfo">
                    <div>
                      <span class="fw-bold">{{ shop.name }}</span>
                    </div>
                    <div class="contact">
                      <i class="bi bi-telephone-fill"></i>
                      <span>{{ shop.contact }}</span>
                      <br />
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>{{ shop.address }}</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import Square from "@/components/Common/SquareComponent.vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import Region from "@/components/Common/RegionComponent.vue";
export default {
  name: "MainPage",
  data() {
    return {
      url: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20220124_272%2F1642992557576RPwQH_JPEG%2Fimage.jpg",

      settings: {
        itemsToShow: 2,
        snapAlign: "start",
        mouseDrag: false,
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        576: {
          itemsToShow: 4,
          snapAlign: "start",
          mouseDrag: false,
        },
      },

      settings_shop: {
        itemsToShow: 2,
        snapAlign: "start",
        mouseDrag: false,
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints_shop: {
        // 700px and up
        576: {
          itemsToShow: 3,
          mouseDrag: false,
        },
      },

      timer: null,
    };
  },
  mounted() {
    this.$store.commit("Setpagecondition", "");
    this.$store.dispatch("MainStore/fetchDesigns");
    this.$store.dispatch("MainStore/fetchTagrank", 5);
    this.$store.dispatch("MainStore/fetchThumbnails");
    this.$store.dispatch("MainStore/getShops", {
      sido: this.sido,
      sigungu: this.sigungu,
    });
  },

  computed: {
    ShopAutoplay() {
      if (this.shops.length == 2) return 10000000000000;
      else return 3000;
    },
    ShopsnapAlign() {
      if (this.shops.length == 2) return `center`;
      else return `center`;
    },
    width() {
      return this.$store.state.CommonStore.width;
    },
    bannerStatus() {
      if (this.width > 767) {
        return "desktop";
      } else {
        return `mobile`;
      }
    },
    Month() {
      const today = new Date();
      return today.getMonth() + 1;
    },
    designs() {
      return this.$store.state.MainStore.designs;
    },
    tagrank() {
      return this.$store.state.MainStore.tagrank;
    },
    monthlyart() {
      return this.$store.state.MainStore.monthlyart;
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    shops() {
      return this.$store.state.MainStore.shops;
    },
    updateDistrict() {
      return this.$store.state.CommonStore.updateDistrict;
    },
  },
  watch: {
    updateDistrict(a) {
      if (a) {
        this.$store.dispatch("MainStore/getShops", {
          sido: this.sido,
          sigungu: this.sigungu,
        }); // 위치가 바뀌면 샵 내용을 바꾼다.
        this.$store.commit("CommonStore/setUpdateDistrict", false);
      }
    },
  },
  components: {
    Carousel,
    Slide,
    Square,
    Navigation,
    Region,
  },
  methods: {
    background(a) {
      if (a != undefined) return `background: #CEB5FF; border-radius: 0px`;
      else return ``;
    },
    clickNewestDesign(id) {
      this.$gtag.event(`Click_main_디자인모아보기`);
      this.$router.push("/library/p/" + id);
    },

    clickMonthlyart(i) {
      this.$gtag.event(`Click_main_이달의아트`);
      var range;
      if (this.monthlyart[i] != undefined)
        range = this.monthlyart[i].price_range;
      else range = "";

      if (i == `more`) {
        this.$router.push("/monthlyart");
      } else if (range != "") {
        this.$router.push("/monthlyart/" + range * 10000);
      }
    },
    monthlyart_url(i) {
      if (this.monthlyart[i] != undefined) {
        return this.monthlyart[i].arts[0].url;
      } else return "";
    },
    price_range(i) {
      if (this.monthlyart[i] != undefined)
        return this.monthlyart[i].price_range + `만원 대`;
      else return "";
    },
    clickShop(shopid) {
      this.$gtag.event(`Click_main_샵`);

      if (shopid == `more`) this.$router.push("/shop");
      else this.$router.push("/shop/" + shopid);
    },
    changeDistrict(data) {
      this.$store.dispatch("MainStore/getShops", {
        sido: data.sido,
        sigungu: data.sigungu,
      });
    },
    clickBanner(e) {
      if (e.target.lastChild.classList.value == "carousel-item banner_2") {
        // 배너 내부에서 click 이벤트가 발생하지 않아서 배너 내부의 마지막 자식의 classlist를 확인해서 구분

        this.$gtag.event(`Click_main_배너(1)`);
        this.$router.push(`/comparison`);
      } else if (
        e.target.lastChild.classList.value == "carousel-item banner_2 active"
      ) {
        this.$gtag.event(`Click_main_배너(2)`);
        this.clicktag("알록달록네일"); // 알록달록로 키워드를 변경하고, 디자인 보아보기로 이동
      }
    },
    clicktag(tag) {
      this.$store.commit("collectionStore/resetPage");
      this.$store.commit("collectionStore/changeTag", tag);
      this.$store.commit("collectionStore/ChangeSearchOff");
      this.$store.commit("collectionStore/InitSearchResult");
      this.$router.push(`/library`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.outline {
  font-family: "GoyangIlsan";
  background: $pb;
  @include tablet-s {
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 60%;
  }
}
// 배너 시작
.carousel-item img {
  height: 550px;

  @include banner {
    height: 100%;
    width: inherit;
  }
}
.carousel-inner:after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
} // 배너 페이드 아웃 필터
.banner_1 {
  background: #f4dff8;
} // 배너 1 배경
.banner_2 {
  background: #ace6fd;
} // 배너 2 배경
.carousel-control-next,
.carousel-control-prev /*, .carousel-indicators */ {
  filter: invert(100%);
}
// 배너 끝
//최신 업데이트 디자인 시작
.newest {
  padding: 5% 0 5% 0;
}
.newest_header {
  font-family: "GoyangDeogyang";
  text-align: center;
  color: $pa;
}
.newest_header .title_en {
  font-size: 1vw;
  @include sm {
    font-size: 3vw;
  }
}
.newest_header .title_ko {
  font-size: 2vw;
  @include sm {
    font-size: 5vw;
  }
}
.newest_body {
  font-size: 1em;
}
.newest_body .title {
  font-weight: bold;
  font-size: 120%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.newest_body .tags {
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.carousel__item .outer {
  margin-top: 7%;
}

.carousel__item {
  background-color: $pl-4;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 90%;
  padding: 5%;
}

//최신 업데이트 디자인 끝
//태그 랭크 시작
.tag_rank__outer {
  background: url("@/assets/img/tag_rank_background.svg");
  background-size: cover;
}
.tag_rank__inner {
  display: flex;
}
.tag_rank__inner .rank {
  padding-inline: 7%;
  color: $pa;
  @include banner {
    padding: 5%;
  }
  @include sm {
    padding: 10%;
    padding-top: 0;
  }
}

.rank_table {
  background: white;
  border-radius: 10%;
  border: 1px solid #c4c4c4;
}
.rank_table__inner {
  padding: 10%;
  display: flex;
  flex-direction: column;
}
.rank_table__inner .title {
  color: $pa;
  font-size: 2vw;
  @include sm {
    font-size: 6vw;
  }
}
.rank_table__inner table {
  color: $pl-1;
  flex: 1;
  font-size: 1.5vw;
  height: 80%;
  @include sm {
    font-size: 4.5vw;
    padding-top: 0;
  }
}

.tag_rank__inner .intro {
  margin: auto;
  font-style: italic;
  background: linear-gradient(to right, $pl-3, $pl-2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 2.5vw;
  @include sm {
    text-align: center;
    font-size: 4.5vw;
    padding: 3% 0 2% 0;
  }
}
//태그 랭크 끝
// 이달의 아트 시작

.monthlyart__inner .title {
  background: url("@/assets/img/Mainpage_monthlyart_summary.png");
  background-size: cover;
  @include sm {
    background: url("@/assets/img/Mainpage_monthlyart_summary_sm.png");
    background-size: cover;
  }
} // 이달의 아트 타이틀 이미지
.monthlyart__inner .title span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
}
.monthly_title_span {
  font-family: "Nanum Myeongjo";
  text-align: center;
  font-size: 3.5vw;
  @include sm {
    font-size: 6vw;
  }
  color: #0d5757;
}
.link .row {
  height: 100%;
  width: 100%;
  display: flex;
}
.row .tile {
  font-family: "GoyangDeogyang";
  position: relative;
  color: white;
  font-size: 1.5vw;
  background: white;
  border: solid 0.5px $pb;
  @include sm {
    font-size: 5vw;
  }
}
.tile .text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.tile .square {
  filter: saturate(50%) opacity(70%);
}

// 이달의 아트 끝
// 샵 시작
.shops__inner {
  background: $pl-4;
}
.shops__inner .title {
  background: $pl-3;
  padding: 12% 0 12% 0;
  text-align: center;
  color: white;
  font-size: 1.3em;
  @include sm {
    font-size: 1em;
    padding: 3% 0 3% 0;
  }
}

.shops__inner .btn {
  background: $pl-4;
  color: $pa;
  font-weight: bold;
  margin-top: 30%;
  width: 80%;
  @include sm {
    font-size: 1em;

    width: fit-content;
    margin-top: 2%;
  }
}
.content {
  @include sm {
    padding: 3% 0 3% 0;
  }
}
.content .contact {
  font-size: 0.8em;
}
.content .shopinfo {
  margin-top: 5%;
  text-align: left;
}

//공통
.square {
  width: 100%;
  position: relative;
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
}

.square_half {
  width: 100%;
  position: relative;
  border-radius: 5px;
}

.square_half:after {
  content: "";
  display: block;
  padding-bottom: 100%;
  @include sm {
    padding-bottom: 50%;
  }
}
// 절반 사각형
</style>
<style>
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
.swal2-container {
  visibility: hidden;
}
</style>
