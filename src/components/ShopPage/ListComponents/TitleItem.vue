<template>
  <div class="title__container container-fluid row g-0">
    <div class="col-7 title">
      <span>{{ title }}</span>
    </div>
    <div class="col-5 region">
      <div class="dropdown">
        <button
          class="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ region }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><span class="dropdown-header">서울 특별시</span></li>
          <li>
            <a class="dropdown-item" @click="region = `서울시 동작구`"
              >동작구</a
            >
          </li>
          <li>
            <a class="dropdown-item" @click="region = `서울시 강남구`"
              >강남구</a
            >
          </li>
          <li>
            <a class="dropdown-item" @click="region = `서울시 서대문구`"
              >서대문구</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `TitleItem`,
  data() {
    return {
      title: "내 주변 샵 보기",
      region: "서울시 동작구",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//제목 시작
.title__container {
  height: 4em;
  width: 100%;
  @include tablet {
    font-size: 70%;
  }
}
.title__container .title {
  font-family: "GoyangIlsan";
  margin: auto;
  padding-left: 6%;
  font-size: 1.2em;
  font-weight: bold;
  @include tablet {
    font-size: 1.5em;
    padding-left: 3%;
  }
}
.title__container .region {
  font-family: "GoyangIlsan";
  margin: auto;
  font-size: 1em;
  text-align: right;
}
.dropdown-toggle {
  @include tablet-s {
    font-size: 1.8em;
  }
  @include tablet {
    font-size: 1.3em;
  }
}
.btn__name {
  white-space: nowrap;
  @include tablet {
    font-size: 11px;
  }
}
//제목 끝
</style>
