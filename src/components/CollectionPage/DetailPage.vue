<template>
  <div class="back">
    <AlertDialog />
    <div class="outer" v-if="!noPost">
      <div
        class="container-fluid p-md-0"
        style="
          display: flex;
          width: 100%;
          justify-content: space-evenly;
          align-items: stretch;
        "
      >
        <div class="row">
          <div class="col-lg-8 square" style="padding: 0 0 0 0">
            <PostImage
              v-if="post != ``"
              class="content"
              style="display: inline-block"
              :post="post"
              :objectfit="`contain`"
            />
            <!-- 모달의 이미지 -->
          </div>
          <div
            class="col-lg-4 modal__content_outer"
            style="display: flex; flex-direction: column"
          >
            <div style="flex: 1"></div>
            <div class="modal__content_footer">
              <div v-if="post.monthly">
                <i class="bi bi-coin monthly"></i>
                <span class="modal__content_monthly_price">{{
                  post.price
                }}</span>
              </div>
              <div
                class="modal__content_title"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="ClickShop(shop.id, $event)"
              >
                <span class="modal__content_name pe-2 fw-bold d-flex">
                  <span>{{ shop.name }}</span> </span
                ><i class="bi bi-arrow-right-circle"></i>
              </div>
              <!-- <div class="row modal__content_info g-0">
                <div class="col-7">
                  <i class="bi bi-telephone"></i>{{ shop.contact }}
                </div>
                <div class="col-5" v-if="post.monthly_art">
                  <i class="bi bi-coin"></i>{{ post.price }} 원
                </div>
                <div class="col-12">
                  <i class="bi bi-geo-alt"></i>{{ shop.address }}
                </div>
              </div> -->
              <div class="row modal__content_info g-0">
                <i class="bi bi-telephone"
                  ><span class="ps-1">{{ shop.contact }}</span></i
                >
                <i class="bi bi-coin"
                  ><span class="ps-1">{{ post.price }}</span>
                </i>
                <i class="bi bi-geo-alt"
                  ><span class="ps-1">{{ shop.address }}</span></i
                >
              </div>
              <span
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
import img from "@/assets/img/400x400.png";
import AlertDialog from "../Common/AlertDialog.vue";
import PostImage from "@/components/CollectionPage/PostImage.vue";
export default {
  name: `DetailPage`,
  data() {
    return { error: false, updated: false };
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
  unmounted() {
    this.$store.commit("collectionStore/setPost", "");
  },
  components: {
    AlertDialog,
    PostImage,
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
    onImgLoad() {
      this.isLoaded = "visible";

      if (!this.error) {
        this.error = false;
        this.updated = false;
      }
    },
    onError(e) {
      this.error = true;
      e.target.src = img; //어차피 오류나면 클릭해서 모달이 뜨지 않을테니, 그냥 새로고침하게 하자
      e.target.setAttribute(`data-bs-toggle`, "");
    },
    onClick(e, url) {
      if (this.error) {
        e.src = url + `?` + this.index + new Date().getTime();
        this.error = false;
      }
    },
    ClickShop(id) {
      this.$router.push("/shop/" + id + "/info");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.outer {
  height: auto;
  width: 100%;
  padding: 2% 10% 0 10%;
  @include tablet-s {
    padding: 2%;
  }
}

//모달 시작
.row {
  background-color: $pl-2;
  border: solid $pl-2 1px;
  border-radius: 15px;
  overflow: hidden;
  width: 70%;
  @include tablet-s {
    width: 100%;
  }
}
.square {
  position: relative;
  width: 66.6%;
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

.content {
  position: absolute !important;
  margin: 0 0 0 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}

.modal__btn_close {
  font-size: 2em;
  float: right;
  position: absolute;
  bottom: 95%;
  right: 3%;
  @include tablet {
    font-size: 1em;
  }
  @include mobile-s {
    font-size: 1em;
  }
}
.modal__btn_right {
  color: $pl-4;
  font-size: 1.5em;
  position: absolute;
  bottom: 50%;
  @include mobile-s {
    font-size: 80%;
  }
}
.modal__btn_left {
  color: $pl-4;
  font-size: 1.5em;
  position: absolute;
  bottom: 50%;
  @include mobile-s {
    font-size: 80%;
  }
}
.modal-body {
  all: none;
  height: 200%;
  padding: 0 0 0 0;
}
.modal-content {
  background: rgba(0, 0, 0, 0) !important;
  border: rgba(0, 0, 0, 0) !important;
}
.modal__content_footer {
  color: white;
  font-family: "GoyangIlsan";
  position: relative;
  @include tablet {
    top: 0%;
  }
}
.modal__content_outer {
  padding: 2%;

  font-size: 1em;
  @include desktop {
    font-size: 0.8em;
  }
  @include tablet {
    padding: 5%;
  }
}
.modal__content_monthly_price {
  font-size: 100%;
}
.modal__content_title {
  display: flex;
  align-items: center;
  font-size: 150%;
  @include mobile-s {
    font-size: 16px;
  }
}
.modal__content_name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.modal__content_info {
  font-size: 80%;
  margin-top: 3%;
  @include tablet {
    margin-top: 0%;
  }
}
.modal__content_info .bi {
  margin-right: 0.5em;
}
.modal__content_tags {
  font-size: 80%;
  margin-right: 0.5em;
}

//모달 끝
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
  background: $pl-1;
  border: none;
  color: white;
  font-size: 18px;
  font-family: "GoyangIlsan";
  width: 38%;
  margin: 2% 0 5% 0;
  @include tablet {
    font-size: 12px;
    width: 55%;
  }
  @include mobile-s {
    font-size: 11px;
    width: 55%;
  }
}
</style>
