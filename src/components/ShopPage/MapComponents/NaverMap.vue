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
      markers: [],
      infoWindows: [],
    };
  },

  mounted: function () {
    this.InitMap(37.42829747263545, 126.76620435615891);
    this.InitMarkers();
  },
  methods: {
    AnimateMarker(num) {
      if (this.markers.length > 0 && this.markers[num] != null) {
        this.markers[num].setAnimation(window.naver.maps.Animation.BOUNCE);
      }
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
      this.infoWindows.forEach((e) => {
        e.close();
      }); //마커와 윈도우 박스 끄기

      this.markers = [];
      this.infoWindows = [];

      this.shops.forEach((shop) => {
        console.log(shop);
        var infoWindow = new window.naver.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:10px;"><b>' +
            shop.name +
            "</b></div>",
          backgroundColor: "#eee",
          borderColor: "#a4a4a4",
          borderWidth: 1,
          anchorSkew: true,
          anchorColor: "#eee",
        });
        this.SetMarker(shop.latitude, shop.longitude, "");

        this.infoWindows.push(infoWindow);
      });

      //왜인지 모르겠지만 바로 this.를 걸면 안된다. for 문 안이라서 그런가
      var temp_markers = this.markers;
      var infoWindows = this.infoWindows;
      var temp_map = this.map;

      for (var i = 0, ii = temp_markers.length; i < ii; i++) {
        window.naver.maps.Event.addListener(
          temp_markers[i],
          "click",
          this.GetClickHandler(i, temp_markers, infoWindows, temp_map)
        );
      }
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
    //클릭 부분

    // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
    GetClickHandler(seq, markers, infoWindows, temp_map) {
      return function () {
        var marker = markers[seq],
          infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(temp_map, marker);
        }
      };
    },
  },
  computed: {
    shops() {
      return this.$store.state.ShopStore.shops;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/style.scss";
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
