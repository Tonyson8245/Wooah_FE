<template>
  <div class="container">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="btn" @click="clickAll">전체 가격대 보기</div>
      <div>{{ total_amount }}개의 디자인</div>
    </div>
    <div class="body">
      <InfiniteScroll
        @infinite-scroll="moreData()"
        v-if="!noPost"
        :noResult="noResult"
        class="row g-1"
      >
        <div
          v-for="art in arts"
          :key="art"
          class="col-lg-3 col-sm-6 col-6 mb-3 g-2"
        >
          <thumbnail :art="art" :toggle="false"></thumbnail>
        </div>
      </InfiniteScroll>
      <div v-if="noPost" class="noPost">
        <span class="item">조회 결과가 없습니다.</span>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteScroll from "infinite-loading-vue3";
import thumbnail from "@/components/MonthlyartPage/ThumbnailComponent.vue";

export default {
  name: `MonthlyartDetail`,
  data() {
    return {
      loadStatus: true, // 데이터의 변화가 생겼으면 true, 그전까지는 false 유지
    };
  },
  mounted() {
    this.reset();
    this.moreData();
  },
  methods: {
    clickAll() {
      this.$router.push({ path: "/monthlyart" }); // 이달의 아트 메인페이지로 이동
    },
    moreData() {
      if (!this.noResult) {
        this.$store.dispatch("MonthlyartStore/getPosts", {
          sido: this.sido,
          sigungu: this.sigungu,
          price_range: this.price_range,
        }); // 서버에 데이터 요청 // 뒤에는 원하는 가격대
      }
    },
    reset() {
      this.$store.commit("MonthlyartStore/resetPost");
    },
  },
  computed: {
    price_range() {
      return this.$route.params.price / 10000;
    },
    noResult() {
      return this.$store.state.MonthlyartStore.noResult;
    }, // Infinite scroll component props
    noPost() {
      return this.$store.state.MonthlyartStore.noPost;
    }, // Infinite scroll component props

    total_amount() {
      return this.$store.state.MonthlyartStore.total_amount;
    },
    arts() {
      return this.$store.state.MonthlyartStore.arts;
    },

    sido() {
      return this.$store.state.CommonStore.sido;
    },
    sigungu() {
      return this.$store.state.CommonStore.sigungu;
    },
    updateDistrict() {
      return this.$store.state.CommonStore.updateDistrict;
    },
  },
  watch: {
    updateDistrict(a) {
      if (a) {
        this.reset();
        this.moreData();
        this.$store.commit("CommonStore/setUpdateDistrict", false);
      }
    },
  },
  components: {
    thumbnail,
    InfiniteScroll,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.container {
  width: 100%;
  padding: 0 0 0 0;
}
.header {
  font-size: 1.1em;
  margin: 0 0 1% 0;
  vertical-align: center;
  @include tablet {
    margin: 0 5% 1% 0;
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 70%;
  }
}
.header .btn {
  border: solid #c4c4c4 1px !important;
  background: #e4e4e4;
  @include tablet {
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 70%;
  }
}
</style>
