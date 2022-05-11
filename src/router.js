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
import MonthlyartPage from "./components/MonthlyartPage/MonthlyartPage";
import ComparisonPage from "./components/ComparisonPage/ComparisonPage";
import MonthlyartMain from "./components/MonthlyartPage/container/MonthlyartMain";
import MonthlyartDetail from "./components/MonthlyartPage/container/MonthlyartDetail";

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
    path: "/comparison",
    component: ComparisonPage,
  },

  {
    path: "/monthlyart",
    component: MonthlyartPage,
    children: [
      {
        path: "",
        component: MonthlyartMain,
      },
      {
        path: ":price(\\d+)",
        component: MonthlyartDetail,
      },
    ],
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: "instant" };
  },
});
export default router;
