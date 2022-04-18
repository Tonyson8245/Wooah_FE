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
    };
  },

  mounted: function () {
    if (window.naver && window.naver.maps) {
      this.InitMap(37.485525, 126.979218);
      this.InitMarkers();
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
        console.log(shop);
      });
    },
    InitMap(Lat, Lng) {
      this.map = new naver.maps.Map(document.getElementById("naverMap"), {
        zoom: 13,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
        // bounds: naver.maps.LatLngBounds.bounds(
        //   new naver.maps.LatLng(Lat, Lng),
        //   new naver.maps.LatLng(Lat, Lng)
        // ),
      });
      var position = new naver.maps.LatLng(Lat, Lng);
      this.map.setCenter(position); // 중심 좌표 이동
    },
    SetMarker(Lat, Lng, type, name) {
      var marker = new naver.maps.Marker({
        title: name,
        position: new naver.maps.LatLng(Lat, Lng),
        icon: {
          content:
            "<div><div style='top: 100%;left: 50%;border: solid transparent;content: " +
            ";height: 0;width: 0;position: absolute;pointer-events: none;border-color: rgba(204, 179, 18,0);border-top-color: #d5d5d5;border-width: 1.0em;margin-left: -1.0em;'></div>" +
            "<div style='border-radius: 2em;position: relative;background: #ffffff;border: 0.25em solid #d5d5d5;width:200px; height:60px; display: flex; align-items: center;'>" +
            "<div style='border-radius:50%;padding:5%;height:45px;width:45px; margin-left:5px;background:#d5d5d5'><img src=" +
            nail +
            " style='height:100%;'/></div><span style='margin:auto; '>" +
            name +
            "</span></div>" +
            "<div style='top: 80%;left: 50%;border: solid transparent;content: " +
            ";height: 0;width: 0;position: absolute;pointer-events: none;	border-color: rgba(255, 122, 117, 0);border-top-color: #ffffff;border-width: 1.4em;margin-left: -1.4em;'></div></div>",
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(100, 80),
        },
        map: this.map,
      });

      this.markers.push(marker);
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
