<template>
  <nav
    class="Roboto navbar navbar-expand-lg p-0 m-0 navbar-secondary"
    style="width: 100%"
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
                data-bs-dismiss="offcanvas"
                :class="TapCondition[0]"
                @click="ClickTo('/library')"
                >디자인</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-dismiss="offcanvas"
                :class="TapCondition[1]"
                @click="ClickTo('/shop')"
                >샵</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-dismiss="offcanvas"
                :class="TapCondition[2]"
                @click="ClickTo('/monthlyart')"
                >이달의아트</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-dismiss="offcanvas"
                :class="TapCondition[3]"
                @click="ClickTo('/comparison')"
                >맞춤시술견적</a
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
    };
  },
  props: { margin: Boolean },
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
  methods: {
    ClickTo(a) {
      this.$router.push(a);

      this.$store.commit("collectionStore/changeTag", null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  outline: none;
  box-shadow: none;
}
.navbar {
  font-family: "GoyangDeogyang";
  background: white;
  font-size: 20px;
  border: solid $pl-4;
  border-width: 0 0 0.5px 0;
  @include tablet {
    font-size: 20px;
  }
  @include mobile-s {
    font-size: 80%;
  }
}
.navbar-brand {
  vertical-align: middle;
  font-size: 40px;
  width: 100px;
  height: auto;
  font-weight: bold;
  color: $pa-1;

  @include tablet {
    font-size: 30px;
  }
  @include mobile-s {
    font-size: 20px;
  }
} //로고

.container-lg {
  padding-inline: 0.3%;
  @include tablet {
    padding-inline: 2%;
  }
  @include mobile-s {
    padding-inline: 2%;
  }
}
.nav-link {
  color: $pl-2;
  padding: 0.1% 0 0.1% 0;
}
.nav-item > a:hover {
  color: $pl-3;
}
.active {
  color: $pl-3;
  text-decoration: underline;
  text-underline-position: under;
}
</style>

<style>
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(213, 0, 249, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
.navbar-toggler {
  box-shadow: unset;
}
.offcanvas-title {
  color: #aa00ff;
}
.text-reset {
  color: #aa00ff;
}
</style>
