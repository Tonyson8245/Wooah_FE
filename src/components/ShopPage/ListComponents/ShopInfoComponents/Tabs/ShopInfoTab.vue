<template>
  <div class="outline">
    <div class="p-2">
      <div class="title">샵 소개</div>
      <div class="content p-2">
        {{ ShopData.introduction }}
      </div>
    </div>
    <div class="p-2">
      <div class="title">주소</div>
      <div class="content p-2">{{ ShopData.address }}</div>
    </div>
    <div class="p-2">
      <div class="title">연락처</div>
      <div class="content pt-2">
        <div class="line" v-if="ShopData.contacts.phone != null">
          <img src="../../../../../../src/assets/img/telephone.png" alt="" />
          <a
            v-bind:href="`tel:+82.` + ShopData.contacts.phone"
            @click="
              this.$gtag.event(`Click_contact_` + this.shopid);
              this.$gtag.event(`Click_contact_phone`);
            "
            >{{ ShopData.contacts.phone }}</a
          >
        </div>
        <div class="line" v-if="ShopData.contacts.kakao_id != null">
          <img src="../../../../../../src/assets/icon/카카오톡ID.png" alt="" />
          {{ ShopData.contacts.kakao_id }}
        </div>
        <div class="line" v-if="ShopData.contacts.kakao_chat != null">
          <img
            src="../../../../../../src/assets/icon/카카오톡Chat.png"
            alt=""
          />
          <a
            target="_blank"
            v-bind:href="ShopData.contacts.kakao_chat"
            @click="
              this.$gtag.event(`Click_contact_` + this.shopid);
              this.$gtag.event(`Click_contact_kakao_chat`);
            "
            >{{ ShopData.contacts.kakao_chat }}</a
          >
        </div>
        <div class="line" v-if="ShopData.contacts.instagram != null">
          <img src="../../../../../../src/assets/icon/instagram.svg" alt="" />
          <a
            target="_blank"
            v-bind:href="ShopData.contacts.instagram"
            @click="
              this.$gtag.event(`Click_contact_` + this.shopid);
              this.$gtag.event(`Click_contact_instagram`);
            "
            >{{ ShopData.contacts.instagram }}</a
          >
        </div>
      </div>
    </div>
    <div class="p-2">
      <div class="title">영업시간</div>
      <div class="content p-1">
        <div class="mb-2">
          <span
            class="badge bg-secondary me-2"
            v-if="ShopData.holiday != `알수없음`"
          >
            {{ ShopData.holiday }}
          </span>
          <span v-if="ShopData.day_off != null">{{ ShopData.day_off }}</span>
        </div>
        <table>
          <tr
            class="work_hour"
            v-for="(work_hour, day) in ShopData.work_hours"
            :key="work_hour"
          >
            <td>
              <span class="day">{{ day.toUpperCase() }}</span>
            </td>
            <td>
              <span class="hour m-4">{{ work_hour }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ShopInfoTab`,
  props: {
    ShopData: Object,
  },
  computed: {
    shopid() {
      return this.$route.params.id;
    },
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
}

.title {
  font-size: 120%;
  font-weight: bold;
}
.content {
  font-size: 100%;
  white-space: pre-wrap;
}
.content img {
  padding: 2% 1% 2% 2%;
  width: 2.1em;
}
.content .work_hour {
  font-size: 100%;
}
.content .day {
  font-weight: bold;
}
a {
  margin-left: 1.6%;
}
.content .line {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
}
</style>
