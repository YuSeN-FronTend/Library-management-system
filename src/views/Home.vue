<template>
  <div class="container">
    <div class="card">
      <div class="card-box" v-for="(item,index) in showData" :key="index">
        <div class="card-box-book">
          <i :class="item.icon"></i>
        </div>
        <div class="card-box-count">
          <animate-number :from="item.startCount" :to="item.endCount" :duration="strollTime"></animate-number>
        </div>
      </div>
    </div>
    <div class="echarts">
      <div class="echarts-bar">
        <bookBar></bookBar>
      </div>
      <div class="echarts-pie">
        <bookPie></bookPie>
      </div>
    </div>
  </div>
</template>

<script>
import bookBar from "./echarts/bookBar.vue"
import bookPie from "./echarts/bookPie.vue"
export default {
 components: {
   bookBar,
   bookPie
 },
 data() {
 return {
   showData:[
     {
       icon:'el-icon-collection',
       startCount: 1,
       endCount: 23945
     },
     {
       icon:'el-icon-notebook-1',
       startCount: 1,
       endCount: 34895
     },
     {
       icon:'el-icon-notebook-2',
       startCount: 1,
       endCount: 17890
     },
     {
       icon: 'el-icon-reading',
       startCount: 1,
       endCount: 42587
     }
   ],
   strollTime: 2000,
 }
 },
 computed: {},
 created () {},
 mounted () {},
 methods: {}
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  width: 100%;
  .card{
    height: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-box{
      width: 300px;
      height: 200px;
      background-color: #ecf0f1;
      box-shadow: 2px 2px 8px rgb(196, 194, 194);
      display: flex;
      cursor:pointer;
      &-book{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
      }
      &-count{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 800;
      }
    }
  }
  .echarts{
    display: flex;
    height: 60%;
    &-bar{
      height: 100%;
      width: 50%;
    }
    &-pie{
      height: 100%;
      width: 50%;
    }
  }
}
i{
  font-size: 80px;
  color: #34495e;
}
</style>
