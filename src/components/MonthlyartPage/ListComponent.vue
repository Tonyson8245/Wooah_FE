<template>
  <div class="outline">
    <div class="header d-flex justify-content-between">
      <span class="header__price_range">{{ thumbnail.price_range }}</span>
      <div class="more" v-if="width > 400">
        <span class="me-1">더보기</span><i class="bi bi-chevron-right"></i>
      </div>
    </div>
    <div class="body container">
      <div class="row">
        <div v-for="art in arts" :key="art" class="col-lg-3 col-sm-6 col-6 p-1">
          <ThumbnailComponent :art="art" />
        </div>
      </div>
    </div>
    <div v-if="!(width > 576)" class="footer">
      <div class="more_btn btn">
        <div style="display: block">더보기 <i class="bi bi-plus"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbnailComponent from "./ThumbnailComponent.vue";
export default {
  name: `ListComponent`,
  data() {
    return {
      arts: this.thumbnail.arts,
    };
  },
  props: {
    thumbnail: Object,
  },
  components: {
    ThumbnailComponent,
  },
  computed: {
    width() {
      return this.$store.state.CommonStore.width;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "/src/assets/style.scss";
.outline {
}
.header {
  width: 100%;
  height: auto;
  padding-inline: 1%;
  padding-bottom: 1%;
}
.header i {
  font-size: 1.3em;
  font-weight: bold;
}
.header .header__price_range {
  font-weight: bold;
  font-size: 1.4em;
}
.more {
  display: flex;
  align-items: center;
}

.body {
  width: 100%;
}
.more_btn {
  width: 100%;
  border: #e4e4e4 solid 1px;
  border-radius: 5px;
  background: #f4f4f4;
}
.footer {
  width: 100%;
  text-align: center;
  padding: 2% 1% 2% 1%;
}
</style>
