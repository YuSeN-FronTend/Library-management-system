// http request 请求拦截器，有token值则配置上token值
import axios from 'axios'
import Promise from 'promise'
import { Message } from 'element-ui'
import util from './utils';
import store from './../store/index';
const service = axios.create({
    baseURL: 'http://127.0.0.1:7001/', // 设置axios请求的基础的基础地址
    timeout: 60000, // 请求超时时间
    headers: {
        // Authorization: Authorization,
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
// http请求拦截器
service.interceptors.request.use(
    config => {
        let tokenExist = util.tokenExist();
        if (tokenExist) {
            // bus.$emit('toggleloading', true)//显示loading
            //如果token存在
            config.headers['Authorization'] = util.getToken();
        }
        // Toast.loading({
        //     message: '加载中...',
        //     duration: 0,
        //     forbidClick: true
        // });
        return config;
    },
    error => {
        Promise.reject(error);
    }
)
// http response 服务器响应拦截器，
// 这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            //通讯成功
            // Toast.clear();
            /*************
             * response.data.status === 0 错误
             * response.data.status === 100 成功
             * response.data.status === 401 token过期
             *
             * *************/
            // bus.$emit('toggleloading', false)//隐藏loading
            if (response.data.state === 401) {
                //如果是token过期，跳转至登录
                Message.error("登录已过期，请重新登录！");
                store.commit('SET_TOKEN', '');
                util.goLogin();
            } else if (response.data.state === 0) {
                // Message.error(response.data.message);
                return response.data;
            } else {
                return response.data;
            }
        }
    },
    error => {
        //请求失败
        // ;
        const response = error.response;
        if (response.status === 401) {
            // Toast.fail(response.data.message);
            Message.error("登录已过期，请重新登录！");
            util.goLogin();
        } else if (response.status === 403) {
            this.$router.push({
                name: '403'
            });
        } else {
            // Toast.fail(response.data.message ? response.data.message : '系统错误请联系管理员');
            // Message.error({
            //     message: '无服务，请联系管理员'
            // });
        }
        return Promise.reject(error);
    }
);
export default service;