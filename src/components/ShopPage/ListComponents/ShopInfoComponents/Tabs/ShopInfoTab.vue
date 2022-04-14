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
        <div v-for="contact in ShopData.contacts" :key="contact">
          <img
            v-if="contact.type === `PHONE`"
            src="../../../../../../src/assets/img/telephone.png"
            alt=""
          />
          <img
            v-if="contact.type === `KAKAO_OPENCHAT`"
            src="../../../../../../src/assets/img/kakao-talk.png"
            alt=""
          />
          <img
            v-if="contact.type === `INSTAMGRAM`"
            src="../../../../../../src/assets/img/instagram.png"
            alt=""
          />
          <img
            v-if="contact.type === `BLOG`"
            src="../../../../../../src/assets/img/blogging.png"
            alt=""
          />
          {{ contact.content }}
        </div>
      </div>
    </div>
    <div class="p-2">
      <div class="title">영업시간</div>
      <div class="content p-2">
        <div
          class="work_hour"
          v-for="work_hour in ShopData.work_hours"
          :key="work_hour"
        >
          <span class="day">{{ work_hour.day }}</span>
          <span class="hour">{{ work_hour.hour }}</span>
        </div>
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
  margin-right: 3%;
  font-weight: bold;
}
</style>
