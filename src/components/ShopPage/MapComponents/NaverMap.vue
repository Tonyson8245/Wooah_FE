<template>
  <div id="wrap" class="section user-select-none">
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
      anchor: [27, 53],
    };
  },
  props: {
    width: Number,
  },
  mounted() {
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

      for (var i = 0, ii = this.markers.length; i < ii; i++) {
        if (
          this.shops[i].is_partner == undefined ||
          this.shops[i].is_partner == true
        )
          naver.maps.Event.addListener(
            this.markers[i],
            "click",
            this.GetClickHandler(this.shops, i, this.$router, this.$store)
          );
      }

      // if (this.shop != null) this.SelectShop();
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
            position: naver.maps.Position.LEFT_BOTTOM,
          },
        });
      } else {
        console.log("mobile");
        this.map.setOptions({
          minZoom: 10,
          maxZoom: 21,
          zoom: 14,
          zoomControl: false,
          zoomControlOptions: {
            position: naver.maps.Position.LEFT_BOTTOM,
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
          content: this.GetMarkLayout(name, type),
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
        background = "#A862EA";
        outline = "#A862EA";
        color = "#ffffff";
      } else {
        background = "#ffffff";
        outline = "#A862EA";
        color = "#A862EA";
      }
      return (
        "<div style='font-size:50%'><div style='top: 2.9em;left: 1.4em;border: solid transparent;content: " + // 꼭지 위치
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " +
        outline +
        ";border-width: 0.6em;margin-left: -0.3em;'></div>" +
        "<div style='border-radius: 2em;position: relative;background: " +
        background +
        ";border: 0.11em solid " +
        outline +
        "; width:auto; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em;  margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background: " +
        outline +
        ";text-align: center;'><img src=" +
        nail +
        " style='height:50%;'/></div><span style='white-space: nowrap;margin:0.5em; text-align: center; font-weight:bold;color:" +
        color +
        "'>" +
        name +
        "</span></div>" +
        "<div style='top: 2.5em;left: 1.7em;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;	border-top-color: " + // 꼭지 위치
        background +
        ";border-width: 0.8em;margin-left: -0.8em;'></div></div>"
      );
    }, //모바일형태에 맞는 커스텀 마커를 제공하는 메서드 (샵이름)
    GetMarkerLayoutDesktop(name, type) {
      var background;
      var outline;
      var color;
      if (type == "focus") {
        background = "#A862EA";
        outline = "#A862EA";
        color = "#ffffff";
      } else {
        background = "#ffffff";
        outline = "#A862EA";
        color = "#A862EA";
      }

      return (
        "<div><div style='top: 2.8em;left: 1.4em;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " + //꼭지위치
        outline +
        ";border-width: 0.6em;margin-left: -0.3em;'></div>" +
        "<div style='display:flex; border-radius: 2em;position: relative;background: " +
        background +
        ";border: 0.11em solid " +
        outline +
        "; width:auto; height:3em; display: flex; align-items: center;'>" +
        "<div style='border-radius:50%;height:2em;width:2em; margin-top:0.3em;margin-left:0.3em;margin-bottom:0.3em;background:" +
        outline +
        ";text-align: center;'><img src=" +
        nail +
        " style='height:50%; z-index:100;'/></div><span style='white-space: nowrap; margin: 0 1em 0 1em; white-space:nowrap;font-weight:bold;color:" +
        color +
        "'>" +
        name +
        "</span></div>" +
        "<div style='top: 2.5em;left: 1.7em;border: solid transparent;content: " +
        ";height: 0;width: 0;position: absolute;pointer-events: none;border-top-color: " + //꼭지위치
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
      if (this.width > 767 || this.width == 0) {
        if (this.media != "desktop") {
          console.log(`desktop`);
          this.$store.commit("ShopStore/SetMedia", `desktop`);
          this.anchor = [27, 53];
          this.InitMarkers();
          this.map.setOptions({
            zoomControl: true,
          });
          if (this.districtData.length > 0) this.ZoomOutDistrict();
        }
      } else {
        if (this.media != "mobile") {
          console.log(`mobile`);
          this.$store.commit("ShopStore/SetMedia", `mobile`);
          this.anchor = [14, 27];
          this.InitMarkers();
          this.map.setOptions({
            zoomControl: false,
          });
          if (this.districtData.length > 0) this.ZoomOutDistrict();
        }
      }
    }, //현재 화면 넓이를 확인해 desktop 또는 mobile 형태로 media 변수를 변경해주는 메서드strctData
    GetClickHandler(shops, seq, router, store) {
      return function () {
        if (shops[seq].is_partner == null || shops[seq].is_partner == true) {
          router.push("/shop/" + shops[seq].id);
        }
        store.commit("ShopStore/SetShop", seq); //vuex에 올려서, 마커 위로 올라올수 있게 하기 위함.
      };
    },
    MovetoShopDetail(i) {
      this.$router.push("/shop/" + i);
    },
    ZoomOutDistrict() {
      var sigungu = this.district[1];
      var sido = this.district[0];
      var latitude, longitude, zoom;
      try {
        if (sigungu != 0) {
          zoom = 14;
          latitude = this.districtData[sido - 1].sigungu[sigungu - 1].latitude;
          longitude =
            this.districtData[sido - 1].sigungu[sigungu - 1].longitude;
        } else {
          zoom = 12;
          latitude = this.districtData[sido - 1].latitude;
          longitude = this.districtData[sido - 1].longitude;
        }
      } catch (error) {
        zoom = 12;
        latitude = 37.51589;
        longitude = 126.982692;
        console.log(`지역 좌표정보가 없습니다.`);
      }

      var position = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(position); // 중앙 지정 변경
      this.map.setZoom(zoom, false); // 줌
    },
    SelectShop(info) {
      var position, name, lat, lng;

      this.markers.forEach((e) => {
        e.setMap(null);
      });
      this.markers = []; // 전체 마커 없애기

      name = info.name;
      lat = info.latitude;
      lng = info.longitude;
      //  shopinfo 가 있는 경우, shop/${id}와 리스트를 통해서 들어오는 경우 모두 가능하게 하기 위해 이렇게 작성

      this.SetMarker(lat, lng, "focus", name);
      position = new naver.maps.LatLng(lat, lng);
      this.map.setCenter(position); // 중앙 지정 변경
      this.map.setZoom(15, true); // 줌
    }, // Shop info에 데이터가 바뀌면 지도도 바뀐다.
  },
  computed: {
    media() {
      return this.$store.state.ShopStore.media;
    },
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
        this.$store.state.CommonStore.sido,
        this.$store.state.CommonStore.sigungu,
        this.$store.state.CommonStore.newDistrictSet,
      ];
    },
    districtData() {
      return this.$store.state.CommonStore.districtData;
    },
    keyword() {
      return this.$store.state.ShopStore.keyword; // 검색할때 현재 설정 지역 전체를 보여주기 위함
    },
    shopinfo() {
      return this.$store.state.ShopStore.shopinfo;
    },
  },
  watch: {
    width() {
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 2000);
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

      if (state != null && this.markers[state] != null) {
        this.markers[state].setZIndex(100);

        this.markers[state].setIcon({
          content: this.GetMarkLayout(this.shops[state].name, "focus"),
          anchor: new naver.maps.Point(this.anchor[0], this.anchor[1]),
        }); // 색 바꿔주는 것
      }
    },
    shop(state) {
      if (state != null) {
        this.SelectShop(state);
      } else {
        this.InitMarkers();
      }
    }, // 샵을 클릭했을때 지도 형태를 위한 설정
    district() {
      this.ZoomOutDistrict();
    }, // 지역 변경할때 작동
    keyword() {
      this.ZoomOutDistrict(); // 해당 지역 표시
    },
    shopinfo(info) {
      if (info != null) this.SelectShop(info);
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
