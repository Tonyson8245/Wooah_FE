<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      :style="css + font"
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
  props: {
    font: String,
  },
  mounted() {},
  computed: {
    districtData() {
      return this.$store.state.CommonStore.districtData;
    },
    region() {
      var text;
      var data = this.$store.state.CommonStore.districtData;
      if (data.length > 0) {
        var sigungu = this.$store.state.CommonStore.sigungu;
        var sido = this.$store.state.CommonStore.sido;

        var sigunguName, sidoName;

        if (sigungu != 0) {
          sigunguName = data[sido - 1].sigungu[sigungu - 1].name;
          sidoName = data[sido - 1].name;

          text = sidoName + ` ` + sigunguName;
        } else {
          sidoName = data[sido - 1].name;

          text = sidoName + ` 전체`;
        }
      } else text = "서울특별시 전체";

      this.$store.commit("CommonStore/setDistricttext", text);
      return text;
    },
    fontSize() {
      if (this.$store.state.CommonStore.width > 767) return `btn-lg`;
      else return ``;
    },
  },
  watch: {},
  methods: {
    changeDistrict(sido, sigungu) {
      this.$store.commit("CommonStore/SetDistrict", [sido, sigungu]);
      this.$store.commit("CommonStore/setUpdateDistrict", true);
      if (sigungu == 0)
        this.$emit("changeDistrict", { sido: sido.id, sigungu: 0 });
      else this.$emit("changeDistrict", { sido: sido.id, sigungu: sigungu.id });
    },
  },
};
</script>
