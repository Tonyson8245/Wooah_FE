<template>
  <div>
    <AlertDialog />
    <div>
      <div
        class="row d-flex justify-content-center align-items-center"
        style="padding: 0 3% 0 3%"
      >
        <!-- 전체 컨테이너 -->
        <div class="col-md-10">
          <!-- 검색창 시작 -->
          <SearchPage
            @ClickTag="ClickTag($event)"
            @MakeQuery="ClickTag($MakeQuery)"
          />
          <!-- 검색 창 끝/태그 시작 -->
          <div :class="SearchState">
            <div class="btn_outer btn_outer_move">
              <div class="btn-group" @click="ClickFilter">
                <div class="dropdown">
                  <button
                    class="btn btn-sm"
                    style="min-width: 5em"
                    :style="[ButtonFocusSetting, MontlyArtCondition]"
                    @click="ClickMonthlyArt"
                  >
                    <span class="btn__name"> 이달의아트 </span>
                  </button>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-sm"
                    type="button"
                    :style="[
                      ButtonFocusSetting,
                      `background-color:${Filterbar.condition[0]}`,
                    ]"
                    @click="FilterOpen('컬러')"
                  >
                    <span v-if="Filterbar.condition[0] == ``" class="btn__name"
                      >컬러<i class="bi bi-caret-down-fill"></i
                    ></span>
                    <span v-else class="settedFilter btn__name"
                      ><i
                        v-for="(c, i) in Filterbar.color"
                        :key="i"
                        class="bi bi-circle-fill"
                        :style="`color:${c}`"
                      ></i
                    ></span>
                    <!-- 상황에따라 필터 아이콘 온오프 -->
                  </button>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-sm"
                    :style="[
                      ButtonFocusSetting,
                      `background-color:${Filterbar.condition[1]}`,
                    ]"
                    type="button"
                    @click="FilterOpen('쉐입')"
                  >
                    <span v-if="Filterbar.condition[1] == ``" class="btn__name"
                      >쉐입<i class="bi bi-caret-down-fill"
                    /></span>
                    <span v-else class="settedFilter btn__name">{{
                      Filterbar.shape
                    }}</span>
                  </button>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-sm"
                    :style="[
                      ButtonFocusSetting,
                      `background-color:${Filterbar.condition[2]}`,
                    ]"
                    type="button"
                    @click="FilterOpen('옵션')"
                  >
                    <span v-if="Filterbar.condition[2] == ``" class="btn__name"
                      >옵션<i class="bi bi-caret-down-fill"
                    /></span>
                    <span v-else class="settedFilter btn__name">{{
                      Filterbar.option
                    }}</span>
                  </button>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-sm"
                    :style="[
                      ButtonFocusSetting,
                      `background-color:${Filterbar.condition[3]}`,
                    ]"
                    type="button"
                    @click="FilterOpen('손발')"
                  >
                    <span v-if="Filterbar.condition[3] == ``" class="btn__name"
                      >손발<i class="bi bi-caret-down-fill"
                    /></span>
                    <span v-else class="settedFilter btn__name">{{
                      Filterbar.handfoot
                    }}</span>
                  </button>
                </div>
                <button
                  class="btn btn-sm filter__reset"
                  :style="ButtonFocusSetting"
                  style="border: 2px solid #c4c4c4; border-radius: 15px"
                  type="button"
                  @click="Reset"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>

            <FilterView
              class="filter_content"
              :class="FilterStatus"
              :FilterCategory="FilterCategory"
              :SetFilter="SetFilter"
              @ClickApply="FilterApply($event)"
            />
            <!-- 태그끝 -->
            <!-- 하단 사진들 시작 -->
            <InfiniteScroll
              @infinite-scroll="moreData"
              :class="ImageContainerMove"
              class="images__container"
              :noResult="noResult"
              :message="message"
            >
              <div class="row row-cols-3 row-cols-sm-3 row-cols-lg-3 g-0">
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
            </InfiniteScroll>
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
                @click="ClickPrevPost"
                class="bi bi-arrow-left-circle-fill modal__btn_left"
              ></i>
            </div>
            <div class="row" style="width: 80%">
              <div class="col-lg-8 square" style="padding: 0 0 0 0">
                <img
                  :src="post.url"
                  class="shadow-sm content"
                  alt="..."
                  style="display: inline-block"
                />
              </div>
              <div class="col-lg-4 ms-auto modal__content_outer">
                <div class="modal__content_footer">
                  <div v-if="post.monthly">
                    <i class="bi bi-coin monthly"></i>
                    <span class="modal__content_monthly_price">{{
                      post.price
                    }}</span>
                  </div>
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
                    <span
                      ><i class="bi bi-geo-alt"></i>{{ shop.address }}
                    </span>
                    <span v-if="post.monthly_art"
                      ><br /><i class="bi bi-coin"></i
                      >{{ post.price }} 원 </span
                    ><br />
                  </span>

                  <span
                    class="modal__content_tags"
                    v-for="tag in post.tags"
                    :key="tag"
                    >#{{ tag }}
                  </span>
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
import InfiniteScroll from "infinite-loading-vue3";
import PostImage from "./PostImage.vue";
import color from "../../assets/dummy/color";
import shape from "../../assets/dummy/shape";
import option from "../../assets/dummy/option";
import handfoot from "../../assets/dummy/handfoot";
import FilterView from "./FilterView.vue";
import AlertDialog from "../Common/AlertDialog.vue";
import SearchPage from "./SearchPage.vue";

