<template>
  <div id="wrap" class="section">
    <div id="naverMap"></div>
  </div>
</template>

<script>
/*global naver*/
import nail from "@/assets/img/nail.svg";

export default {
  name: "NaverMap",

  data() {
    return {
      map: null,
      markers: [],
      media: "desktop",
      anchor: [100, 60],
    };
  },
  props: {
    width: Number,
  },
  mounted: function () {
    if (window.naver && window.naver.maps) {
      this.SetMedia();
      this.InitMap(37.485525, 126.979118);
    } else {
      const script = document.createElement("script");
      script.onload = () => naver.maps.load(this.initMap);
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ggfrhn6ovz";
      document.head.appendChild(script);
    }
  },
  methods: {
    AnimateMarker(num) {
      if (this.markers.length > 0 && this.markers[num] != null) {
        this.markers[num].setAnimation(naver.maps.Animation.BOUNCE);
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
        this.SetMarker(shop.latitude, shop.longitude, "", shop.name);
      });
    },
    InitMap(Lat, Lng) {
      this.map = new naver.maps.Map(document.getElementById("naverMap"));
      if (this.media == "desktop") {
        this.map.setOptions({
          minZoom: 14,
          maxZoom: 21,
          zoom: 14,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
      } else {
        this.map.setOptions({
          minZoom: 14,
          maxZoom: 21,
          zoom: 14,
          zoomControl: false,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
      }
      var position = new naver.maps.LatLng(Lat, Lng);
      this.map.setCenter(position); // 중심 좌표 이동
    },
    SetMarker(Lat, Lng, type, name) {
      var marker = new naver.maps.Marker({
        title: name,
        position: new naver.maps.LatLng(Lat, Lng),
        icon: {
          content: this.GetMarkLayout(name),
          anchor: new naver.maps.Point(this.anchor[0], this.anchor[1]),
        },
        map: this.map,
      });
      this.markers.push(marker);
    }, //마커 하나하나 만들어주는 메서드 (위도, 경도, 제휴 유무, 샵이름)
    GetMarkerLayoutMobile(name) {
      return (
        "<div style='font-size:50%'><div style='top: 100%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-color: rgba(204, 179, 18,0);border-top-color: #d5d5d5;border-width: 0.3em;margin-left: -0.3em;'></div>" +
        "<div style='border-radius: 2em;position: relative;background: #ffffff;border: 0.11em solid #d5d5d5; width:13em; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em;  margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background:#d5d5d5;text-align: center;'><img src=" +
        nail +
        " style='height:50%;'/></div><span style='margin:0.5em; text-align: center;'>" +
        name +
        "</span></div>" +
        "<div style='top: 80%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;	border-color: rgba(255, 122, 117, 0);border-top-color: #ffffff;border-width: 0.8em;margin-left: -0.8em;'></div></div>"
      );
    }, //모바일형태에 맞는 커스텀 마커를 제공하는 메서드 (샵이름)
    GetMarkerLayoutDesktop(name) {
      return (
        "<div><div style='top: 100%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-color: rgba(204, 179, 18,0);border-top-color: #d5d5d5;border-width: 0.3em;margin-left: -0.3em;'></div>" +
        "<div style='display:flex; border-radius: 2em;position: relative;background: #ffffff;border: 0.11em solid #d5d5d5; width:13em; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em; margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background:#d5d5d5;text-align: center;'><img src=" +
        nail +
        " style='height:50%;'/></div><span style='margin-left:auto;margin-right:auto;'>" +
        name +
        "</span></div>" +
        "<div style='top: 80%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;	border-color: rgba(255, 122, 117, 0);border-top-color: #ffffff;border-width: 0.8em;margin-left: -0.8em;'></div></div>"
      );
    }, // 데스크탑 형태에 맞는 커스텀 마커를 제공하는 메서드 (샵이름)
    GetMarkLayout(name) {
      if (this.media == "desktop") return this.GetMarkerLayoutDesktop(name);
      else return this.GetMarkerLayoutMobile(name);
    }, //위의 커스텀 마커를 화면 상황에 따라 제공해주는 메서드
    SetMedia() {
      if (this.width > 768 || this.width == 0) {
        if (this.media != "desktop") {
          this.media = "desktop";
          this.anchor = [100, 60];
          this.InitMarkers();
        }
      } else {
        if (this.media != "mobile") {
          this.media = "mobile";
          this.anchor = [50, 30];
          this.InitMarkers();
        }
      }
    }, //현재 화면 넓이를 확인해 desktop 또는 mobile 형태로 media 변수를 변경해주는 메서드
  },
  computed: {
    shops() {
      return this.$store.state.ShopStore.shops;
    }, // 전체 마커 설정을 위한 샵 리스트
    focusmarker() {
      return this.$store.state.ShopStore.focusmarker;
    }, // 커서 올라갔을때 마커 최상단 위치를 위한 변수값
    shop() {
      return this.$store.state.ShopStore.shop;
    }, // 샵리스트를 클릭 했을때 이벤트 발생을 위한 변수
    district() {
      return [
        this.$store.state.ShopStore.sido,
        this.$store.state.ShopStore.sigungu,
      ];
    },
  },
  watch: {
    width() {
      this.SetMedia();
    },
    shops() {
      this.InitMarkers();
    },
    focusmarker(state) {
      this.markers.forEach((marker) => {
        marker.setZIndex(5);
        // marker.setAnimation(null);
      });

      if (state != null) {
        this.markers[state].setZIndex(100);
        // this.AnimateMarker(state);
      }
    },
    shop(state) {
      var shop = this.shops[state];
      var position = new naver.maps.LatLng(shop.latitude, shop.longitude);
      this.markers[state].setZIndex(state); // 최상단에 위치 하게
      this.map.setCenter(position); // 중앙 지정 변경
      this.map.setZoom(20, true); // 줌
    }, // 샵을 클릭했을때 지도 형태를 위한 설정
    district() {},
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
