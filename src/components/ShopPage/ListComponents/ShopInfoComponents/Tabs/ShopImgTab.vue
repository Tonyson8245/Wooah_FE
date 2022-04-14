<template>
  <div class="outline">
    <div class="container-fluid row g-0 p-0">
      <div v-for="image in shopimages" :key="image" class="col-4 square">
        <img class="inner" :src="image.url" alt="" />
        <i class="bi bi-heart-fill monthly" v-if="image.monthly_art"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ShopImgTab`,
  computed: {
    shopimages() {
      return this.$store.state.ShopStore.shopimg;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
.square {
  width: 33.3%;
  position: relative;
  background: white;
  border-radius: 5%;
}
.square .bi {
  position: absolute;
  top: 3%;
  right: 5%;
  color: #ffbdf1;
  font-size: 20px;
  z-index: 1;
  @include tablet {
    font-size: 18px;
  }
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
  border-radius: 5%;
  border: solid #e1e1e1 1px;
}
</style>
