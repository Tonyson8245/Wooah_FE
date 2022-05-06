<template>
  <div class="banner__container container">
    <div class="banner__outline row">
      <!-- 이달의 아트메인 -->
      <div style="z-index: 1">
        <div v-if="title == `monthlyart`">
          <div class="icons">
            <p>4월의 네일 디자인</p>
          </div>
          <div class="text container g-0" :style="`width:` + textWidth">
            <div class="row g-0">
              <div class="col-lg-6 col-md-12">
                <p># 원하는 가격대에 따라</p>
              </div>
              <div class="col-lg-6 col-md-12">
                <p># 골라보는 네일 디자인</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="title != `monthlyart`">
          <div class="text">
            <p>{{ title }}</p>
          </div>
        </div>
      </div>
      <img class="side__img" :src="src" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: `BannerComponent`,
  data() {
    return {};
  },
  props: {
    title: String,
  },
  computed: {
    src() {
      if (this.title == `monthlyart`)
        return require("../../assets/img/monthlyart_banner.png");
      else return require("../../assets/img/monthlyart_2022_05.png");
    },
    textWidth() {
      var width = this.$store.state.CommonStore.width;
      if (width > 1400) return `40%`;
      else return `50%`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.banner__container {
  height: 300px;
  padding: 0.5% 2% 0.5% 2%;
  @include tablet {
    height: 200px;
    font-size: 70%;
  }
  @include mobile-s {
    height: 150px;
    font-size: 50%;
  }
}
.banner__outline {
  background-color: #949494;
  border-radius: 5px;
  height: 100%;
  margin: auto;
  position: relative;
  min-width: 300px;
}
.side__img {
  z-index: 0;
  height: 100%;
  width: auto;

  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;

  -webkit-mask-image: linear-gradient(to top, transparent 5%, black 30%);
  mask-image: linear-gradient(to top, transparent 5%, black 30%);
}
.text p {
  font-size: 1.5em;
  color: white;
  font-style: italic;
  font-family: "GoyangIlsan";
  margin-bottom: 0;
}
.banner__outline .text {
  position: absolute;
  bottom: 10%;
  left: 2.5%;
}
.banner__outline .icons {
  position: absolute;
  top: 20%;
  left: 3%;
  display: flex;
  font-size: 2.5em;
  width: 100%;
  color: white;
  font-family: "GoyangIlsan";
}
</style>