export default {
  name: "CollectionPage",
  data() {
    return {
      message: "",
      //외부 데이터 시작
      handfoot: handfoot,
      color: color,
      option: option,
      shape: shape,
      //외부 데이터 끝
      // 내부 상태 데이터
      post: "", //포스트
      shop: "", // 샵 정보(상세보기에 사용됨)
      Clicked_post_index: "", // 현재 클릭된 post index
      ButtonCondition: ["", ""], //0번이 뒤로, 1번이 앞으로 // 처음이랑 마지막 버튼 안보여주기 위한 클래스 보관 장소
      ButtonFocusSetting: `outline: none !important;  box-shadow: none;`, //css로 세팅이 안되서 일로옴

      //필터 시작
      Filterbar: {
        color: [],
        shape: "",
        option: "",
        handfoot: "",
        condition: [``, ``, ``, ``],
      },
      FilterStatus: "d-none", // 필터 보여주는지 아닌지
      FilterCategory: "", // 필터 카테고리
      ImageContainerMove: "", // 핕터때문에 내려가는 이미지 컨테이너 끌어올리기
      MontlyArtCondition: "",
      SetFilter: {
        color: [
          false, //빨강
          false, //주황
          false, //노랑
          false, //초록
          false, //하늘
          false, //파랑
          false, //보라
          false, //분홍
          false, //검정
          false, //하양
          false, //갈색
          false, //연두
        ],
        shape: [
          false, //스퀘어
          false, //스퀘어드오버스쿼벌
          false, //오벌
          false, //라운디드
          false, //아몬드
          false, //마운틴피크
          false, //스틸레토
          false, //발레리나
          false, //엣지
          false, //립스틱
          false, //플레어
          false, //애로우헤드
        ],
        option: [
          false, //프렌치
          false, //아트
          false, //파츠
          false, //젤기본
          false, //글리터
          false, //글라데이션
        ],
        handfoot: [false, false],
        monntlyart: false,
      }, //현재 설정된 필터
      beforeSetFilter: {
        color: [
          false, //빨강
          false, //주황
          false, //노랑
          false, //초록
          false, //하늘
          false, //파랑
          false, //보라
          false, //분홍
          false, //검정
          false, //하양
          false, //갈색
          false, //연두
        ],
        shape: [
          false, //스퀘어
          false, //스퀘어드오버스쿼벌
          false, //오벌
          false, //라운디드
          false, //아몬드
          false, //마운틴피크
          false, //스틸레토
          false, //발레리나
          false, //엣지
          false, //립스틱
          false, //플레어
          false, //애로우헤드
        ],
        option: [
          false, //프렌치
          false, //아트
          false, //파츠
          false, //젤기본
          false, //글리터
          false, //글라데이션
        ],
        handfoot: [false, false],
        monntlyart: false,
      }, //이전 설정된 필터
      //필터 끝
    };
  },
  mounted() {
    //데이터 가져오는 코드 여기 넣쟈
    this.$store.dispatch("collectionStore/fetchPost");
    this.$emit("ChangePageCondition", "collection");
  }, // 생성 될때 포스트 데이터를 가져오게 한다.
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
    FilterOpen(data) {
      if (this.FilterStatus == "d-none") {
        this.FilterStatus = "visible";
        this.FilterCategory = data;
      } else {
        if (this.FilterCategory == data) {
          this.FilterStatus = "d-none";
          this.FilterCategory = "";
        } else this.FilterCategory = data;
      }
    }, // 필터 설정 버튼 누르고 닫기
    FilterApply(data) {
      switch (this.FilterCategory) {
        case "컬러":
          this.FindApplyColor(data); // 여기서 구분해서 바꿔준다.
          break;
        case "쉐입":
          this.FindApplyShape(data); // 여기서 구분해서 바꿔준다.
          break;
        case "옵션":
          this.FindApplyOption(data); // 여기서 구분해서 바꿔준다.
          break;
        case "손발":
          this.FindApplyHandfoot(data); // 여기서 구분해서 바꿔준다.
          break;
      } // 필터 카테고리에 따라 현재 설정된 필터 값을 바꿔주는 곳
      if (data == "reset") {
        this.MontlyArtCondition = "";
        this.SetFilter.monntlyart = false;
      }

      this.ChangeFilterbar();
      this.FilterStatus = "d-none";
      this.FilterCategory = "";
      //여기서 post 갱신!! 포스트 내용 vuex 로 빼고, 거기서 지지고 볶고 ㄱㄱ

      let before = this.beforeSetFilter;
      let after = this.SetFilter;
      let change =
        JSON.stringify(before.color) !== JSON.stringify(after.color) ||
        JSON.stringify(before.shape) !== JSON.stringify(after.shape) ||
        JSON.stringify(before.option) !== JSON.stringify(after.option) ||
        JSON.stringify(before.handfoot) !== JSON.stringify(after.handfoot) ||
        JSON.stringify(before.monntlyart) !== JSON.stringify(after.monntlyart);
      if (change) {
        this.MakeQuery();
        this.beforeSetFilter.color = this.SetFilter.color;
        this.beforeSetFilter.shape = this.SetFilter.shape;
        this.beforeSetFilter.option = this.SetFilter.option;
        this.beforeSetFilter.handfoot = this.SetFilter.handfoot;
        this.beforeSetFilter.monntlyart = this.SetFilter.monntlyart;
      }
    }, // 필터의 확인 버튼 눌렀을 동작
    MakeQuery() {
      let query = "",
        filterdata = this.SetFilter;
      let flag = false;
      let color_qeury = "&color=";
      let shape_qeury = "&shape=";
      let option_qeury = "&option=";
      let handfoot_qeury = "&type=";
      let monthly_art_qeury = "";

      for (let i in filterdata.color) {
        if (filterdata.color[i] == true) {
          color_qeury += this.color[i].en_name + " ";
          flag = true;
        }
      }
      if (flag == false) color_qeury = "";

      flag = false;
      for (let i in filterdata.shape) {
        if (filterdata.shape[i] == true) {
          shape_qeury += this.shape[i].en_name + " ";
          flag = true;
        }
      }
      if (flag == false) shape_qeury = "";

      flag = false;
      for (let i in filterdata.option) {
        if (filterdata.option[i] == true) {
          option_qeury += this.option[i].en_name + " ";
          flag = true;
        }
      }
      if (flag == false) option_qeury = "";

      flag = false;
      for (let i in filterdata.handfoot) {
        if (filterdata.handfoot[i] == true) {
          handfoot_qeury += this.handfoot[i].en_name + " ";
          flag = true;
        }
      }
      if (flag == false) handfoot_qeury = "";

      flag = false;
      if (filterdata.monntlyart) monthly_art_qeury = "&monthly_art=true";

      query =
        color_qeury +
        shape_qeury +
        option_qeury +
        handfoot_qeury +
        monthly_art_qeury;

      // console.log(query);

      this.$store.commit("collectionStore/setfilterQuery", query); //필터 쿼리 vuex 적용
      this.$store.commit("collectionStore/resetPage", 1); //페이지 초기화
      this.$store.dispatch("collectionStore/fetchPost"); // 불러오기
    },
    FindApplyColor(filters) {
      this.SetFilter.color = [
        ...this.SetFilter.color.map(function () {
          return false;
        }),
      ]; // 초기화 하기
      for (let i in filters) {
        let index = filters[i];
        this.SetFilter.color[index] = true;
      }
    },
    FindApplyShape(filters) {
      this.SetFilter.shape = [
        ...this.SetFilter.shape.map(function () {
          return false;
        }),
      ]; // 초기화 하기
      for (let i in filters) {
        let index = filters[i];
        this.SetFilter.shape[index] = true;
      }
    },
    FindApplyOption(filters) {
      this.SetFilter.option = [
        ...this.SetFilter.option.map(function () {
          return false;
        }),
      ]; // 초기화 하기
      for (let i in filters) {
        let index = filters[i];
        this.SetFilter.option[index] = true;
      }
    },
    FindApplyHandfoot(filters) {
      this.SetFilter.handfoot = [
        ...this.SetFilter.handfoot.map(function () {
          return false;
        }),
      ]; // 초기화 하기
      for (let i in filters) {
        let index = filters[i];
        this.SetFilter.handfoot[index] = true;
      }
    },
    ClickMonthlyArt() {
      if (this.SetFilter.monntlyart) {
        this.MontlyArtCondition = "";
        this.SetFilter.monntlyart = false;
      } else {
        this.MontlyArtCondition = "font-weight:bold; background:#c4c4c4";
        this.SetFilter.monntlyart = true;
      }
      this.MakeQuery();
    },
    ChangeFilterbar() {
      let Filters = this.SetFilter;
      let bar = this.Filterbar;
      let active = `#c4c4c4;`;
      var color_true = Object.keys(Filters.color).filter(
        (key) => Filters.color[key] === true
      );
      var shape_true = Object.keys(Filters.shape).filter(
        (key) => Filters.shape[key] === true
      );
      var option_true = Object.keys(Filters.option).filter(
        (key) => Filters.option[key] === true
      );

      if (color_true.length > 0) {
        // 현재 설정된 색깔이 1개 이상있을시
        bar.color = []; // 초기화
        bar.condition[0] = active; // 해당 필터에 필터 아이콘들 active 시키고
        color_true.forEach((e) => {
          bar.color.push(this.color[e].code); // 필터 바에 색깔 적용
        });
      } else bar.condition[0] = ``;

      if (shape_true.length > 0) {
        bar.shape = []; // 초기화
        bar.condition[1] = active;
        bar.shape = this.shape[shape_true[0]].name;
        if (shape_true.length > 1) bar.shape += " +"; //1개 이상이면 + 붙임
      } else bar.condition[1] = ``;

      if (option_true.length > 0) {
        bar.option = []; // 초기화
        bar.condition[2] = active;
        bar.option = this.option[option_true[0]].name;
        if (option_true.length > 1) bar.option += " +"; //1개 이상이면 + 붙임
      } else bar.condition[2] = ``;

      if (!this.SetFilter.handfoot[0] && !this.SetFilter.handfoot[1]) {
        bar.condition[3] = ``;
      } else {
        bar.condition[3] = active;
        bar.handfoot = ""; // 초기화
        if (this.SetFilter.handfoot[0]) bar.handfoot += "손";
        if (this.SetFilter.handfoot[1]) bar.handfoot += "발";
      }
    }, //Filter bar 갱신
    Reset() {
      this.Filterbar = {
        color: [],
        shape: "",
        option: "",
        handfoot: "",
        condition: [``, ``, ``, ``],
        monntlyart: false,
      };
      this.SetFilter = {
        color: [
          false, //빨강
          false, //주황
          false, //노랑
          false, //초록
          false, //하늘
          false, //파랑
          false, //보라
          false, //분홍
          false, //검정
          false, //하양
          false, //갈색
          false, //연두
        ],
        shape: [
          false, //스퀘어
          false, //스퀘어드오버스쿼벌
          false, //오벌
          false, //라운디드
          false, //아몬드
          false, //마운틴피크
          false, //스틸레토
          false, //발레리나
          false, //엣지
          false, //립스틱
          false, //플레어
          false, //애로우헤드
        ],
        option: [
          false, //프렌치
          false, //아트
          false, //파츠
          false, //젤기본
          false, //글리터
          false, //글라데이션
        ],
        handfoot: [false, false],
        monntlyart: false,
      }; //현재 설정된 필터
      this.FilterApply(`reset`);

      this.$store.commit("collectionStore/setfilterQuery", "");
      this.$store.commit("collectionStore/resetPage", 1);
      this.$store.commit("collectionStore/InitTag");
      this.$store.dispatch("collectionStore/fetchPost");
    },
    Visiblity(boolean) {
      console.log(boolean);
      if (boolean) {
        return "visible";
      } else return "invisible";
    },
    moreData() {
      this.$store.dispatch("collectionStore/fetchPost");
    },
    ClickTag(tag) {
      // console.log(tag);
      this.Reset();
      this.$store.commit("collectionStore/ChangeSearchOff");
      this.$store.commit("collectionStore/changeTag", tag);
      this.MakeQuery();
    },
  },
  watch: {
    Clicked_post_index() {
      // 현재 페이지 위치에 따라 버튼 사라지게 하는 것
      this.ButtonCondition = ["visible", "visible"];
      if (this.Clicked_post_index == "0") this.ButtonCondition[0] = "d-none";
      if (this.Clicked_post_index + 1 >= this.posts.length)
        this.ButtonCondition[1] = "d-none";
    },
    FilterStatus(state) {
      if (state == "d-none") this.ImageContainerMove = "";
      else this.ImageContainerMove = "image__container__move";
    },
  },
  components: {
    PostImage,
    FilterView,
    InfiniteScroll,
    AlertDialog,
    SearchPage,
  },
  computed: {
    SearchState() {
      if (this.$store.state.collectionStore.SearchState == true)
        return "search__move";
      else {
        return "";
      }
    },
    posts() {
      return this.$store.state.collectionStore.posts;
    },
    noResult() {
      return this.$store.state.error.noResult;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.search__move {
  position: relative;
  top: -$search_height-desktop;
  @include tablet {
    top: -$search-height-tablet;
  }
  @include mobile-s {
    top: -$search-height-mobile;
  }
}
//이미지 컨테이너 시작
.images__container {
  position: relative;
  z-index: 2;
}
.image__container__move {
  top: -$filter-height-desktop;
  @include tablet {
    top: -$filter-height-tablet;
  }
  @include mobile-s {
    top: -$filter-height-mobile;
  }
}
//이미지 컨테이너 끝
//모달 시작
.square {
  position: relative;
  left: 5px;
  width: 66.6%;
  background-color: #f1f1f1;
  @include tablet {
    width: 100%;
    left: 0px;
  }
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

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
  font-size: 0.7em;
  margin-right: 1em;
}
//모달 끝
//태그 시작
.settedFilter {
  font-weight: bold;
}
.btn-group {
  padding: 10px 0px 10px 10px;

  @include mobile-s {
    padding: 3px 0px 3px 3px;
  }
}
.btn_outer {
  z-index: 2;
  position: relative;
  overflow-y: scroll;
  overflow-y: hidden;
}

.dropdown button {
  background: #ffffff;
  font-family: "GoyangIlsan";
  font-size: 14px;
  border: 2px solid #c4c4c4;
  border-radius: 15px;
  height: 2.5em;
  min-width: 4em;
  text-align: center;
  width: auto;
  margin-right: 3px;
  display: flex;

  @include tablet {
    height: 2em;
  }
  @include mobile-s {
    height: 2em;
  }
}
.btn__name {
  white-space: nowrap;
  @include tablet {
    font-size: 11px;
  }
}
.bi-caret-down-fill {
  padding-left: 5px;
}
.filter__reset {
  @include tablet {
    font-size: 11px;
  }
}
//태그 끝
</style>
