<template>
  <div class="outline" v-if="ShopData != null">
    <h6 class="text-center">
      회원 및 비회원 가격관련 문의는 네일샵으로 해주세요!
    </h6>
    <div>
      <div v-if="ShopData.has_deposit">
        <div class="container-fluid row p-0 mb-1">
          <div class="col-3 title" style="text-align: left">예약금</div>
          <div class="col-9 content" style="text-align: right">
            {{ ShopData.deposit }}원
          </div>
        </div>
      </div>

      <div class="container-fluid row p-0 m-0"></div>
      <div class="content">
        <div v-for="(i, type) in ShopData.menu" :key="type" class="menu">
          <div v-if="type == `hand`" class="container-fluid row p-0 mb-4">
            <div class="col-3 title">가격 정보</div>
            <div class="col-9"></div>
            <div class="pb-3"></div>
            <div class="col-3 type border-end">손</div>
            <div class="col-9">
              <div v-for="menu in ShopData.menu.hand" :key="menu" class="pb-3">
                <div class="d-flex justify-content-between">
                  <span class="menu_name flex-grow-1">{{ menu.name }}</span
                  ><span class="menu_price">{{ menu.price }}원</span>
                </div>
                <span class="menu_price">{{ menu.option }}</span>
              </div>
            </div>
          </div>
          <div v-if="type == `foot`" class="container-fluid row p-0 mb-4">
            <div class="col-3 type border-end">발</div>
            <div class="col-9">
              <div v-for="menu in ShopData.menu.foot" :key="menu" class="pb-3">
                <div class="d-flex justify-content-between">
                  <span class="menu_name flex-grow-1">{{ menu.name }}</span
                  ><span class="menu_price">{{ menu.price }}원</span>
                </div>
                <span class="menu_price">{{ menu.option }}</span>
              </div>
            </div>
          </div>
          <div v-if="type == `etc`" class="container-fluid row p-0 mb-4">
            <div class="col-3 type border-end">기타</div>
            <div class="col-9">
              <div v-for="menu in ShopData.menu.etc" :key="menu" class="pb-3">
                <div class="d-flex justify-content-between">
                  <span class="menu_name flex-grow-1">{{ menu.name }}</span
                  ><span class="menu_price">{{ menu.price }}원</span>
                </div>
                <span class="menu_price">{{ menu.option }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="type == `monthly_art`"
            class="container-fluid row p-0 mb-4"
          >
            <div class="col-3 type border-end p-0">이달의 아트</div>
            <div class="col-9 mb-2">
              <div
                v-for="menu in ShopData.menu.monthly_art"
                :key="menu"
                style="text-align: right"
              >
                <span class="menu_name"></span
                ><span class="menu_price">{{ menu }}원</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="ShopData.menu.notice"
          class="container-fluid row g-1"
          style="white-space: pre-wrap"
        >
          <h5>공지사항</h5>
          <div
            style="border: solid 1px #6545a4; border-radius: 15px"
            class="p-2"
          >
            {{ ShopData.menu.notice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ShopPriceTab`,
  props: {
    ShopData: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
.outline {
  font-family: "GoyangIlsan";
  font-size: 1em;
  @include desktop {
    font-size: 90%;
  }
  @include tablet {
    font-size: 2vw;
  }
}

.title {
  font-size: 120%;
  text-align: center;
  font-weight: bold;
}
.content {
  font-size: 100%;
}
.content .menu {
  white-space: nowrap;
  font-size: 0.9em;
}
.menu .type {
  text-align: center;
}
</style>
