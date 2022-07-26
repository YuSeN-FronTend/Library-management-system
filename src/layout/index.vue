<template>
  <div class="container">
    <el-container>
      <el-aside width="auto">
        <div class="title">图书</div>
        <el-menu router :default-active="topath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :collapse="isCollapse" @select="handleSelect">
          <el-menu-item index="/layout">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/bookShow">
            <i class="el-icon-collection"></i>
            <span slot="title">图书展示</span>
          </el-menu-item>
          <el-menu-item index="/borrowBookShow">
            <i class="el-icon-reading"></i>
            <span slot="title">借书展示</span>
          </el-menu-item>
          <el-menu-item index="/vipCenter">
            <i class="el-icon-user"></i>
            <span slot="title">会员中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="box">
            <div class="icon">
              <i class="el-icon-s-grid" @click="isCollapse=!isCollapse" style="cursor: pointer;"></i>
            </div>
            <div class="time">
              {{ currentTime }}
            </div>
          </div>
          <div class="image">
            <el-dropdown @command="handleCommand">
              <div class="image-box"><img class="image-box-face" src="@/assets/tx.jpg">
                <span>{{username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <div class="block">
                  <el-avatar shape="square" :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                  <span class="block-man">当前角色:<br/>{{nickname}}</span>
                </div>
                <el-dropdown-item command="vipCenter" divided>会员中心</el-dropdown-item>
                <el-dropdown-item command="unit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="view-main">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo } from '../api/login'
export default {
  components: {},
  data() {
    return {
      isCollapse: false,
      username:'',
      nickname:'',
      // bookManage: "图书管理系统",
      topath: '/layout',
      timer: "", //定义一个定时器的变量
      currentTime:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(), // 获取当前时间
    }
  },
  computed: {},
  created() {
    this.topath = this.$route.path
    var vm = this
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear()
      var m = vm.appendZero(new Date().getMonth() + 1)
      var d = vm.appendZero(new Date().getDate())
      var ho = vm.appendZero(new Date().getHours())
      var mi = vm.appendZero(new Date().getMinutes())
      var se = vm.appendZero(new Date().getSeconds())
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se
    }, 1000)
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    async getUserData(){
      const data = await getUserInfo()
      console.log(data);
      if(data.code == 200){
        this.nickname = data.data.nickname
        this.username = data.data.username
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath, 111);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(a) {
      this.topath = a
    },
    //时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj
      } else {
        return obj
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    handleCommand(command) {
      if (command == "vipCenter") {
        if (this.topath == "/vipCenter") {
          return;
        } else {
          this.$router.push(`/${command}`)
          this.topath = `/vipCenter`
        }
      } else if (command == "unit") {
        sessionStorage.removeItem('token')
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;
  }
}

.el-header {
  background-color: #B3C0D1;
  display: flex;
  justify-content: space-between;

  .box {
    display: flex;
    height: 100%;
    width: 15%;

    .icon {
      font-size: 25px;
      display: flex;
      color: rgba(0, 0, 0, 0.692);
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 20px;
    }

    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }
  }

  .image {
    display: flex;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &-box {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &-face {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
}

.el-aside {
  background-color: #fff;
  overflow: hidden;
  .title {
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.712);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-menu {
    border: 0;
  }
}

.el-main {
  background-color: #E9EEF3;
}

.block{
  display: flex;
  .el-avatar{
    margin: 7px;
  }
  &-man{
    margin: 5px 8px 5px 0;
    color: #7f8c8d;
    font-size: 12px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 0.2s 0.2s;
}
.fade-enter {
  opacity: 0;
}
</style>
