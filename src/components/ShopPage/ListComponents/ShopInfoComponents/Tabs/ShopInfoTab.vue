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
        <div v-if="ShopData.contacts.phone != null">
          <img src="../../../../../../src/assets/img/telephone.png" alt="" />
          <a v-bind:href="`tel:+82.` + ShopData.contacts.phone">{{
            ShopData.contacts.phone
          }}</a>
        </div>
        <div v-if="ShopData.contacts.kakao_id != null">
          <img src="../../../../../../src/assets/img/kakao-talk.png" alt="" />
          {{ ShopData.contacts.kakao_id }}
        </div>
        <div v-if="ShopData.contacts.kakao_openchat != null">
          <img src="../../../../../../src/assets/img/kakao-talk.png" alt="" />
          {{ ShopData.contacts.kakao_openchat }}
        </div>
        <div v-if="ShopData.contacts.instagram != null">
          <img src="../../../../../../src/assets/img/instagram.png" alt="" />
          <a target="_blank" v-bind:href="ShopData.contacts.instagram">{{
            ShopData.contacts.instagram
          }}</a>
        </div>
        <div v-if="ShopData.contacts.blog != null">
          <img src="../../../../../../src/assets/img/blogging.png" alt="" />
          <a target="_blank" v-bind:href="ShopData.contacts.blog">{{
            ShopData.contacts.blog
          }}</a>
        </div>
        <div v-if="ShopData.contacts.site != null">
          <img src="../../../../../../src/assets/img/blogging.png" alt="" />
          <a target="_blank" v-bind:href="ShopData.contacts.site">{{
            ShopData.contacts.site
          }}</a>
        </div>
      </div>
    </div>
    <div class="p-2">
      <div class="title">영업시간</div>
      <div class="content p-1">
        <div class="mb-2">
          <span
            class="badge bg-secondary me-2"
            v-if="!ShopData.has_holiday_off"
          >
            연중무휴
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
  mounted() {
    console.log(this.ShopData); //
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
.content img {
  padding: 2% 1% 2% 2%;
  @include desktop {
    width: 25px;
  }
}
.content .work_hour {
  font-size: 0.9em;
}
.content .day {
  font-weight: bold;
}
a {
  margin-left: 1.6%;
}
</style>
