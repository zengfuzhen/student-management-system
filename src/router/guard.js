// 因为这不是组件，没有组件实例，自然没有this.$http方法所以要手动导入axios
import axios from 'axios';
// $http无法使用，$api也无法使用，所以需要手动导入api_consif
import apiConfig from '../js/api_config.js';

// 该模块向外导出一个路由守卫函数
export default function(to, from, next) {


    axios.get(apiConfig.islogin).then(rep => {
        let islogin = rep.data.code == 'logined';
        let toPage = to.name;

        // 去往登陆
        if (toPage == 'l') {
            if (islogin) {
                next('/'); //转首页
            } else {
                next(); //允许访问
            }
        }
        // 去往非登陆
        if (toPage != 'l') {
            console.log(islogin)
            if (islogin) {
                next(); //允许访问
            } else {
                next('/login'); //转登陆
            }
        }
    });
};