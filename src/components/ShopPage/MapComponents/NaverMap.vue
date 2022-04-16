<template>
  <div id="wrap" class="section">
    <div id="naverMap"></div>
    <button @click="InitMarkers">112</button>
    <button @click="AnimateMarker(0)">클릭</button>
    <button @click="AnimateMarkerOff">클릭</button>
  </div>
</template>

<script>
import contact_pin from "@/assets/img/contact_pin.svg";
import non_pin from "@/assets/img/non_pin.svg";
export default {
  name: "NaverMap",

  data() {
    return {
      map: null,
      time: 0.01,
      markers: [],
    };
  },

  mounted: function () {
    this.InitMap(37.42829747263545, 126.76620435615891);
  },
  methods: {
    AnimateMarker(num) {
      if (this.markers[num] != null)
        this.markers[num].setAnimation(window.naver.maps.Animation.BOUNCE);
    },
    AnimateMarkerOff() {
      this.markers.forEach((element) => {
        element.setAnimation(null);
      });
    },
    InitMarkers() {
      this.markers.forEach((e) => {
        e.setMap(null);
      });
      this.markers = [];
      this.SetMarker(37.42829741263545 + this.time, 126.71620435615891, "제휴");
      this.SetMarker(37.42829741263545 + this.time, 126.78620435615891, "");
      this.time += 0.01;
    },
    InitMap(Lat, Lng) {
      this.map = new window.naver.maps.Map(
        document.getElementById("naverMap"),
        {
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.RIGHT_TOP,
          },
        }
      );
      var position = new window.naver.maps.LatLng(Lat, Lng);

      this.map.setCenter(position); // 중심 좌표 이동
    },
    SetMarker(Lat, Lng, type) {
      var marker = new window.naver.maps.Marker();
      var position = new window.naver.maps.LatLng(Lat, Lng);
      if (type === "제휴") {
        marker.setIcon({
          url: contact_pin,
          size: new window.naver.maps.Size(30, 39),
          scaledSize: new window.naver.maps.Size(30, 39),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(12, 34),
        });
      } else {
        marker.setIcon({
          url: non_pin,
          size: new window.naver.maps.Size(30, 39),
          scaledSize: new window.naver.maps.Size(30, 39),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(12, 34),
        });
      }
      marker.setMap(this.map);
      this.markers.push(marker);
      marker.setPosition(position);
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
