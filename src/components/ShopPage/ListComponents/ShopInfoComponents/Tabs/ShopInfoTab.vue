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
        <div v-if="ShopData.contact.phone != null">
          <img src="../../../../../../src/assets/img/telephone.png" alt="" />
          {{ ShopData.contact.phone }}
        </div>
        <div v-if="ShopData.contact.kakao_id != null">
          <img src="../../../../../../src/assets/img/kakao-talk.png" alt="" />
          {{ ShopData.contact.kakao_id }}
        </div>
        <div v-if="ShopData.contact.kakao_openchat != null">
          <img src="../../../../../../src/assets/img/kakao-talk.png" alt="" />
          {{ ShopData.contact.kakao_openchat }}
        </div>
        <div v-if="ShopData.contact.instagram != null">
          <img src="../../../../../../src/assets/img/instagram.png" alt="" />
          <a href="{{ ShopData.contact.instagram }}">{{
            ShopData.contact.instagram
          }}</a>
        </div>
        <div v-if="ShopData.contact.blog != null">
          <img src="../../../../../../src/assets/img/blogging.png" alt="" />
          <a href="{{ ShopData.contact.blog }}">{{ ShopData.contact.blog }}</a>
        </div>
        <div v-if="ShopData.contact.site != null">
          <img src="../../../../../../src/assets/img/blogging.png" alt="" />
          <a href="{{ ShopData.contact.site }}">{{ ShopData.contact.site }}</a>
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
