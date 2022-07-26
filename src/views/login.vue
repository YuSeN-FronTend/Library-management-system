<template>
  <div class="container">
     <div class="login">
         <div class="title">
             Sign in
         </div>
         <div class="input">
             <el-input v-model="username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
             <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-mouse"></el-input>
         </div>
         <div class="button">
             <el-button class="btn" @click="login">登录</el-button>
             <el-button class="btn" type="primary" @click="dialogFormVisible=true">注册</el-button>
         </div>
     </div>
     <el-dialog title="注册" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="register">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { login,register } from '../api/login'
export default {
 components: {},
 data() {
 return {
     username:'',
     password:'',
     dialogFormVisible: false,
        form: {
          username: '',
          password: '',
        },
        formLabelWidth: '120px'
 }
 },
 computed: {},
 created () {},
 mounted () {},
 methods: {
     async login(){
         const params={
             username: this.username,
             password: this.password
         }
         const data = await login(params)
         console.log(data);
        if(data.code==200){
            sessionStorage.setItem('token',data.data.token)
            this.$message({
                message:data.message,
                type:'success'
            });
            this.$router.push('/layout')
        }else{
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }
     },
     async register(){
         const params = {
             username: this.form.username,
             password: this.form.password
         }
         const data = await register(params)
         console.log(data);
         this.dialogFormVisible = false
     }
 }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    background-image: url("./../assets/book.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login{
        height: 300px;
        width: 400px;
        border-radius: 20px;
        background-color: rgba(235, 235, 235, 0.5);
        backdrop-filter: blur(3px);
        border: 2px solid rgba(0, 0, 0, 0.1);
        .title{
            width: 100%;
            height: 75px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(0, 0, 0, 0.479);
            font-size: 30px;
            font-weight: 800;
        }
        .input{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            margin: 20px 0 15px 50px;
            height: 110px;
            width: 300px;
        }
        .button{
            padding: 0 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 70px;
            .btn{
                width: 140px;
                height: 45px;
                border-radius: 30px;
            }
        }
    }
}
::v-deep .el-dialog {
    width: 25%;
}
::v-deep .el-dialog__body{
    padding: 30px 100px 30px 0 !important;
}
// ::v-deep .el-input__inner{
//     width: 60%;
// }
// ::v-deep .el-form-item__label{
//     width: 50px;
//     text-align: left;
//     padding-left: 10px;
// }
</style>
