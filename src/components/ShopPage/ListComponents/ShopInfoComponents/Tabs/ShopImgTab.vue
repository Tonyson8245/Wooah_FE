<template>
  <div class="outline">
    <div class="container-fluid row g-0 p-0">
      <div v-for="image in shopimages" :key="image" class="col-4 square">
        <img
          class="inner"
          :src="image.url"
          alt=""
          @click="
            Click(image.id);
            this.$gtag.event(`Click_design_` + image.id);
          "
        />
        <!-- <i class="bi bi-heart-fill monthly" v-if="image.monthly_art"></i> -->
        <img
          src="@/assets/icon/monthly_art.png"
          class="monthly"
          v-if="image.monthly_art"
        />
      </div>
    </div>
    <div
      style="text-align: center"
      class="pt-2"
      v-if="shopimages.length > 0 || !noResult"
    >
      <button
        v-if="noResult"
        @click="GetShopImage"
        class="btn btn-light"
        style="
          border: #e4e4e4 solid 1px;
          display: inline-block;
          margin: auto;
          outline: none !important;
          box-shadow: none;
        "
      >
        더보기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: `ShopImgTab`,
  data() {
    return {};
  },
  computed: {
    shopimages() {
      return this.$store.state.ShopStore.shopimg;
    },
    noResult() {
      return this.$store.state.ShopStore.noResult;
    },
  },
  mounted() {
    this.$store.commit("ShopStore/ResetImagePage");
    this.GetShopImage();
  },
  methods: {
    GetShopImage() {
      this.$store.dispatch("ShopStore/getShopImage", this.$route.params.id);
    },
    Click(id) {
      this.$router.push({ path: "/library/p/" + id });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
.square {
  width: 33.3%;
  position: relative;
  background: white;
  /* border-radius: 10%; */
}
.square .monthly {
  position: absolute;
  top: 3%;
  right: 3%;
  color: #ffbdf1;
  width: 15%;
  z-index: 1;
}
.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0.5%;
  /* border-radius: 10%; */
  /* border: solid #e1e1e1 1px; */
}
</style>
