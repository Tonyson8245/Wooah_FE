<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      :style="css"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :class="fontSize"
    >
      {{ region }}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <template v-for="(sido, i) in districtData" :key="i">
        <span class="dropdown-header">{{ sido.name }}</span>
        <a class="dropdown-item" @click="changeDistrict(sido, 0)"> 전체 </a>
        <a
          v-for="sigungu in districtData[i].sigungu"
          :key="sigungu"
          class="dropdown-item"
          @click="changeDistrict(sido, sigungu)"
          >{{ sigungu.name }}</a
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: `RegionComponent`,

  data() {
    return {
      css: "outline: none !important; box-shadow: none;",
    };
  },
  mounted() {},
  computed: {
    districtData() {
      return this.$store.state.CommonStore.districtData;
    },
    region() {
      var data = this.$store.state.CommonStore.districtData;
      if (data.length > 0) {
        var sigungu = this.$store.state.CommonStore.sigungu;
        var sido = this.$store.state.CommonStore.sido;

        var sigunguName, sidoName;

        if (sigungu != 0) {
          sigunguName = data[sido - 1].sigungu[sigungu - 1].name;
          sidoName = data[sido - 1].name;

          return sidoName + ` ` + sigunguName;
        } else {
          sidoName = data[sido - 1].name;

          return sidoName + ` 전체`;
        }
      } else return "서울특별시 전체";
    },
    fontSize() {
      if (this.$store.state.CommonStore.width > 767) return `btn-lg`;
      else return ``;
    },
  },
  methods: {
    changeDistrict(sido, sigungu) {
      this.$store.commit("CommonStore/SetDistrict", [
        sido,
        sigungu,
        Math.random(),
      ]);
    },
  },
};
</script>
