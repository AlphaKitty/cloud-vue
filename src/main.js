import {createApp} from 'vue'
import axios from 'axios'
import './common/css/common.css'
import ElementUi from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
// import showdown from 'showdown'
// import converter from './common/markdown/converter'
// import "bootstrap3/dist/css/bootstrap.min.css";
// import "bootstrap3/dist/js/bootstrap.min.js";

const BASEURL = "http://192.168.1.14:8040/api"

const vue = createApp(App);
vue.config.globalProperties.$api = axios
axios.defaults.baseURL = BASEURL

vue.use(ElementUi)

vue.mount('#app')
