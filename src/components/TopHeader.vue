<template>
  <nav class="Roboto navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="./">우아</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        style="width: auto"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">전체 메뉴</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link" :class="TapCondition[0]" href="./library"
                >디자인모아보기</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="TapCondition[1]" href="./shop">샵</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      TapCondition: ["", ""], // 실제 상단 헤더의 :class 상태 // 실제 컨디션
    };
  },
  props: {
    PageCondition: Array, // 부모가 보내준 페이지 컨디션
  },
  watch: {},
  beforeUpdate() {
    this.TapCondition = [...this.PageCondition]; // 여기서 적용
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

.navbar {
  font-family: "MaplestoryOTFLight";
  font-size: 20px;
  padding: 0 0 0 15%; // 상단 높이 맞추기 위함

  @include tablet {
    font-size: 20px;
    padding: 0 0 0 0; // 모바일 상에서는 다시 붙기
  }
}
.navbar-brand {
  font-size: 40px;
  width: 100px;
  height: auto;

  @include tablet {
    font-size: 30px;
  }
} //로고
.active {
  font-weight: bold;
}
</style>
