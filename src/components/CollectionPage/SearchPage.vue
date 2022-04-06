<template>
  <div class="search__outline" :class="SearchState">
    <div class="search">
      <input
        type="text"
        class="form-control"
        placeholder="찾고 싶은 이미지 태그를 검색해 보세요"
        @focus="ChangeState"
        @input="search($event)"
      />
      <i class="bi bi-search"></i>
      <i
        class="bi bi-x-circle-fill"
        v-if="SearchStateBoolean"
        @click="close"
      ></i>
    </div>
    <div v-if="SearchStateBoolean" class="result__outline">
      <div class="result"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    SearchState() {
      if (this.$store.state.collectionStore.SearchState == true) return "on";
      else return "";
    },
    SearchStateBoolean() {
      return this.$store.state.collectionStore.SearchState;
    },
  },
  methods: {
    ChangeState() {
      this.$store.commit("collectionStore/ChangeSearchOn");
    },
    close() {
      this.$store.commit("collectionStore/ChangeSearchOff");
    },
    search(e) {
      let keyword = e.target.value;
      this.$store.dispatch("collectionStore/searchTag", keyword);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.result__outline {
  overflow-y: scroll;
  height: 88%;
}
.search__outline {
  width: 100%;
  margin-top: 2%;
  position: relative;
  height: 100%;
  border-radius: 35px;
  background: white;
}
.on {
  border: #c2c2c2 solid 0.5px;
  z-index: 5;
  height: 700px;
  @include tablet {
    height: 700px;
  }
  @include mobile-s {
    height: 600px;

    border-radius: 20px;
  }
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
  left: 95%;
}
.search input {
  height: 60px;
  text-indent: 25px;
  border: 0.5px solid #d6d4d4;
  border-radius: 3em;
  background-color: #ffffff;
  font-family: "GoyangIlsan";
  padding-left: 30px;

  @include mobile-s {
    height: 40px;
    font-size: 11px;
    padding-left: 15px;
  }
}

.search input:focus {
  box-shadow: none;
  border: 2px solid #a4a4a4;
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
}

.search button {
  position: absolute;
  font-weight: bold;
  top: 5px;
  right: 5px;
  height: 50px;
  width: 110px;
  background: #c4c4c4;

  @include mobile-s {
    height: 30px;
    width: 60px;
    font-size: 12px;
  }
}
.search i {
  position: absolute;
  font-weight: bold;
  top: 0.7rem;
  left: 1.3rem;
  font-size: 25px;
  @include mobile-s {
    top: 0.3rem;
    left: 0.8rem;
    font-size: 20px;
  }
}
//검색창 부분 끝
</style>
