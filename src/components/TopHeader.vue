<template>
  <nav
    class="Roboto navbar navbar-expand-lg navbar-light bg-light p-0 m-0"
    style="width: 100%"
    :style="padding"
  >
    <div class="container-lg">
      <a class="navbar-brand" @click="this.$router.push('/')">우아</a>
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
              <a
                class="nav-link"
                :class="TapCondition[0]"
                @click="this.$router.push('/library')"
                >디자인</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="TapCondition[1]"
                @click="this.$router.push('/shop')"
                >샵</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="TapCondition[2]"
                @click="this.$router.push('/monthlyart')"
                >이달의아트</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="TapCondition[3]"
                @click="this.$router.push('/comparison')"
                >가격비교</a
              >
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
      padding: ``,
    };
  },
  props: {},
  watch: {
    PageConditions(state) {
      switch (state) {
        case "collection":
          this.TapCondition = ["active", "", "", ""];
          break;
        case "shop":
          this.TapCondition = ["", "active", "", ""];
          break;
        case "monthlyart":
          this.TapCondition = ["", "", "active", ""];
          break;
        case "comparison":
          this.TapCondition = ["", "", "", "active"];
          break;
        default:
          this.TapCondition = ["", "", "", "", ""];
          break;
      }
    },
  },
  computed: {
    PageConditions() {
      return this.$store.state.pagecondintion;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

.navbar {
  /* font-family: "MaplestoryOTFLight"; */
  font-family: "GoyangIlsan";
  background: white;
  font-size: 20px;
  border: solid #c4c4c4;
  border-width: 0 0 0.5px 0;
  /* padding: 0 0 0 21%; // 상단 높이 맞추기 위함 */
  @include tablet {
    font-size: 20px;
    padding: 0 0 0 0; // 모바일 상에서는 다시 붙기
  }
  @include mobile-s {
    font-size: 50%;
  }
}
.navbar-brand {
  font-size: 40px;
  width: 100px;
  height: auto;
  font-weight: bold;

  @include tablet {
    font-size: 30px;
  }
  @include mobile-s {
    font-size: 20px;
  }
} //로고
.active {
  font-weight: bold;
}
</style>

<style>
.navbar-toggler {
  font-size: 150%;
}
</style>
