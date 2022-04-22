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
      this.InitMap(37.51589, 126.982692);
      this.SetMedia();
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
      if (this.shops != "") {
        this.shops.forEach((shop) => {
          this.SetMarker(shop.latitude, shop.longitude, "", shop.name);
        });
      }
    },
    InitMap(Lat, Lng) {
      this.map = new naver.maps.Map(document.getElementById("naverMap"));
      document.addEventListener("mouseup", this.onMouseUp, true); // {passive: true, capture: true}
      document.addEventListener("mouseup", this.onMouseUp, false); // {passive: true, capture: false}
      document.addEventListener("mousewheel", { passive: true });

      if (this.media == "desktop") {
        this.map.setOptions({
          minZoom: 10,
          maxZoom: 21,
          zoom: 12,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
      } else {
        this.map.setOptions({
          minZoom: 10,
          maxZoom: 21,
          zoom: 12,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
      }
      var position = new naver.maps.LatLng(Lat, Lng);
      this.map.setCenter(position); // 중심 좌표 이동
      new naver.maps.Event.addListener(this.map, "mousewheel", function () {});
      new naver.maps.Event.addListener(this.map, "touchstart", function () {});
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
    GetMarkerLayoutMobile(name, type) {
      var background;
      var outline;
      var color;
      if (type == "focus") {
        background = "#7f7f7f";
        outline = "#000000";
        color = "#FFFFFF";
      } else {
        background = "#ffffff";
        outline = "#7f7f7f";
        color = "#000000";
      }
      return (
        "<div style='font-size:50%'><div style='top: 100%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " +
        outline +
        ";border-width: 0.3em;margin-left: -0.3em;'></div>" +
        "<div style='border-radius: 2em;position: relative;background: " +
        background +
        ";border: 0.11em solid " +
        outline +
        "; width:13em; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em;  margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background: " +
        outline +
        ";text-align: center;'><img src=" +
        nail +
        " style='height:50%;'/></div><span style='margin:0.5em; text-align: center; font-weight:bold;color:" +
        color +
        "'>" +
        name +
        "</span></div>" +
        "<div style='top: 80%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;	border-top-color: " +
        background +
        ";border-width: 0.8em;margin-left: -0.8em;'></div></div>"
      );
    }, //모바일형태에 맞는 커스텀 마커를 제공하는 메서드 (샵이름)
    GetMarkerLayoutDesktop(name, type) {
      var background;
      var outline;
      var color;
      if (type == "focus") {
        background = "#7f7f7f";
        outline = "#000000";
        color = "#FFFFFF";
      } else {
        background = "#ffffff";
        outline = "#7f7f7f";
        color = "#000000";
      }

      return (
        "<div><div style='top: 100%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " +
        outline +
        ";border-width: 0.3em;margin-left: -0.3em;'></div>" +
        "<div style='display:flex; border-radius: 2em;position: relative;background: " +
        background +
        ";border: 0.11em solid " +
        outline +
        "; width:13em; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em; margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background:" +
        outline +
        ";text-align: center;'><img src=" +
        nail +
        " style='height:50%;'/></div><span style='margin-left:auto;margin-right:auto; font-weight:bold;color:" +
        color +
        "'>" +
        name +
        "</span></div>" +
        "<div style='top: 80%;left: 50%;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " +
        background +
        ";border-width: 0.8em;margin-left: -0.8em;'></div></div>"
      );
    }, // 데스크탑 형태에 맞는 커스텀 마커를 제공하는 메서드 (샵이름)
    GetMarkLayout(name, type) {
      if (this.media == "desktop")
        return this.GetMarkerLayoutDesktop(name, type);
      else return this.GetMarkerLayoutMobile(name, type);
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
        this.$store.state.ShopStore.newDistrictSet,
      ];
    },
    distrctData() {
      return this.$store.state.ShopStore.districtData;
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
      this.markers.forEach((marker, i) => {
        marker.setZIndex(5);
        marker.setIcon({
          content: this.GetMarkLayout(this.shops[i].name, ""),
          anchor: new naver.maps.Point(this.anchor[0], this.anchor[1]),
        }); // 색 바꿔주는 것
        // marker.setAnimation(null);
      });

      if (state != null) {
        this.markers[state].setZIndex(100);

        this.markers[state].setIcon({
          content: this.GetMarkLayout(this.shops[state].name, "focus"),
          anchor: new naver.maps.Point(this.anchor[0], this.anchor[1]),
        }); // 색 바꿔주는 것
      }
    },
    shop(state) {
      if (state != null) {
        var shop = this.shops[state];
        var position = new naver.maps.LatLng(shop.latitude, shop.longitude);
        this.markers[state].setZIndex(state); // 최상단에 위치 하게
        this.map.setCenter(position); // 중앙 지정 변경
        this.map.setZoom(20, true); // 줌

        this.$store.commit("ShopStore/SetShop", null); // 샵 선택 초기화
      }
    }, // 샵을 클릭했을때 지도 형태를 위한 설정
    district() {
      var sigungu = this.district[1];
      var sido = this.district[0];
      var latitude, longitude, zoom;

      if (sigungu != 0) {
        zoom = 14;
        latitude = this.distrctData[sido - 1].sigungu[sigungu - 1].latitude;
        longitude = this.distrctData[sido - 1].sigungu[sigungu - 1].longitude;
      } else {
        zoom = 10;
        latitude = this.distrctData[sido - 1].latitude;
        longitude = this.distrctData[sido - 1].longitude;
      }

      var position = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(position); // 중앙 지정 변경
      this.map.setZoom(zoom, true); // 줌
    }, // 지역 변경할때 작동
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
