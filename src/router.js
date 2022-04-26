import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage/MainPage";
import Collection from "./components/CollectionPage/CollectionPage";
import Shop from "./components/ShopPage/ShopPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import DetailPage from "./components/CollectionPage/DetailPage";
import ShopImgTab from "./components/ShopPage/ListComponents/ShopInfoComponents/Tabs/ShopImgTab";
import ShopInfoTab from "./components/ShopPage/ListComponents/ShopInfoComponents/Tabs/ShopInfoTab";
import ShopPriceTab from "./components/ShopPage/ListComponents/ShopInfoComponents/Tabs/ShopPriceTab";
import ListPage from "./components/ShopPage/ListComponents/ListPage";
import ShopInfoPage from "./components/ShopPage/ListComponents/ShopInfoComponents/ShopInfoPage";
const path = process.env.NODE_ENV === "production" ? "/test/" : "";

const routes = [
  {
    path: "",
    component: MainPage,
  },
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/library/p/:id(\\d+)",
    component: DetailPage,
  },
  {
    path: "/library",
    component: Collection,
  },
  {
    path: "/shop",
    component: Shop,
    children: [
      {
        path: ":id(\\d+)",
        component: ShopInfoPage,
        children: [
          {
            path: "", //shop/0/info
            component: ShopInfoTab,
          },
          {
            path: "info", //shop/0/info
            component: ShopInfoTab,
          },
          {
            path: "image", //shop/0/image
            component: ShopImgTab,
          },
          {
            path: "price", //shop/0/price
            component: ShopPriceTab,
          },
        ],
      },
      {
        path: "",
        component: ListPage,
      },
    ],
  },
  {
    path: "/:anything(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({ history: createWebHistory(path), routes });

export default router;
