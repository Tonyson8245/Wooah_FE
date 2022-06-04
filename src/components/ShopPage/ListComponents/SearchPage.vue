<template>
  <div>
    <div class="search__outline">
      <div class="search__container">
        <!-- :class="SearchState" -->
        <div class="search">
          <input
            id="inputform"
            autocomplete="off"
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
  mounted() {
    if (this.keyword != false) this.value = this.keyword; //
  },
  methods: {
    Search(keyword) {
      if (keyword.trim() != "") {
        var real = keyword.trim();
        this.$store.commit("ShopStore/SetKeyword", real);
      } else this.value = "";
    },
    close() {
      this.$store.commit("ShopStore/Reset"); // 초기화
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
      if (!this.keyword) this.value = "";
      // keyword 값이 false 인 경우 초기화가 된 경우기 때문에 현재 input안의 내용도 초기화 시킴
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";

//검색쪽 시작
.search__outline {
  width: 100%;
  background: $pl-2;
  padding: 2%;
  @include mobile-s {
    font-size: 70%;
    padding: 1%;
  }
}
.search__container {
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

  @include tablet {
    margin: 0.5em 0 0 0;
  }
  @include mobile-s {
    margin: 0.1em 0 0 0;
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
    left: 90%;
  }
}
.search input {
  height: 45px;
  color: black;
  text-indent: 15px;
  border: 0.5px solid $pl-1;
  border-radius: 2em;
  background-color: #ffffff;
  font-family: "GoyangIlsan";
  padding-left: 30px;
  font-size: 0.9em;
  @include mobile-s {
    height: 31px;
    font-size: 11px;
    padding-left: 15px;
  }
}
.search input:focus {
  box-shadow: none;
  border: 1.5px solid $pa-2;
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
}

.search i {
  position: absolute;
  color: $pl-2;
  top: 0.6rem;
  left: 1rem;
  font-size: 18px;
  @include mobile-s {
    top: 0.3rem;
    left: 0.7rem;
    font-size: 15px;
  }
}
//검색창 부분 끝
</style>
