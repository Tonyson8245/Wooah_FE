<template>
  <div class="outline">
    <div class="container-lg p-lg-5 pt-lg-0">
      <div class="row d-flex justify-content-center align-items-center g-0">
        <div class="col-md-10">
          <banner :title="title" />
          <div class="monthlyart__container container">
            <region
              class="region"
              :fontSize="fontSize"
              :font="`color:#6545A4; `"
            />
            <router-view v-slot="{ Component }">
              <transition name="scale" mode="out-in">
                <component :is="Component" />
              </transition>
              <!-- router-transition -->
            </router-view>
          </div>
        </div>
      </div>
    </div>
    <div
      style="border-radius: 15px"
      class="modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content modal-body" style="padding: 0 0 0 0">
          <div
            class="container-fluid"
            style="
              display: flex;
              width: 100%;
              justify-content: space-evenly;
              align-items: stretch;
            "
          >
            <div style="width: 5%"></div>
            <div
              class="row"
              style="
                width: 80%;
                border-radius: 15px;
                overflow: hidden;
                background: #a862ea;
              "
            >
              <div class="col-lg-8 square" style="padding: 0 0 0 0">
                <PostImage
                  v-if="modal_post != ``"
                  class="content"
                  style="display: inline-block"
                  :post="modal_post"
                  :objectfit="`contain`"
                  :monthlyoff="true"
                />
                <!-- 모달의 이미지 -->
              </div>

              <div
                class="col-lg-4 ms-auto modal__content_outer"
                style="display: flex; flex-direction: column"
              >
                <div style="flex: 1"></div>
                <div class="modal__content_footer">
                  <div v-if="modal_post.monthly">
                    <i class="bi bi-coin monthly"></i>
                    <span class="modal__content_monthly_price">{{
                      modal_post.price
                    }}</span>
                  </div>
                  <div
                    class="modal__content_title"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    @click="ClickShop(modal_shop.id, $event)"
                  >
                    <span class="modal__content_name">
                      <span>{{ modal_shop.name }}</span> </span
                    ><i class="bi bi-arrow-right-circle"></i>
                  </div>
                  <div class="row modal__content_info g-0">
                    <div class="col-7">
                      <i class="bi bi-telephone"></i>{{ modal_shop.contact }}
                    </div>
                    <div class="col-5" v-if="modal_post.monthly_art">
                      <div class="d-flex">
                        <img
                          style="height: 1.2em; width: auto"
                          v-if="modal_post.price"
                          src="@/assets/icon/monthly_art_white.png"
                        />
                        <span class="ps-1">{{ modal_post.price }} </span>
                      </div>
                    </div>
                    <div class="col-12">
                      <i class="bi bi-geo-alt"></i>{{ modal_shop.address }}
                    </div>
                  </div>
                  <span
                    class="modal__content_tags"
                    v-for="tag in modal_post.tags"
                    :key="tag"
                    >#{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div style="width: 5%">
              <div class="modal__btn_close">
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref="close_btn"
                  @click="CloseModal"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "./BannerComponent.vue";
import region from "../Common/RegionComponent.vue";
import PostImage from "@/components/CollectionPage/PostImage.vue";

export default {
  name: `Monthlyart`,
  data() {
    return {
      fontSize: `btn-lg`,
    };
  },
  beforeUnmount() {
    if (this.modal_shop != "") {
      this.$refs.close_btn.click();
    }
    this.$store.commit("MonthlyartStore/resetPost");
  },
  computed: {
    title() {
      var title;
      if (this.$route.path == "/monthlyart") title = "monthlyart";
      else {
        switch (this.$route.params.price) {
          case `0`:
            title = this.$route.params.price / 10000 + `만원 미만`;
            break;
          default:
            title = this.$route.params.price / 10000 + `만원 대`;
            break;
        }
      } //  가격에 따라 배너 타이틀 변경
      return title;
    },
    modal_shop() {
      return this.$store.state.MonthlyartStore.shop;
    },
    modal_post() {
      return this.$store.state.MonthlyartStore.post;
    },
    path() {
      return this.$route.path;
    },
  },
  watch: {
    path(a, b) {
      if (this.modal_post != "") {
        this.$refs.close_btn.click();
        this.$router.push(b);
      }
    },
  },
  methods: {
    CloseModal() {
      this.Clicked_post_index = ``;
      this.$store.commit("MonthlyartStore/resetModal");
    },
    ClickShop(id) {
      this.$router.push("/shop/" + id + "/info");
    },
  },

  components: {
    banner,
    region,
    PostImage,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
//router transition
/* .scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease;
} */

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(1);
}

.monthlyart__container {
  font-family: "GoyangIlsan";
  padding-inline: 2%;
}
.region {
  text-align: right;
}
.outline {
  background: white;
  min-height: 1000px;
  @include mobile-s {
    min-height: 500px;
  }
}

//모달 시작
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
  background-color: $pl-2;

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
  font-size: 80%;
}
.modal__content_title {
  display: flex;
  align-items: center;
  font-size: 130%;
  @include mobile-s {
    font-size: 16px;
  }
}
.modal__content_name {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  font-weight: bold;
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
</style>
