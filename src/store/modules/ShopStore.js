import shops from "../../assets/dummy/shop";
import shopinfo from "../../assets/dummy/shopinfo";
import shopimg from "../../assets/dummy/shopimages";
const ShopStore = {
  namespaced: true,
  state: {
    MapView: true,
    shops: shops,
    shopinfo: shopinfo,
    shopimg: shopimg,
  },
  mutations: {
    SetMapView(state, payload) {
      state.MapView = payload;
    },
  },
};

export default ShopStore;
