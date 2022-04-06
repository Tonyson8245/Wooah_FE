<template>
  <div
    class="col img__outline img-thumbnail shadow-sm"
    style="position: relative"
  >
    <i
      class="bi bi-heart-fill monthly"
      v-if="post.monthly_art"
      :class="[post.monthly_art, isLoaded]"
    ></i>
    <img
      :src="post.url + `?` + index"
      aria-placeholder="https://via.placeholder.com/400x400"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="$emit('ClickPost', post)"
      @load="onImgLoad"
      @error="onError"
    />
  </div>

  <!-- data-bs-toggle="modal" /     data-bs-target="#exampleModal"  // 모달 켜주는 것-->
</template>

<script>
import img from "../../assets/img/400x400.png";

export default {
  name: "PostImage",
  props: {
    post: Object,
    index: Number,
  },
  data() {
    return {
      isLoaded: "invisible",
    };
  },
  methods: {
    onImgLoad() {
      this.isLoaded = "visible";
    },
    onError(e) {
      e.target.src = img;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$thumbnail-padding: 0.25rem;

.col img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}

.img__outline {
  padding: 2px;
  position: relative;
  width: 32%;
  margin: 0.5% 0.5% 0.5% 0.5%;
  padding-bottom: 32%;
  overflow: hidden;
  background: #f1f1f1;
}

.monthly {
  position: absolute;
  top: 3%;
  right: 5%;
  color: #fd00c6;
  font-size: 20px;
  z-index: 1;
  @include tablet {
    font-size: 18px;
  }
}
</style>
