import request from './request';
// import store from './../store/index';
const http = {
    request(config) {
        request(config);
    },
    post(url, data) {
        // if(data instanceof Object){
        // }else{
        //     data = {
        //         ...data
        //     };
        // }
        return request({
            url,
            method: 'post',
            data
        });
    },
    postFile(url, data, contentType) {
        return request({
            url,
            method: 'post',
            data,
            contentType
        });
    },
    get(url, params) {
        return request({
            url,
            method: 'get',
            params
        });
    },
    put(url, data) {
        return request({
            url,
            method: 'put',
            data
        });
    },
    delete(url, params) {
        return request({
            url,
            method: 'delete',
            params
        });
    },
    download(url, params) {
        return request({
            url,
            method: 'get',
            params,
            responseType: 'blob'
        });
    },
    downloadPost(url, data) {
        return request({
            url,
            method: 'post',
            data,
            responseType: 'blob'
        });
    }
};
export default http;