import Vue from 'vue'
import {axios} from '@/common/api/request'

const api = {}

export default api

//post
export function post(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: parameter
    })
}

//post method= {post | put}
export function http(url, parameter, method) {
    return axios({
        url: url,
        method: method,
        data: parameter
    })
}

//put
export function put(url, parameter) {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}

//get
export function get(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}

//deleteAction
export function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downloadExcel(url, parameter) {
    return axios({
        url: url,
        params: parameter,
        method: 'get',
        responseType: 'blob'
    })
}

/**
 * 下载文件
 * @param url 文件路径
 * @param fileName 文件名
 * @param parameter
 * @returns {*}
 */
export function downloadFile(url, fileName, parameter) {
    return downloadExcel(url, parameter).then((data) => {
        if (!data || data.size === 0) {
            Vue.prototype['$message'].warning('文件下载失败')
            return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), fileName)
        } else {
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) //下载完成移除元素
            window.URL.revokeObjectURL(url) //释放掉blob对象
        }
    })
}

/**
 * 文件上传 用于富文本上传图片
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadFile(url, parameter) {
    return axios({
        url: url,
        data: parameter,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',  // 文件上传
        },
    })
}

