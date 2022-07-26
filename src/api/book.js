import http from "../common/http"
// 查询所有图书
function bookAllData(params){
    return http.get('/api/type/getUserList', params)
}
// 添加图书
function addBook(params){
    return http.get('/api/type/add', params)
}
// 删除图书
function deleteBook(params){
    return http.delete('/api/type/delete', params)
}
// 修改图书
function updateBook(params){
    return http.get('/api/type/change',params)
}
export{
    bookAllData,
    addBook,
    deleteBook,
    updateBook
}