<template>
  <div class="outline">
    <div class="header d-flex justify-content-between align-items-center">
      <span class="header__price_range"
        >{{ thumbnail.price_range }}만원 대</span
      >
      <div
        class="more d-none d-lg-block"
        @click="clickMore(thumbnail.price_range)"
      >
        <span class="me-1 pe-click">더보기</span
        ><i class="bi bi-chevron-right"></i>
      </div>
    </div>
    <div class="body container">
      <div class="row">
        <div
          v-for="art in arts"
          :key="art"
          class="col-lg-3 col-md-3 col-sm-3 col-6 p-1"
        >
          <ThumbnailComponent :art="art" :toggle="true" />
        </div>
      </div>
    </div>
    <div class="footer d-lg-none">
      <div class="more_btn btn">
        <div style="display: block" @click="clickMore(thumbnail.price_range)">
          더보기 <i class="bi bi-plus"></i>
        </div>
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
  methods: {
    clickMore(data) {
      this.$router.push({ path: "/monthlyart/" + data * 10000 });
    }, // 더보기
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
  margin-bottom: 5%;
  @include tablet {
    font-size: 80%;
  }
  @include mobile-s {
    font-size: 60%;
  }
}
.header {
  width: 100%;
  height: auto;
  padding-inline: 0.5%;
  padding-bottom: 0.5%;
}
.header i {
  font-size: 1.1em;
  font-weight: bold;
}
.header .header__price_range {
  font-weight: bold;
  font-size: 1.2em;
}
.more {
  display: flex;
  align-items: center;
  color: $pa;
}

.body {
  width: 100%;
}
.more_btn {
  width: 100%;
  color: $pa;
  border: $pl-4 solid 1px;
  border-radius: 5px;
  background: $pl-4;

  @include mobile-s {
    font-size: 60%;
  }
}
.footer {
  width: 100%;
  text-align: center;
  padding: 2% 1% 2% 1%;
}
</style>
