import http from "../common/http"

// 登录
function login(params){
    return http.get('/api/user/login',params)
}
// 注册
function register(params){
    return http.get('/api/user/register',params)
}
function getUserInfo(){
    return http.get('/api/user/get_userinfo')
}
export{
    login,
    register,
    getUserInfo
}