import VueRouter from 'vue-router'

//导入对应的路由组件
import Home from "./components/tabbar/home.vue";
import Member from "./components/tabbar/member.vue";
import Car from "./components/tabbar/car.vue";
import Search from "./components/tabbar/search.vue";
import NewsList from "./components/new/newsList.vue";
import NewInfo from "./components/new/newInfo.vue";
import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';
import CallBackComment from './components/callback/Callback.vue';

var router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/member',
            component: Member
        },
        {
            path: '/car',
            component: Car
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewInfo
        },
        {
            path: '/home/photolist',
            component: PhotoList
        },
        {
            path: '/home/photolist/:id',
            component: PhotoList
        },
        {
            path: '/home/photoinfo/:id',
            component: PhotoInfo
        },
        {
            path: '/home/goodslist',
            component: GoodsList
        },
        {
            path: '/home/goodsinfo/:id',
            component: GoodsInfo,
            name: 'goodsinfo'
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc,
            name: 'goodsdesc'
        },
        {
            path: '/home/goodscomment/:id',
            component: GoodsComment,
            name: 'goodscomment'
        },
        {
            path: '/home/callback/:id',
            component: CallBackComment
        }
    ],
    linkActiveClass: "mui-active"
})
export default router;