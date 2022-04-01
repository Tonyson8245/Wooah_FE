<template>
  <div class="col img__outline">
    <img
      :src="post.url + `?` + index"
      class="img-thumbnail shadow-sm"
      alt="..."
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
</style>
