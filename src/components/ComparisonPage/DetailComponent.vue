<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="square"><img :src="imgUrl" alt="" class="inner" /></div>
      </div>

      <div class="col-md-6 col-12 arrow">
        <div :class="arrowboxCSS" class="message">
          <div class="message__header">
            <div class="stepNum">
              STEP {{ step }}
              <span v-if="substep != 1">- {{ substep - 1 }}</span>
            </div>
            <div class="title">{{ substep_info.name }}</div>
            <div class="content">{{ substep_info.description }}</div>
            <div class="line"></div>
          </div>
          <div class="buttons" v-if="!substep_info.input">
            <!-- input 아닌거 -->
            <div
              v-if="substep_info.answer.length % 2 == 1"
              class="row buttons_inner"
            >
              <!-- 세줄짜리 -->
              <div
                v-for="answer in substep_info.answer"
                :key="answer"
                class="col-4 g-2"
              >
                <div
                  class="btn"
                  style="color: white"
                  @click="clickbutton(answer)"
                >
                  {{ answer }}
                </div>
              </div>
            </div>
            <div v-else class="row buttons_inner" style="width: 100%">
              <!-- 두줄짜리 -->
              <div
                v-for="answer in substep_info.answer"
                :key="answer"
                class="col-6 g-2"
              >
                <div
                  class="btn"
                  style="color: white"
                  @click="clickbutton(answer)"
                >
                  {{ answer }}
                </div>
              </div>
            </div>
          </div>
          <div class="buttons" v-else>
            <div
              class="buttons_inner d-flex align-items-center justify-content-center"
            >
              <input
                :class="{ 'apply-shake': shake }"
                type="text"
                class="form-control m-5 me-1 ms-0"
                style="width: 20%"
                ref="submit"
                placeholder="0"
                @input="value = $event.target.value"
              />개
            </div>
          </div>
          <div class="bottom" v-if="substep_info.skip || substep_info.input">
            <div v-if="substep_info.skip">
              <div class="btn btn-skip" @click="clickbutton('건너뛰기')">
                건너뛰기
              </div>
            </div>
            <div v-if="substep_info.input">
              <div class="btn btn-skip" @click="clickbutton('확인')">확인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questions from "@/assets/dummy/question.js";
