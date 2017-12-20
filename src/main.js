// 导入第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';

// 启动vue插件
Vue.use(VueRouter);
Vue.use(ElementUI);



// 导入全局样式。
import './less/index.less';
// 导入根组件
import AppComponent from './component/App.vue';
// 导入路由配置
import routerConfig from './router';

// 导入配置后的axios与api ,注入到vue的原型当中，这样所有的组件就可以通过this调用了
import axios from './js/axios_config';
import api from './js/api_config';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 挂载根组件，启动应用
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: new VueRouter(routerConfig)
});