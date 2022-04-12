<template>
  <div id="wrap" class="section">
    <div id="naverMap"></div>
  </div>
</template>

<script>
export default {
  name: "NaverMap",

  data() {
    return {
      map: null,
    };
  },

  mounted: function () {
    this.InitMap(37.42829747263545, 126.76620435615891);
  },
  methods: {
    InitMap(Lat, Lng) {
      this.map = new window.naver.maps.Map(
        document.getElementById("naverMap"),
        {
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.RIGHT_TOP,
          },
        }
      );
      var position = new window.naver.maps.LatLng(Lat, Lng);
      this.map.setCenter(position); // 중심 좌표 이동
    },
  },
};
</script>

<style>
.section {
  height: 100%;
  width: 100%;
  border: none;
}
#naverMap {
  /* min-height: auto; */
  height: 100%;
  width: 100%;
}
</style>
