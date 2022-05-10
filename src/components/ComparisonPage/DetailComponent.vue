<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="square"><img :src="imgUrl" alt="" class="inner" /></div>
      </div>

      <div class="col-md-6 col-12 arrow">
        <div :class="arrowboxCSS" class="message">
          <div class="message__header">
            <div class="stepNum">STEP {{ focusNum }}</div>
            <div class="title">{{ info.name }}</div>
            <div class="content">{{ info.description }}</div>
            <div class="line"></div>
          </div>
          <div v-if="info.answer.length % 2 == 1" class="row p-2">
            <div v-for="answer in info.answer" :key="answer" class="col-4 g-1">
              <div class="btn btn-secondary" @click="clickButton(answer)">
                {{ answer }}
              </div>
            </div>
            <div v-if="info.skip" class="g-1">
              <div class="btn btn-skip" @click="clickButton(`건너뛰기`)">
                건너뛰기
              </div>
            </div>
          </div>
          <div v-else class="row p-2">
            <div v-for="answer in info.answer" :key="answer" class="col-6 g-1">
              <div class="btn btn-secondary" @click="clickButton(answer)">
                {{ answer }}
              </div>
            </div>
            <div v-if="info.skip" class="g-1">
              <div class="btn btn-skip" @click="clickButton(`건너뛰기`)">
                건너뛰기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/assets/dummy/question.js";
export default {
  name: `DetailComponent`,
  data() {
    return {
      image: [`step1.png`, `step2.png`, `step3.png`, `step4.png`, `step5.png`],
      data: data,
      status: "시술선택",
      result: "",
    };
  },
  methods: {
    clickButton(answer) {
      console.log(answer);
      switch (answer) {
        case `건너뛰기`:
          this.$store.commit("ComparisonStore/increaseNum");
          this.skip();
      }
    },
    skip() {
      switch (this.focusNum) {
        case 1:
          this.status = "젤제거";
          break;
        case 2:
          this.status = "손톱연장";
          break;
        case 3:
          if (this.type == "foot") this.state = "발톱교정";
          break;
        case 4:
          if (this.type == "foot") this.state = "각질관리";
          break;
      }
    },
  }, // 버튼 눌러서 발생하는 이벤트들을 저장

  computed: {
    focusNum() {
      return this.$store.state.ComparisonStore.focusNum;
    },
    imgUrl() {
      return require("../../assets/img/" + this.image[this.focusNum - 1]);
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
    }, // 현재 손발 종류
    total_questions() {
      if (this.type == "hand") return data.hand;
      else return data.foot;
    },
    info() {
      return this.total_questions[this.status];
    },
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
  @include tablet {
    padding: 0;
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
  border: 1px solid #ba9aff;
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
  border-right-color: #9900ff;
  border-width: 16px;
  margin-top: -16px;
}

.arrow_box {
  min-height: 50px;
  position: relative;
  background: #ffffff;
  border: 1px solid #9900ff;
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
  border-bottom-color: #9900ff;
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
  padding: 5%;
}
.message__header {
  text-align: left;
}
.stepNum {
  color: #9900ff;
  font-weight: bold;
  font-size: 1em;
}
.title {
  font-size: 1.2em;
}
.content {
  font-size: 0.8em;
}
.line {
  border-bottom-style: solid;
  border-bottom-color: #9900ff;
  border-bottom-width: 5px;
  padding-top: 2%;
  width: 20%;
}
.btn {
  background: #ba9aff;
  width: 100%;
  font-size: 80%;
  white-space: nowrap;
  padding-inline: 0;
}
.btn-skip {
  background: #9900ff;
  color: white;
}
</style>
