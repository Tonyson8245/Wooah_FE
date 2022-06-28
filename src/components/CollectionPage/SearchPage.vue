<template>
  <div>
    <GDialog :yesno="false" />
    <div class="search__outline border-top-0 border" :class="SearchState">
      <div class="search">
        <input
          type="text"
          class="form-control"
          ref="input"
          placeholder="찾고 싶은 이미지 태그를 검색해 보세요"
          :value="keyword"
          @focus="ChangeState"
          @keyup.enter="EnterEvent"
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
        <div class="result">
          <ul class="list-group">
            <li
              class="list-group-item badge align-left"
              v-if="this.keyword != `` && SearchResult.length == 0"
            >
              조건에 맞는 태그가 없습니다.
            </li>
            <li
              v-for="result in SearchResult"
              :key="result"
              class="list-group-item pe-click"
              @click="$emit('ClickTag', result)"
            >
              {{ result }}
            </li>
          </ul>
        </div>
        <div class="ranktags">
          <h4 class="title">인기 태그</h4>
          <span
            class="tags badge rounded-pill pe-click"
            v-for="tag in RankTags"
            :key="tag"
            @click="$emit('ClickTag', tag)"
            >{{ tag }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GDialog from "@/components/Common/AlertDialog.vue";
export default {
  name: "SearchPage",
  data() {
    return {};
  },
  components: {
    GDialog,
  },
  mounted() {},
  computed: {
    SearchState() {
      if (this.$store.state.collectionStore.SearchState == true) return "on";
      else return "";
    },
    SearchStateBoolean() {
      return this.$store.state.collectionStore.SearchState;
    },
    SearchResult() {
      return this.$store.state.collectionStore.SearchResult;
    },
    RankTags() {
      return this.$store.state.collectionStore.Ranktags;
    },
    keyword() {
      return this.$store.state.collectionStore.tag;
    },
  },
  methods: {
    ChangeState() {
      // if (this.keyword != "") this.$store.state.collectionStore.tag = null; // 키워드 초기화
      this.$store.dispatch("collectionStore/searchTag", this.keyword);

      this.$store.commit("collectionStore/ChangeSearchOn");
      this.$store.dispatch("collectionStore/fetchRankTag");
    },
    close() {
      this.$store.commit("collectionStore/ChangeSearchOff");
      this.$store.commit("collectionStore/ResetSearch");
      if (this.$store.state.collectionStore.tag == null) {
        this.$emit("MakeQuery");
      }
    },
    search(e) {
      let searchkeyword = e.target.value;
      this.$store.commit("collectionStore/changeTag", searchkeyword);
      this.$store.dispatch("collectionStore/searchTag", searchkeyword);
    },
    EnterEvent() {
      this.$store.commit("alertStore/ChangeState");
      this.$store.commit(
        "alertStore/ChangeComment",
        "하단의 태그를 클릭하여 검색해주세요."
      );
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.ranktags {
  padding: 2% 1% 0 3%;
  font-family: "GoyangDeogyang";
  cursor: default;
}
.ranktags .title {
  color: $pa;
  font-weight: bold;
  @include mobile-s {
    font-size: 14px;
  }
}
.ranktags .tags {
  margin: 0.5%;
  font-size: 14px;
  background: $pa;
  @include mobile-s {
    font-size: 11px;
  }
}
.result {
  padding: 2% 1% 0 1%;
  overflow-y: hidden;
  height: 320px;
  @include mobile-s {
    max-height: 280px;
  }
}
.result__outline .list-group-item {
  font-family: "GoyangIlsan";
  border: none;
  margin-bottom: 1%;
  min-height: 30px;
  cursor: default;
  @include mobile-s {
    font-size: 11px;
  }
}
.result__outline {
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
  z-index: 4;
  height: 600px;
  @include tablet {
    height: 600px;
  }
  @include mobile-s {
    height: 480px;

    border-radius: 20px;
  }
}

/// 검색창 부분 시작
.search {
  display: inline;
  margin: 1em 0 0 0;

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
  height: 60px;
  text-indent: 25px;
  border: 0.5px solid $pl-4;
  border-radius: 3em;
  background-color: white;
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
}

.search .fa-search {
  position: absolute;
  top: 20px;
  left: 16px;
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
