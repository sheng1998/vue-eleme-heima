import Vue from 'vue';

// 1.1. 导入 vue-router 包
import VueRouter from 'vue-router';
// 1.2. 安装 VueRouter
Vue.use(VueRouter);

// 配置vuex的步骤
// 1. 运行 cnpm i vuex -S 
// 2. 导入包
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)

// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
var store = new Vuex.Store({
    state: { // this.$store.state.***
    },
    mutations: { // this.$store.commit('方法名称','唯一的参数')
    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
    }
})

// 导入时间格式化插件
import moment from 'moment';
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource
import VueResource from 'vue-resource';
// 2.2 安装 vue-resource
Vue.use(VueResource);

// 设置请求根路径
Vue.http.options.root = 'http://127.0.0.1:3030'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;



// 导入 MUI 样式
import './lib/mui/dist/css/mui.min.css';
// 导入 MUI 扩展图标样式
import './lib/mui/dist/css/icons-extra.css';

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';


// 安装 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 导入 app 组件
import app from './App.vue';
import router from './router';

var vm = new Vue({
    el: '#app',
    render: function (createElements) {
        return createElements(app)
    },
    router: router,
    store: store // 5. 将 vuex 创建的 store 挂载到 VM 实例上， 只要挂载到了 vm 上，任何组件都能使用 store 来存取数据
})