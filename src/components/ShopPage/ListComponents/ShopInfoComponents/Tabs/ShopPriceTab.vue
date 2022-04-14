<template>
  <div class="outline">
    <div class="p-3">
      <div class="title">가격 정보</div>
      <div class="content">
        <div v-for="(i, type) in ShopData.menu" :key="type" class="menu">
          <div v-if="type == `hand`" class="container-fluid row p-0 mb-1">
            <div class="col-3 type">손</div>
            <div class="col-9">
              <div
                v-for="menu in ShopData.menu.hand"
                :key="menu"
                class="d-flex justify-content-center"
              >
                <span class="menu_name">{{ menu.name }}</span
                ><span class="menu_price">{{ menu.price }}원</span>
              </div>
            </div>
          </div>
          <div v-if="type == `foot`" class="container-fluid row p-0 mb-1">
            <div class="col-3 type">발</div>
            <div class="col-9">
              <div
                v-for="menu in ShopData.menu.foot"
                :key="menu"
                class="d-flex justify-content-center"
              >
                <span class="menu_name">{{ menu.name }}</span
                ><span class="menu_price">{{ menu.price }}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 container-fluid row" v-if="ShopData.has_deposite">
      <div class="col-4 title">이달의 아트</div>
      <div class="col-8 monthly_price">{{ ShopData.deposite }}원</div>
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
  font-size: 1.1em;
}
.menu .type {
  text-align: center;
}
.menu_name {
  margin-left: auto;
  margin-right: auto;
}
.monthly_price {
  width: auto;
  margin-left: auto;
}
</style>
