// axios 全局封装
import axios from 'axios'
import {VueAxios} from '@/common/api/axios'
import {Notification} from 'element-ui';

/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/api'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
// 设置全局请求路径前缀
// let apiBaseUrl = window._CONFIG['domianURL'] || "/api";
let apiBaseUrl = 'http://49.232.213.74:10000/api';
// let apiBaseUrl = 'http://localhost:10000/api';
// 创建 axios 实例
const service = axios.create({
    baseURL: apiBaseUrl, // api base_url
    timeout: 9000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 403:
                Notification.error({message: '系统提示', description: '拒绝访问', duration: 4})
                break
            case 500:
                console.log("------error.response------", error.response)
                break
            case 404:
                Notification.error({message: '系统提示', description: '很抱歉，资源未找到!', duration: 4})
                break
            case 504:
                Notification.error({message: '系统提示', description: '网络超时'})
                break
            case 401:
                Notification.error({message: '系统提示', description: '未授权，请重新登录', duration: 4})
                break
            default:
                Notification.error({
                    message: '系统提示',
                    description: data.message,
                    duration: 4
                })
                break
        }
    }
    return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
    const token = "tagme-h5>>>" + window.sessionStorage.getItem('token');
    config.headers['X-Access-Token'] = token;
    return config
}, (error) => {
    return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)

const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}
