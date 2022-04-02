<template>
  <div>
    <div>
      <div
        class="row d-flex justify-content-center align-items-center"
        style="padding: 0 3% 0 3%"
      >
        <!-- 전체 컨테이너 -->
        <div class="col-md-10">
          <!-- 검색창 시작 -->
          <div class="search">
            <input
              type="text"
              class="form-control"
              placeholder="찾고 싶은 이미지 태그를 검색해 보세요"
            />
            <button class="btn rounded-pill button" :style="ButtonFocusSetting">
              검색
            </button>
            <i class="bi bi-search"></i>
          </div>
          <!-- 검색 창 끝/태그 시작 -->
          <div class="tag--container btn-group" @click="ClickFilter">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle btn-sm"
                type="button"
                :style="ButtonFocusSetting"
                @click="FilterShowing('디자인 컬러')"
              >
                <span class="btn__name">디자인 컬러</span>
              </button>
            </div>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle btn-sm"
                :style="ButtonFocusSetting"
                type="button"
                @click="FilterShowing('디자인 쉐입')"
              >
                <span class="btn__name">디자인 쉐입</span>
              </button>
            </div>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle btn-sm"
                :style="ButtonFocusSetting"
                type="button"
                @click="FilterShowing('옵션')"
              >
                <span class="btn__name">옵션</span>
              </button>
            </div>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle btn-sm"
                :style="ButtonFocusSetting"
                type="button"
                @click="FilterShowing('손발')"
              >
                <span class="btn__name">손발</span>
              </button>
            </div>
          </div>

          <div class="filter__btn" :class="FilterShowed">
            <h6 class="filter_title">{{ FilterCondition }}</h6>
            <div :class="FilterSelected[0]" class="row filter__outer">
              <ColorPaltte
                class="col-3"
                v-for="color in colors"
                :key="color"
                :color="color"
                :tempFilterfull="tempFilterfull"
                @CheckColor="InsertTempFilter($event)"
              />
            </div>
            <div :class="FilterSelected[1]" class="row filter__outer">
              <ShapePalette
                class="col-3"
                v-for="shape in shapes"
                :key="shape"
                :shape="shape"
              />
            </div>
            <div :class="FilterSelected[2]" class="row filter__outer">
              <OptionPalette
                class="col-3"
                v-for="shape in shapes"
                :key="shape"
                :shape="shape"
              />
            </div>
            <div
              :class="FilterSelected[3]"
              class="row filter__outer"
              style="padding: 20% 0 10% 0"
            >
              <OptionPalette
                class="col-6"
                v-for="shape in handfoot"
                :key="shape"
                :shape="shape"
              />
            </div>
            <button
              class="btn btn-secondary btn-sm filter__outer_button"
              @click="InsertFilter"
            >
              확인
            </button>
          </div>
          <!-- 태그끝 -->
          <!-- 하단 사진들 시작 -->
          <div
            class="row row-cols-3 row-cols-sm-3 row-cols-lg-3 g-0 images__container"
          >
            <PostImage
              v-for="(post, i) in posts"
              :key="post"
              :post="post"
              :index="i"
              @ClickPost="
                this.post = $event;
                this.shop = this.post.shop;
                this.Clicked_post_index = i;
              "
            />
          </div>
        </div>
        <!-- 전체 컨테이너 -->
      </div>
    </div>
    <!-- 모달 (디자인 상세보기)시작 -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content modal-body" style="padding: 0 0 0 0">
          <div
            class="container-fluid"
            style="
              display: flex;
              width: 100%;
              justify-content: space-evenly;
              align-items: stretch;
            "
          >
            <div style="width: 5%">
              <i
                :class="ButtonCondition[0]"
                class="bi bi-arrow-left-circle-fill modal__btn_left"
              ></i>
            </div>
            <div class="row" style="width: 80%">
              <div class="col-lg-8" style="padding: 0 0 0 0">
                <img
                  :src="`https://placeimg.com/400/400/animals?`"
                  class="shadow-sm box"
                  alt="..."
                  style="display: inline-block"
                />
              </div>
              <div class="col-lg-4 ms-auto modal__content_outer">
                <div class="modal__content_footer">
                  <span class="modal__content_monthly_price">{{
                    post.price
                  }}</span>
                  <div>
                    <span class="modal__content_name">
                      <span>{{ shop.name }}</span>
                      <i class="bi bi-arrow-right-circle"></i>
                    </span>
                  </div>
                  <span class="modal__content_info">
                    <span
                      ><i class="bi bi-telephone"></i>{{ shop.contact }}
                    </span>
                    <span><i class="bi bi-geo-alt"></i>{{ shop.address }} </span
                    ><br />
                    <span><i class="bi bi-coin"></i>{{ post.price }} 원 </span
                    ><br />
                  </span>

                  <span class="modal__content_tags">태그들</span>
                </div>
              </div>
            </div>

            <div style="width: 5%">
              <div class="modal__btn_close">
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <i
                :class="ButtonCondition[1]"
                class="bi bi-arrow-right-circle-fill modal__btn_right"
                style="float: right"
                @click="ClickNextPost"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 (디자인 상세보기)끝 -->
