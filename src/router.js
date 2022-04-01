import {createWebHistory, createRouter} from "vue-router";
import MainPage from './components/MainPage/MainPage'
import Collection from './components/CollectionPage/CollectionPage'
import Shop from './components/ShopPage/ShopPage'

const routes = [
    {
        path: "",
        component: MainPage
    },
    {
        path: "/",
        component: MainPage
    }, {
        path: "/library",
        component: Collection
    }, {
        path: "/shop",
        component: Shop
    },
];

const router = createRouter({history: createWebHistory(), routes});

export default router;
