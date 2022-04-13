<template>
  <div>
    <div class="search__outline p-2">
      <div class="search__container">
        <!-- :class="SearchState" -->
        <div class="search">
          <input
            type="text"
            class="form-control"
            placeholder="샵 이름을 검색해보세요."
          />
          <i class="bi bi-search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `SearchPage`,
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

//검색쪽 시작
.search__outline {
  width: 100%;
  background: #c4c4c4;
}
.search__container {
  background-color: #a4a4a4;
  width: 100%;
  position: relative;
  border-radius: 35px;
  background: white;
  margin: auto;
}

/// 검색창 부분 시작
.search {
  display: inline;
  margin: 1em 0 0 0;
  background: #f8f9fa;

  @include tablet {
    margin: 0.5em 0 0 0;
  }
}
.search .bi-x-circle-fill {
  position: absolute;
  left: 93%;
  @include tablet {
    left: 92%;
  }
  @include mobile-s {
    left: 90%;
  }
}
.search input {
  height: 45px;
  text-indent: 15px;
  border: 0.5px solid #d6d4d4;
  border-radius: 2em;
  background-color: #ffffff;
  font-family: "GoyangIlsan";
  padding-left: 30px;
  font-size: 0.9em;
  @include mobile-s {
    height: 40px;
    font-size: 11px;
    padding-left: 15px;
  }
}

.search input:focus {
  box-shadow: none;
  border: 1.5px solid #a4a4a4;
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
}

.search i {
  position: absolute;
  font-weight: bold;
  top: 0.6rem;
  left: 1rem;
  font-size: 18px;
  @include mobile-s {
    top: 0.3rem;
    left: 0.8rem;
    font-size: 15px;
  }
}
//검색창 부분 끝
</style>
