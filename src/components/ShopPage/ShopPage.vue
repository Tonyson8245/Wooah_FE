<template>
  <div class="container_outer">
    <div class="container-lg p-md-4">
      <div class="row flex-row-reverse">
        <div class="col-md-8 col-sm-12 map__outer g-0">
          <NaverMap />
        </div>
        <div class="col-md-4 col-sm-12 list__outer g-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NaverMap from "./NaverMap.vue";
export default {
  name: "ShopPage",
  mounted() {
    this.$emit("ChangePageCondition", "shop");
  },
  components: { NaverMap },
  methods: {
    // async fetch() {
    //   let id = "VaC1CdZkJrAkPjptQo15";
    //   let pass = "28qEX1tUfp";
    //   await axios
    //     .get("v1/search/local.json", {
    //       params: { query: "서울시 관악구 네일", display: 20 },
    //       headers: {
    //         Accept: "*/*",
    //         "X-Naver-Client-Id": id,
    //         "X-Naver-Client-Secret": pass,
    //       },
    //     })
    //     .then((response) => {
    //       // 실제 API를 요청한다/
    //       console.log(response);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$desktop-height: 750px;
$tablet-height: 400px;
$mobile-height: 250px;

.container_outer {
  padding: 0 13% 0 13%;
  @include desktop {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }
  @include tablet {
    width: 100%;
  }
}
.container-sm {
  flex-wrap: wrap-reverse;
}
.map__outer {
  height: $desktop-height;
  border: none !important;
  @include tablet-s {
    height: $tablet-height;
  }
  @include mobile-s {
    height: $mobile-height - 50;
  }
}
.list__outer {
  height: $desktop-height;
  overflow-y: scroll;
  background: red;
  @include tablet-s {
    height: $tablet-height;
  }
  @include mobile-s {
    height: $mobile-height + 60;
  }
}
</style>