</template>

<script>
import PostImage from "./PostImage.vue";
import posts from "../../assets/dummy/gallery";
import ColorPaltte from "./ColorPaleltte.vue";
import ShapePalette from "./ShapePalette.vue";
import OptionPalette from "./OptionPalette.vue";
import color from "../../assets/dummy/color.js";
import shape from "../../assets/dummy/shape.js";
import option from "../../assets/dummy/option.js";
import handfoot from "../../assets/dummy/handfoot.js";

export default {
  name: "CollectionPage",
  data() {
    return {
      //외부 데이터 시작
      posts: posts,
      colors: color,
      shapes: shape,
      options: option,
      handfoot: handfoot,
      //외부 데이터 끝
      // 내부 상태 데이터
      post: "", //포스트
      shop: "", // 샵 정보(상세보기에 사용됨)
      Clicked_post_index: "", // 현재 클릭된 post index
      ButtonCondition: ["", ""], //0번이 뒤로, 1번이 앞으로 // 처음이랑 마지막 버튼 안보여주기 위한 클래스 보관 장소

      //필터 시작
      FilterCondition: "", // 클릭된 필터버튼
      FilterSelected: ["d-none", "d-none", "d-none", "d-none"], // 현재 활성화된 필터
      FilterShowed: "invisible",
      ButtonFocusSetting: `outline: none !important;  box-shadow: none;`, //css로 세팅이 안되서 일로옴,
      tempFilter: [], // 임시 필터 컬러/쉐입/옵션 3개 이상 확인하는 부분
      tempFilterfull: true, // 임시 필터가 가득 찾는지 여부 / /false면 가득찬것
      SetFilter: {
        color: ["", "", ""],
        shape: ["", "", ""],
        option: ["", "", ""],
        type: "",
      }, //현재 설정된 필터
      //필터 끝
    };
  },
  methods: {
    ClickNextPost() {
      this.Clicked_post_index += 1;
      this.post = this.posts[this.Clicked_post_index];
      this.shop = this.post.shop;
    }, // 다음 포스트로 넘기는 함수
    ClickPrevPost() {
      this.Clicked_post_index -= 1;
      this.post = this.posts[this.Clicked_post_index];
      this.shop = this.post.shop;
    }, // 이전 포스트로 보내주는 함수
    FilterShowing(data) {
      if (this.FilterShowed == "invisible") {
        this.FilterCondition = data;
        this.FilterShowed = "visible";
      } else if (this.FilterShowed == "visible") {
        if (this.FilterCondition == data) {
          this.FilterCondition = "";
          this.FilterShowed = "invisible";
          this.FilterSelected = ["d-none", "d-none", "d-none", "d-none"];
        } else this.FilterCondition = data;
      }

      this.FilterContentShowing(data);
    }, // 필터 껐다 켜졌다 할때 내용 바꿔주고 위에 visible 설정해주는 함수
    FilterContentShowing(state) {
      switch (state) {
        case "디자인 컬러":
          this.FilterSelected = ["visible", "d-none", "d-none", "d-none"];
          break;
        case "디자인 쉐입":
          this.FilterSelected = ["d-none", "visible", "d-none", "d-none"];
          break;
        case "옵션":
          this.FilterSelected = ["d-none", "d-none", "visible", "d-none"];
          break;
        case "손발":
          this.FilterSelected = ["d-none", "d-none", "d-none", "visible"];
          break;
      }
    }, // 현재 클릭된 필터 페이지 // filter 창 내부화면 변경해줌
    InsertTempFilter(data) {
      let index = this.tempFilter.indexOf(data);
      if (!this.tempFilterfull) console.log("가득챴다");

      if (index != "-1") {
        this.tempFilter.splice(index, 1);
        this.tempFilterfull = true;
      } else if (this.tempFilterfull) {
        this.tempFilter.push(data);
        if (this.tempFilter.length >= 3) this.tempFilterfull = false;
      }
    }, //tempFilter 에 클릭된 내용 저장해둠
    InsertFilter() {
      this.SetFilter.FilterCondition = this.tempFilter;
      this.tempFilter = [];
      this.tempFilterfull = true;
      this.FilterShowed = "invisible";
      this.FilterSelected = ["d-none", "d-none", "d-none", "d-none"];
    }, // 필터안에 넣는것 확인 버튼
  },
  watch: {
    Clicked_post_index() {
      // 현재 페이지 위치에 따라 버튼 사라지게 하는 것
      this.ButtonCondition = ["visible", "visible"];
      if (this.Clicked_post_index == "0") this.ButtonCondition[0] = "invisible";
      if (this.Clicked_post_index + 1 >= this.posts.length)
        this.ButtonCondition[1] = "invisible";
    },
  },
  components: {
    PostImage,
    ColorPaltte,
    ShapePalette,
    OptionPalette,
  },
  mounted() {
    this.$emit("ChangePageCondition", "collection");
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$filter-height-desktop: 350px;
$filter-height-tablet: 320px;
$filter-height-mobile: 310px;

//이미지 컨테이너 시작
.images__container {
  position: relative;
  z-index: 1;
  top: -$filter-height-desktop;
  @include tablet {
    top: -$filter-height-tablet;
  }
  @include mobile-s {
    top: -$filter-height-mobile;
  }
}
//이미지 컨테이너 끝
//필터 설정 시작
.filter__btn {
  background-color: white;
  width: 350px;
  height: $filter-height-desktop;
  position: relative;
  border-radius: 5px;
  border: #a1a1a1 solid 0.5px;
  z-index: 2;
  text-align: center;
  padding: 2% 2% 2% 2%;
  flex-wrap: wrap;
  @include tablet {
    width: 350px;
    height: $filter-height-tablet;
  }
  @include mobile-s {
    width: 300px;
    height: $filter-height-mobile;
  }
}
.filter__outer {
  height: 80%;
}

.filter__outer_button {
  width: 95%;
  height: auto;
}
.filter_title {
  font-family: "GoyangIlsan";
  font-weight: bold;
  display: inline-block;
}

//필터 설정 끝
//모달 시작
.modal__btn_close {
  font-size: 2em;
  float: right;
  position: absolute;
  bottom: 95%;
  right: 3%;
  @include tablet {
    font-size: 1em;
  }
  @include mobile-s {
    font-size: 1em;
  }
}
.modal__btn_right {
  color: white;
  font-size: 1.5em;
  position: absolute;
  bottom: 50%;
  transform: translateX(100%);
  @include mobile-s {
    font-size: 80%;
  }
}
.modal__btn_left {
  color: white;
  font-size: 1.5em;
  position: absolute;
  bottom: 50%;
  @include mobile-s {
    font-size: 80%;
  }
}
.modal-body {
  all: none;
  height: 200%;
  padding: 0 0 0 0;
}
.modal-content {
  background: rgba(0, 0, 0, 0) !important;
  border: rgba(0, 0, 0, 0) !important;
}
.modal__content_footer {
  color: white;
  position: absolute;
  clear: left;
  float: left;
  left: 0;
  bottom: 0px;
  font-family: "GoyangIlsan";
  margin: 7% 0 7% 7%;
  @include mobile-s {
    margin: 7% 0 7% 0%;
    font-size: 20px;
  }
  @include tablet {
    margin: 7% 0 7% 0%;
    position: relative;
    font-size: 50%;
  }
}
.modal__content_outer {
  background-color: #a1a1a1;
  position: relative;
  height: auto;
}
.modal__content_monthly_price {
  font-size: 1em;
}
.modal__content_name {
  font-size: 1.5em;
  font-weight: bold;
}
.modal__content_info {
  font-size: 0.7em;
}
.modal__content_tags {
  font-size: 0.5em;
}
//모달 끝
//태그 시작
.btn-group {
  padding: 10px 0px 10px 10px;

  @include mobile-s {
    padding: 3px 0px 3px 3px;
  }
}

.dropdown button {
  float: left;
  background: #ffffff;
  font-family: "GoyangIlsan";
  font-size: 14px;
  border: 2px solid #c4c4c4;
  border-radius: 15px;
  margin-right: 5px;
  height: 2.5em;

  @include tablet {
    height: 2em;
  }
  @include mobile-s {
    height: 2em;
    margin-right: 3px;
  }
}
.btn__name {
  float: left;
  padding: 0 3px 0 3px;
  @include tablet {
    font-size: 0.8em;
    padding: 0 1px 0 1px;
  }
  @include mobile-s {
    font-size: 0.1em;
    padding: none;
  }
}
//태그 끝
/// 검색창 부분 시작
.search {
  margin: 1em 0 0 0;
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
  background: #f8f9fa;

  @include tablet {
    margin: 0.5em 0 0 0;
  }
}

.search input {
  height: 60px;
  text-indent: 25px;
  border: 2px solid #d6d4d4;
  border-radius: 3em;
  background-color: #ffffff;
  font-family: "GoyangIlsan";
  padding-left: 30px;

  @include mobile-s {
    height: 40px;
    font-size: 11px;
    padding-left: 15px;
  }
}

.search input:focus {
  box-shadow: none;
  border: 2px solid #a4a4a4;
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
}

.search button {
  position: absolute;
  font-weight: bold;
  top: 5px;
  right: 5px;
  height: 50px;
  width: 110px;
  background: #c4c4c4;

  @include mobile-s {
    height: 30px;
    width: 60px;
    font-size: 12px;
  }
}
.search i {
  position: absolute;
  font-weight: bold;
  top: 0.7rem;
  left: 1.3rem;
  font-size: 25px;
  @include mobile-s {
    top: 0.3rem;
    left: 0.8rem;
    font-size: 20px;
  }
}
//검색창 부분 끝
</style>
