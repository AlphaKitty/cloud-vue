import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
// import "bootstrap3/dist/css/bootstrap.min.css";
// import "bootstrap3/dist/js/bootstrap.min.js";

const BASEURL = "http://192.168.2.25:8040/api"

const vue = createApp(App);
vue.config.globalProperties.$api = axios
axios.defaults.baseURL = BASEURL

vue.mount('#app')
