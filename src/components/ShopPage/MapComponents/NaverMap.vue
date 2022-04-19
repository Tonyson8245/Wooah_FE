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
      this.InitMap(37.485525, 126.999418);
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
      });
    },
    InitMap(Lat, Lng) {
      this.map = new naver.maps.Map(document.getElementById("naverMap"));

      if (this.media == "desktop") {
        this.map.setOptions({
          minZoom: 12,
          maxZoom: 21,
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
      } else {
        this.map.setOptions({
          minZoom: 12,
          maxZoom: 21,
          zoom: 10,
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
    },
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
    },
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
    },
    GetMarkLayout(name) {
      if (this.media == "desktop") return this.GetMarkerLayoutDesktop(name);
      else return this.GetMarkerLayoutMobile(name);
    },
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
    },
  },
  computed: {
    shops() {
      return this.$store.state.ShopStore.shops;
    },
  },
  watch: {
    width(state) {
      console.log(state);
      this.SetMedia();
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
