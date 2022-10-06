import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage/MainPage";
import Collection from "./components/CollectionPage/CollectionPage";
import Shop from "./components/ShopPage/ShopPage";
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
    meta: {
      title: "우아 - 우리들의아름다움, 네일디자인부터 네일샵까지 한눈에!",
    },
  },
  {
    path: "/",
    component: MainPage,
    meta: {
      title: "우아 - 우리들의아름다움, 네일디자인부터 네일샵까지 한눈에!",
    },
  },
  {
    path: "/comparison",
    component: ComparisonPage,
    meta: {
      title: "맞춤시술견적 : 우아",
    },
  },

  {
    path: "/monthlyart",
    component: MonthlyartPage,
    meta: {
      title: "이달의아트모아보기 : 우아",
    },
    children: [
      {
        path: "",
        meta: {
          title: "이달의아트모아보기 : 우아",
        },
        component: MonthlyartMain,
      },
      {
        path: ":price(\\d+)",
        meta: {
          title: "이달의아트상세보기 : 우아",
        },
        component: MonthlyartDetail,
      },
    ],
  },
  {
    path: "/library/p/:id(\\d+)",
    component: DetailPage,
    meta: {
      title: "디자인상세보기 : 우아",
    },
  },
  {
    path: "/library",
    component: Collection,
    meta: {
      title: "디자인모아보기 : 우아",
    },
  },
  {
    path: "/shop",
    component: Shop,
    meta: {
      title: "샵 : 우아",
    },
    children: [
      {
        path: ":id(\\d+)",
        component: ShopInfoPage,
        meta: {
          title: "샵상세보기 : 우아",
        },
        children: [
          {
            path: "",
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
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "/", query: { q: to.params.searchText } };
    },
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