export default {
  name: `DetailComponent`,
  data() {
    return {
      image: [`step1.png`, `step2.png`, `step3.png`, `step4.png`, `step5.png`],
      questions: questions,
      name: "",
      option: "",
      value: "",
      shake: false,
      show: true,
    };
  },
  mounted() {
    window.addEventListener("animationend", () => {
      this.shake = false;
    });
  },
  methods: {
    shakeAnimation() {
      this.shake = true;
    },
    clickbutton(answer) {
      this.show = !this.show;
      switch (answer) {
        case "건너뛰기":
          this.increseStep();
          break;
        case "케어만":
        case "영양만":
        case "케어+영양":
        case "남자케어":
          this.increseStep();
          this.name += answer;
          break;
        case "젤 기본":
        case "그라데이션":
        case "프렌치":
          this.increseSubStep();
          this.name += answer;
          break;

        case "케어포함":
        case "케어+영양포함":
          this.increseSubStep();
          this.inertOption(answer);
          break;
        case "원컬러":
        case "투컬러":
          this.increseStep();
          this.inertOption(answer);
          break;
        case "네, 젤이 있어요":
          // this.increseSubStep();
          this.increseStep();
          this.inertOption("타샵");
          this.name += "젤제거";

          break;
        // case "자샵":
        // case "타샵":
        //   this.increseStep();

        //   this.name += "젤제거";
        //   this.inertOption(answer);
        // break;
        case "아니요, 없어요.":
          this.increseStep();
          break;
        case "네, 연장 할 거에요":
          this.increseSubStep();
          this.name += `연장`;
          break;
        case "아니요, 연장 안할거에요.":
          this.increseStep();
          break;
        case "확인":
          if (this.value > 0 && this.value <= 10) {
            this.increseStep();
            this.option = "개당";
          } else {
            this.shakeAnimation();
          }
          break;

        case "네, 교정 할거에요.":
          this.increseStep();
          this.name += `내성발톱교정`;
          break;
        case "네, 각질관리 할거에요.":
          this.increseStep();
          this.name += `각질관리`;
          break;
        case "아니요, 안할거에요.":
          this.increseStep();
          break;
      }
    }, // 버튼 눌러서 발생하는 이벤트
    increseStep() {
      this.$store.commit("ComparisonStore/increseStep");
    }, // 단계 넘어가기
    increseSubStep() {
      this.$store.commit("ComparisonStore/increseSubStep");
    }, // 서브 스텝으로가기
    inertOption(answer) {
      if (this.option.length > 0) this.option += " " + answer;
      else this.option = answer;
    }, //옵션에 값있을때 띄어쓰기
    findid(keyword, option) {
      var id;
      if (option == "")
        id = this.procedure_table.findIndex((x) => x.name === keyword);
      else
        id = this.procedure_table.findIndex(
          (x) => x.name === keyword && x.option === option
        );
      if (id != -1) return this.procedure_table[id].id;
      else return -1;
    },
  },
  computed: {
    procedure_table() {
      if (this.type == "hand")
        return this.$store.state.ComparisonStore.procedure_table.hand;
      else return this.$store.state.ComparisonStore.procedure_table.foot;
    },
    step() {
      return this.$store.state.ComparisonStore.step;
    },
    imgUrl() {
      return require("../../assets/img/" + this.image[this.step - 1]);
    },
    width() {
      return this.$store.state.CommonStore.width;
    },
    arrowboxCSS() {
      if (this.width > 767) return `arrow_box_left`;
      else return `arrow_box`;
    },
    type() {
      return this.$store.state.ComparisonStore.type;
    },
    step_info() {
      if (this.type == "hand") return this.questions.hand[this.step - 1];
      else return this.questions.foot[this.step - 1];
    },
    substep() {
      return this.$store.state.ComparisonStore.substep;
    },
    substep_info() {
      return this.step_info.substep[this.substep - 1];
    },
    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    totalStep() {
      return this.$store.state.ComparisonStore.totalStep;
    },
  },
  watch: {
    step(a) {
      var id = "";

      if (this.option.length > 0) this.option = "(" + this.option + ")";

      id = this.findid(this.name, this.option);
      if (id != -1) {
        if (id == 19 || id == 38) id += "e" + this.value;

        this.$store.commit("ComparisonStore/setQuery", {
          index: a - 2,
          value: id,
        });
      }
      this.option = "";
      this.name = "";

      // 만약 전체 갯수를 넘으면 쿼리 실행
      if (this.totalStep < this.step) {
        this.$store.dispatch("ComparisonStore/fetchPriceList", {
          qeury: this.query,
          sido: this.sido,
          sigungu: this.sigungu,
        });
      }
    }, // 스텝 변화할때 마다 최종 쿼리를 변경해준다.
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.container {
  padding: 5%;
}
.arrow {
  padding: 4%;
  @include desktop {
    padding: 0;
    /* font-size: 80%; */
  }
}
input {
  @include tablet {
    font-size: 80%;
  }
}
img {
  height: 100%;
  width: auto;
  padding: 10%;
  object-fit: contain;
  @include tablet-s {
    width: 80%;
  }
}
// 반응형에 따라 위에 화살표 왼쪽에 화살표 조정
.arrow_box_left {
  height: 100%;
  position: relative;
  background: #ffffff;
  border: 1px solid $pl-2;
  border-radius: 5px;
}
.arrow_box_left:after,
.arrow_box_left:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box_left:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #ffffff;
  border-width: 15px;
  margin-top: -15px;
}
.arrow_box_left:before {
  border-color: rgba(153, 0, 255, 0);
  border-right-color: $pl-2;
  border-width: 16px;
  margin-top: -16px;
}

.arrow_box {
  min-height: 50px;
  position: relative;
  background: #ffffff;
  border: 1px solid $pl-2;
}
.arrow_box:after,
.arrow_box:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box:after {
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #ffffff;
  border-width: 15px;
  margin-left: -15px;
}
.arrow_box:before {
  border-color: rgba(153, 0, 255, 0);
  border-bottom-color: $pl-2;
  border-width: 16px;
  margin-left: -16px;
}
.square {
  width: 100%;
  position: relative;
}

//이미지 모양 잡아주는 것
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}
.message {
  padding: 7%;
  height: 100%;
}
.message__header {
  text-align: left;
}
.stepNum {
  color: $pl-2;
  font-weight: bold;
  font-size: 0.8em;
}
.title {
  font-size: 1.2em;
}
.content {
  font-size: 0.8em;
}
.line {
  border-bottom-style: solid;
  border-bottom-color: $pl-2;
  border-bottom-width: 5px;
  padding-top: 2%;
  width: 20%;
}
.btn {
  background: $pl-2;
  width: 100%;
  font-size: 0.8em;
  white-space: nowrap;
  padding-inline: 0;
}
.btn-skip {
  background: $pa;
  color: white;
}
.buttons {
  height: 60%;

  display: flex;
}
.buttons_inner {
  margin: auto;
  width: 100%;
}
.bottom {
  height: 30%;
}

// 흔드는 것
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
