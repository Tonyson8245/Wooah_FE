import { createWebHistory, createRouter } from "vue-router";
import MainPage from "./components/MainPage/MainPage";
import Collection from "./components/CollectionPage/CollectionPage";
import Shop from "./components/ShopPage/ShopPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import DetailPage from "./components/CollectionPage/DetailPage";

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
  },
  {
    path: "/:anything(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
