<template>
  <div class="vipCenter">
      <div class="myBox">
        <div class="myBox-img">
          <img src="@/assets/tx.jpg" alt="">
          <div class="myBox-img-name">
            {{username}}
          </div>
          <div class="myBox-img-work">角色: <span>{{nickname}}</span></div>
        </div>
      </div>
  </div>
</template>

<script>
import { getUserInfo } from '../api/login'
export default {
 components: {},
 data() {
 return {
   nickname:'',
   username:'',
 }
 },
 computed: {},
 created () {},
 mounted () {
   this.getUserData()
 },
 methods: {
   async getUserData(){
      const data = await getUserInfo()
      // console.log(data);
      if(data.code == 200){
        this.nickname = data.data.nickname
        this.username = data.data.username
      }
    },
 }
}
</script>

<style lang="scss" scoped>
.vipCenter{
  padding: 20px 0 0 30px;
  .myBox{
    height: 270px;
    width: 400px;
    display: flex;
    justify-content: center;
    // align-items: center;
    background-color: #ecf0f1;
    box-shadow: 3px 2px 10px rgb(196, 194, 194);
    &-img{
      margin-top: 40px;
      text-align: center;
      font-weight: 900;
      &-name{
        margin-top: 10px;
        margin-bottom: 20px;
      }
      &-work{
        color: #7f8c8d;
        font-weight: normal;
      }
    }
  }
}
img{
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
span{
  color: #3498db;
}
</style>
