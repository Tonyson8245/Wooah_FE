<template>
  <div class="container-sm">
    <div class="row flex-row-reverse">
      <div class="col-xl-7 col-md-12 list__outer g-0">Column</div>
      <div class="col-xl-5 col-md-12 map__outer g-0">Column</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShopPage",
  mounted() {
    this.$emit("ChangePageCondition", "shop");
  },
  components: {},
  methods: {
    async fetch() {
      let id = "VaC1CdZkJrAkPjptQo15";
      let pass = "28qEX1tUfp";
      await axios
        .get("v1/search/local.json", {
          params: { query: "서울시 관악구 네일", display: 20 },
          headers: {
            Accept: "*/*",
            "X-Naver-Client-Id": id,
            "X-Naver-Client-Secret": pass,
          },
        })
        .then((response) => {
          // 실제 API를 요청한다/
          console.log(response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
$desktop-min-height: 750px;
$tablet-min-height: 400px;
$mobile-min-height: 300px;

.container {
  flex-wrap: wrap-reverse;
}
.list__outer {
  min-height: 750px;
  background: red;
  @include tablet {
    min-height: $tablet-min-height;
  }
  @include mobile-s {
    min-height: $mobile-min-height;
  }
}
.map__outer {
  min-height: 750px;
  background: blue;
  @include tablet {
    min-height: $tablet-min-height;
  }
  @include mobile-s {
    min-height: $mobile-min-height;
  }
}
</style>
