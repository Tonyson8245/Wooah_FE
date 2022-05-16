<template>
  <div class="p-0 outline">
    <!-- 상단 배너 시작 -->
    <div
      id="carouselExampleControlsNoTouching"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
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
      <div class="newest_header fw-bold pb-lg-4">
        <div class="title_en">NEWEST DESIGN</div>
        <div class="title_ko">최신 업데이트 디자인</div>
      </div>
      <div class="newest_body ps-lg-5 pe-lg-5">
        <div class="container-fluid ps-lg-5 pe-lg-5">
          <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="i in 8" :key="i">
              <div class="carousel__item" style="width: 90%; padding: 5%">
                <Square :url="url" />
                <div>
                  <div class="title fw-bold p-2">네일123211 조아{{ i }}</div>
                  <div class="tags">#1월_네일 #기분전환 #손님 ...더보기</div>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation v-if="bannerStatus == 'desktop'" />
            </template>
          </Carousel>
        </div>
      </div>
    </div>

    <!-- 최신 아트 디자인 끝 -->
    <!-- 태그 랭크 시작 -->
    <div class="tag_rank__outer p-lg-5">
      <div class="container-lg p-lg-5">
        <div class="row tag_rank__inner">
          <div class="d-sm-none intro fw-bold">
            <span>#태그로 알아보는 #네일 아트 디자인 #트렌드</span>
          </div>
          <div class="col-sm-6 col-12 rank">
            <div class="rank_table square">
              <div class="rank_table__inner inner">
                <div class="title fw-bold">태그 검색 순위</div>
                <table class="table table-sm table-borderless">
                  <tr v-for="i in 5" :key="i" style="color: #b900fa">
                    <th scope="row" class="col-2">{{ i }}</th>
                    <td class="col-7">{{ i }}위 태그 제목</td>
                    <td class="col-3">{{ 50 - i }}건</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="d-none d-sm-block col-sm-6 intro fw-bold">
            <span
              >#태그로 알아보는 <br />
              #네일 아트 디자인 #트렌드</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 태그 랭크 끝 -->
    <!-- 이달의 아트 시작 -->
    <div class="monthlyart__outer">
      <div class="container-fluid">
        <div class="monthlyart__inner row">
          <div class="col-sm-6 col-12 title">
            <div class="square_half">
              <div class="inner">
                <span class="monthly_title_span fw-bold"
                  >{{ Month }}월의 아트</span
                >
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12 link">
            <div class="square">
              <div class="inner">
                <div class="row fw-bold">
                  <div class="col-6 tile"><span>~ 2만원 대</span></div>
                  <div class="col-6 tile"><span>~ 3만원 대</span></div>
                  <div class="col-6 tile"><span>~ 4만원 대</span></div>
                  <div class="col-6 tile"><span>더보기...</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 이달의 아트 끝 -->
    <div class="shops__outer">
      <div class="container-fluid">
        <div class="shops__inner row">
          <div class="title col-sm-3 fw-bold">
            <Region :font="'color:white; '" class="fw-bold" />
            <div>네일샵</div>
            <div class="btn">샵 더보기</div>
          </div>
          <div class="content col-sm-9 col-12 align-self-center">
            <Carousel :itemsToShow="3" :autoplay="5000" :wrapAround="true">
              <Slide v-for="i in 8" :key="i">
                <div
                  class="m-lg-3 m-1"
                  style="
                    background: white;
                    padding: 5%;
                    width: 100%;
                    border-radius: 5%;
                  "
                >
                  <Square :url="url" />
                  <div class="shopinfo p-2">
                    <span class="fw-bold">쵸코네일{{ i }}</span
                    >>
                    <div class="contact">
                      <i class="bi bi-telephone-fill"></i>
                      <span>010-8245-8698</span>
                      <br />
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>서울 동작구 사당1동</span>
                    </div>
                  </div>
                </div>
              </Slide>

              <!-- <template #addons>
                <Navigation v-if="bannerStatus == 'desktop'" />
              </template> -->
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
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        552: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.$store.commit("Setpagecondition", "");
  },
  computed: {
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
  },
  watch: {},
  components: {
    Carousel,
    Slide,
    Square,
    Navigation,
    Region,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.outline {
  font-family: "GoyangIlsan";
  @include tablet-s {
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 60%;
  }
}
// 배너 시작
.carousel-item img {
  width: 90%;
  @include banner {
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
  background: linear-gradient(
    to right,
    white 0%,
    rgba(255, 0, 0, 0) 10%,
    rgba(255, 0, 0, 0) 90%,
    white 100%
  ); /* W3C */
} // 배너 페이드 아웃 필터
.banner_1 {
  background: #ffd8fa;
} // 배너 1 배경
.banner_2 {
  background: #e0bfe6;
} // 배너 2 배경
.carousel-control-next,
.carousel-control-prev /*, .carousel-indicators */ {
  filter: invert(100%);
}
// 배너 끝
//최신 업데이트 디자인 시작
.newest {
  padding: 5% 0 5% 0;
  background: #faeefc;
}
.newest_header {
  font-family: "GoyangDeogyang";
  text-align: center;
  color: #6500a8;
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

.newest_body .title {
  font-size: 1.3vw;
}
.newest_body .tags {
  font-size: 0.8vw;
}
.carousel__item {
  border: solid 1px #e0bfe6;
  background-color: #ffffff;
  color: #6500a8;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  height: 100%;
}

//최신 업데이트 디자인 끝
//태그 랭크 시작
.tag_rank__outer {
  font-family: "GoyangDeogyang";
  background: url("@/assets/img/tag_rank_background.svg");
}
.tag_rank__inner {
  display: flex;
}
.tag_rank__inner .rank {
  padding-inline: 7%;
  color: #6500a8;
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
  border-radius: 5px;
  border: 1px solid #c4c4c4;
}
.rank_table__inner {
  padding: 10%;
}
.rank_table__inner .title {
  font-size: 2vw;
  @include sm {
    font-size: 6vw;
  }
}
.rank_table__inner table {
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
  background: linear-gradient(to right, #ff76f1, #c300ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 2.8vw;
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
  display: flex;
}
.row .tile {
  font-family: "GoyangDeogyang";
  text-align: center;
  margin: auto;
  color: #c300ff;
  font-size: 1.5vw;
  @include sm {
    font-size: 5vw;
  }
}

// 이달의 아트 끝
// 샵 시작
.shops__inner {
  background: #fcebff;
}
.shops__inner .title {
  background: #e386ff;
  padding: 12% 0 12% 0;
  text-align: center;
  font-family: "GoyangDeogyang";
  color: white;
  font-size: 1.3em;
  @include sm {
    font-size: 1em;
    padding: 3% 0 3% 0;
  }
}

.shops__inner .btn {
  background: #fb00ff;
  color: white;
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
  font-size: 0.8vw;
}
.content .shopinfo {
  text-align: left;
}

//공통
.square {
  width: 100%;
  position: relative;
  border-radius: 5px;
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
</style>
