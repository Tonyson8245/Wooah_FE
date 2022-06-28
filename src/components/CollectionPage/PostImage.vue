<template>
  <div class="col img__outline pe-click" style="position: relative">
    <!-- <i
      class="bi bi-heart-fill monthly"
      v-if="post.monthly_art"
      :class="[post.monthly_art, isLoaded]"
    ></i> -->
    <img
      class="monthly"
      v-if="post.monthly_art && monthlyoff != true"
      :class="[post.monthly_art, isLoaded]"
      src="../../assets/icon/monthly_art.png"
    />
    <img
      class="img__inner"
      :src="post.url + `?` + index"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="
        if (!error) $emit('ClickPost', post);
        else updateimg();
      "
      @load="onImgLoad"
      @error="onError"
      :style="`object-fit:` + objectfit"
      ref="img"
    />
  </div>

  <!-- data-bs-toggle="modal" /     data-bs-target="#exampleModal"  // 모달 켜주는 것-->
</template>

<script>
import img from "../../assets/img/failed_design.png";

export default {
  name: "PostImage",
  props: {
    post: Object,
    index: Number,
    objectfit: String,
    monthlyoff: Boolean,
  },
  data() {
    return {
      isLoaded: "invisible",
      error: false,
      updated: false,
    };
  },
  methods: {
    onImgLoad(e) {
      this.isLoaded = "visible";

      if (!this.error) {
        this.error = false;
        this.updated = false;
        e.target.setAttribute(`data-bs-toggle`, "modal");
      }
    },
    onError(e) {
      this.error = true;
      e.target.src = img; //어차피 오류나면 클릭해서 모달이 뜨지 않을테니, 그냥 새로고침하게 하자
      e.target.setAttribute(`data-bs-toggle`, "");
    },
    updateimg() {
      if (this.error) {
        this.$refs.img.src =
          this.post.url + `?` + this.index + new Date().getTime();
        this.error = false;
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$thumbnail-padding: 0.25rem;

.img__inner {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
}

.img__outline {
  padding: 0 0 0 0;
  position: relative;
  width: 32%;
  margin: 0.5% 0.5% 0.5% 0.5%;
  padding-bottom: 32%;
  overflow: hidden;
}

.monthly {
  position: absolute;
  top: 3%;
  right: 3%;
  color: #ffbdf1;
  width: 30px;
  z-index: 1;
  @include tablet {
    width: 15%;
  }
}
</style>
