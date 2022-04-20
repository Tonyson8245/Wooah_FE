<template>
  <div class="outline" v-if="ShopData != null">
    <div class="p-3">
      <div v-if="ShopData.has_deposit">
        <div class="container-fluid row p-0 mb-1">
          <div class="col-5 title ps-4" style="text-align: left">예약금</div>
          <div class="col-7 content" style="text-align: right">
            {{ ShopData.deposit }}원
          </div>
        </div>
      </div>
      <div class="title">가격 정보</div>
      <div class="content">
        <div v-for="(i, type) in ShopData.menu" :key="type" class="menu">
          <div v-if="type == `hand`" class="container-fluid row p-0 mb-1">
            <div class="col-3 type">손</div>
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
          <div v-if="type == `foot`" class="container-fluid row p-0 mb-1">
            <div class="col-3 type">발</div>
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
          <div
            v-if="type == `monthly_art`"
            class="container-fluid row p-0 mb-1"
          >
            <div class="col-4 type">이달의 아트</div>
            <div class="col-8">
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
  font-size: 1.2em;
  @include desktop {
    font-size: 90%;
  }
}

.title {
  font-weight: bold;
}
.content {
  font-size: 0.88em;
}
.content .menu {
  white-space: nowrap;
  font-size: 0.9em;
}
.menu .type {
  text-align: center;
  @include tablet {
    text-align: right;
  }
}
</style>
