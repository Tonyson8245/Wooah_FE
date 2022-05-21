<template>
  <div class="square" style="width: 100%">
    <img class="inner" :src="url" alt="..." />
  </div>
</template>
<script>
export default {
  name: `SquareComponent`,
  props: {
    url: String,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//이미지 시작
.square {
  width: 100%;
  position: relative;
  border-radius: 10%;
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
  left: 0;
  object-fit: cover;
  border: solid #e1e1e1 1px;
}
//이미지 끝
</style>
