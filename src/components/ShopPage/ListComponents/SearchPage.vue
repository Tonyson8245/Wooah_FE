<template>
  <div>
    <div class="search__outline p-2">
      <div class="search__container">
        <!-- :class="SearchState" -->
        <div class="search">
          <input
            id="inputform"
            v-model="value"
            @keyup.enter="Search($event.target.value)"
            type="text"
            class="form-control"
            placeholder="지역 별 샵 이름을 검색해보세요."
          />
          <i class="bi bi-search"></i>
          <i
            class="bi bi-x-circle-fill"
            @click="close"
            v-if="keyword != ``"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `SearchPage`,
  data() {
    return {
      value: "",
    };
  },
  methods: {
    Search(keyword) {
      if (keyword.trim() != "") {
        var real = keyword.trim();
        this.$store.commit("ShopStore/SetKeyword", real);
      } else this.value = "";
    },
    close() {
      this.$store.commit("ShopStore/SetKeyword", "");
      this.value = "";
    },
  },
  computed: {
    keyword() {
      return this.$store.state.ShopStore.keyword;
    },
  },
  watch: {
    keyword() {
      if (!this.keyword) this.value = ""; // keyword 값이 false 인 경우 초기화가 된 경우기 때문에 현재 input안의 내용도 초기화 시킴
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

//검색쪽 시작
.search__outline {
  width: 100%;
  background: #d4d4d4;
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
  font-weight: bold;
  left: 92%;
  @include tablet {
    left: 91%;
  }
  @include mobile-s {
    left: 29%;
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
  border: 1.5px solid #e4e4e4;
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
}

.search i {
  position: absolute;
  color: #a4a4a4;
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
