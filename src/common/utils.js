// import store from '../store/index';
let util = {
    //获取token
    getToken() {
        return sessionStorage.getItem('token');
    },
    //判断token是否存在
    tokenExist() {
        // eslint-disable-next-line no-unused-vars
        let flag;
        let token = sessionStorage.getItem('token');
        if (token && token !== '') {
            flag = true;
        } else {
            flag = false;
        }
        return token;
    },
}
export default util