<template>
  <div id="wrap" class="section">
    <div id="naverMap"></div>
    <button @click="InitMarkers">112</button>
    <button @click="AnimateMarker(0)">클릭</button>
    <button @click="AnimateMarkerOff">클릭</button>
  </div>
</template>

<script>
import nail from "@/assets/img/nail.svg";
export default {
  name: "NaverMap",

  data() {
    return {
      map: null,
      markers: [],
    };
  },

  mounted: function () {
    this.InitMap(37.485525, 126.979118);
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
      this.markers = [];

      this.shops.forEach((shop) => {
        console.log(shop);
        this.SetMarker(shop.latitude, shop.longitude, "" ,shop.name);
      });
    },
    InitMap(Lat, Lng) {
      this.map = new window.naver.maps.Map(
        document.getElementById("naverMap"),
        {
          zoom: 12,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.RIGHT_TOP,
          },
          bounds: window.naver.maps.LatLngBounds.bounds(new window.naver.maps.LatLng(Lat,Lng),
                                              new window.naver.maps.LatLng(Lat, Lng))
        },
      );
      // var position = new window.naver.maps.LatLng(Lat, Lng);

      // this.map.setCenter(position); // 중심 좌표 이동
    },
    SetMarker(Lat, Lng, type ,name) {
      var marker = new window.naver.maps.Marker({
        title : name,
      });
      var position = new window.naver.maps.LatLng(Lat, Lng);
      marker.setIcon({
        content:"<div style='top: 100%;left: 50%;border: solid transparent;content: "+";height: 0;width: 0;position: absolute;pointer-events: none;border-color: rgba(204, 179, 18,0);border-top-color: #d5d5d5;border-width: 1.0em;margin-left: -1.0em;'></div>"+

        "<div style='border-radius: 2em;position: relative;background: #ffffff;border: 0.25em solid #d5d5d5;width:200px; height:60px; display: flex; align-items: center;'>"+ 
        "<div style='border-radius:50%;padding:5%;height:45px;width:45px; margin-left:5px;background:#d5d5d5'><img src=" + nail + " style='height:100%;'/></div><span style='margin:auto; '>" +  name  + 
        "</span></div>"+

        "<div style='top: 80%;left: 50%;border: solid transparent;content: "+";height: 0;width: 0;position: absolute;pointer-events: none;	border-color: rgba(255, 122, 117, 0);border-top-color: #ffffff;border-width: 1.4em;margin-left: -1.4em;'></div>",

        // size: window.naver.maps.Size(30, 39),
        // scaledSize: window.naver.maps.Size(30, 39),
        origin: window.naver.maps.Point(0, 0),
        anchor: window.naver.maps.Point(0, 0),
        // anchor: window.naver.maps.Point(83, 83),
      });
      
      marker.setMap(this.map);
      this.markers.push(marker);
      marker.setPosition(position);
    },
    

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
