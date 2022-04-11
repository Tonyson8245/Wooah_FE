<template>
  <AlertDialog />
  <!-- <div>{{ $route.params.id }}</div> -->
  <div class="outer" v-if="!noPost">
    <div class="modal__parent">
      <div class="modal__child row">
        <div class="col-lg-8 col-md-12 img_container content shadow-sm">
          <img
            :src="post.url"
            class="content square"
            alt="..."
            style="display: inline-block"
          />
        </div>
        <div class="col-lg-4 col-md-12 content_container">
          <div class="modal__content_outer">
            <div v-if="post.monthly_art">
              <i class="bi bi-coin monthly"></i>
              <span class="modal__content_monthly_price">{{ post.price }}</span>
            </div>
            <div class>
              <span class="modal__content_name">
                <span>{{ shop.name }}</span>
                <i class="bi bi-arrow-right-circle" style="margin-left: 1%"></i>
              </span>
            </div>
            <span class="modal__content_info">
              <span><i class="bi bi-telephone"></i> {{ shop.contact }} </span>
              <span><i class="bi bi-geo-alt"></i> {{ shop.address }} </span>
              <span v-if="post.monthly_art"
                ><br /><i class="bi bi-coin"></i> {{ post.price }} 원 <br
              /></span>
            </span>
            <div>
              <span
                style="white-space: pre"
                class="modal__content_tags"
                v-for="tag in post.tags"
                :key="tag"
                >#{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn__parent">
      <div class="btn__child">
        <button class="btn btn-secondary btn-sm btn-large" @click="ClickMore">
          더 많은 디자인 구경해보기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDialog from "../Common/AlertDialog.vue";
export default {
  name: `DetailPage`,
  data() {
    return {};
  },
  mounted() {
    this.$emit("ChangePageCondition", "collection");
    this.$store.dispatch("collectionStore/fetchPost", this.$route.params.id);
  },
  computed: {
    noPost() {
      return this.$store.state.collectionStore.noPost;
    },
    post() {
      return this.$store.state.collectionStore.post;
    },
    shop() {
      return this.$store.state.collectionStore.shop;
    },
    dialogState() {
      return this.$store.state.alertStore.dialogState;
    },
  },
  components: {
    AlertDialog,
  },
  watch: {
    noPost(state) {
      if (state) {
        this.$store.commit("alertStore/ChangeState");
        this.$store.commit(
          "alertStore/ChangeComment",
          "존재하지 않는 페이지입니다.."
        );
      }
    },
    dialogState(state) {
      if (!state) {
        this.$router.push({ path: "/library" });
      }
    },
  },
  methods: {
    ClickMore() {
      this.$router.push({ path: "/library" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.outer {
  margin-top: 2%;
  height: auto;
  width: 100%;
  padding: 0 10% 0 10%;

  @include mobile-s {
    padding: 0 0 0 0;
  }
}

.modal__parent {
  width: 100%;
  padding-bottom: 64%;
  position: relative;
  @include tablet {
    padding-bottom: 130%;
  }
}
.modal__child {
  position: absolute;
  top: 0;
  left: 2%;
  font-size: 15px;
  width: 100%;
  height: 100%;
  font-family: "GoyangIlsan";
  @include tablet {
    left: 2%;
    height: 100%;
  }
}
.modal__child .img_container {
  padding: 0 0 0 0;
  border: #d4d4d4 solid 0.3px;
  background: #f1f1f1;
  @include tablet {
    height: 75%;
  }
}

.modal__child .content_container {
  border: #d4d4d4 solid 0.3px;
  border-width: 0.3px 0.3px 0.3px 0px;
  background: white;
  @include tablet {
    height: 25%;
    border-width: 0px 0.3px 0.3px 0.3px;
  }
}
.content {
  height: 100%;
  text-align: center;
  object-fit: contain;
}
.square {
  position: relative;
  width: 100%;
  background-color: #f1f1f1;
  @include tablet {
    width: 100%;
    left: 0px;
  }
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.btn__parent {
  display: flex;
  align-items: center;
  text-align: center;
  height: 20%;
}
.btn__child {
  margin: auto;
  width: 100%;
}

.btn__child .btn {
  background: #c4c4c4;
  border: none;
  color: black;
  font-size: 18px;
  font-family: "GoyangIlsan";
  width: 38%;
  margin: 5% 0 5% 0;
  @include tablet {
    font-size: 12px;
    width: 55%;
  }
  @include mobile-s {
    font-size: 11px;
    width: 55%;
  }
}

.modal__content_outer {
  height: auto;
  position: absolute;
  bottom: 0;
  margin-bottom: 3%;
  font-size: 0.8vw;
  @include tablet {
    position: unset;

    font-size: 2vw;
    margin-top: 3%;
  }
  @include mobile-s {
    font-size: 2vw;
  }
}
.modal__content_monthly_price {
  margin-left: 0.5em;
  font-size: 1em;
}
.modal__content_name {
  font-size: 1.5em;
  font-weight: bold;
}
.modal__content_info {
  font-size: 1em;
}
.modal__content_info span {
  margin-right: 5%;
}
.modal__content_tags {
  font-size: 1em;
  margin-right: 0.5em;
}
.noPost {
  font-family: "GoyangIlsan";
  width: 100%;
  flex-direction: column;
  height: 400px;
  position: relative;
  text-align: center;
  @include mobile-s {
    font-size: 11px;
  }
}
</style>
