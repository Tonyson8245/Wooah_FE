<template>
  <div class="col img__outline" style="position: relative">
    <i class="bi bi-coin monthly" :class="post.monthly_art"></i>

    <img
      :src="post.url + `?` + index"
      class="img-thumbnail shadow-sm square"
      aria-placeholder="https://via.placeholder.com/400x400"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="$emit('ClickPost', post)"
    />
    <!-- data-bs-toggle="modal" /     data-bs-target="#exampleModal"  // 모달 켜주는 것-->
  </div>
</template>

<script>
export default {
  name: "PostImage",
  props: {
    post: Object,
    index: Number,
  },
  methods() {},
};
</script>

<style lang="scss" scoped>
$thumbnail-padding: 0.25rem;

.img-thumbnail {
  padding: 1px;
}
.monthly {
  position: absolute;
  top: 3%;
  right: 5%;
  color: #c4c4c4;
  font-size: 2em;
}
</style>
