<template>
  <div>
    <div
      id="carouselExampleControlsNoTouching"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://picsum.photos/1200/480"
            class="d-block w-100"
            alt="..."
          />
          <!-- 이거 이미지 사이즈 1200 이여야지 "자동 넘어가기" 된다. -->
        </div>
        <div class="carousel-item">
          <img
            src="https://picsum.photos/1200/480?1"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://picsum.photos/1200/480?2"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <!-- 메인페이지 상단 슬라이드 -->
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.carousel-item {
  background: #d4d4d4;

  @include tablet {
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
