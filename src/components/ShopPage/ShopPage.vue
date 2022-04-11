<template>
  <div class="container-sm">
    <div class="row flex-row-reverse">
      <div class="col-xl-8 col-lg-8 col-sm-12 map__outer g-0">
        <div class="map"></div>
      </div>
      <div class="col-xl-4 col-lg-4 col-sm-12 list__outer g-0">
        list
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
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
$desktop-height: 750px;
$tablet-height: 400px;
$mobile-height: 300px;

.container {
  flex-wrap: wrap-reverse;
  padding-top: 2%;
  @include tablet {
    padding: 0 0 0 0;
  }
}
.list__outer {
  height: 750px;
  overflow-y: scroll;
  background: red;
  @include tablet {
    height: $tablet-height;
  }
  @include mobile-s {
    height: $mobile-height;
  }
}
.map__outer {
  height: 750px;
  background: blue;
  @include tablet {
    height: $tablet-height;
    max-height: 350px;
  }
  @include mobile-s {
    height: $mobile-height;
    max-height: 250px;
  }
}
.map {
  background: yellow;
}
</style>
