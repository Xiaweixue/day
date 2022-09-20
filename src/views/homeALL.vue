<template>
  <div class="home">
    <header class="header">
      <div><img src="../assets/logo.7156be27.png" alt="" class="imge"><span>梦学谷会员管理系统</span></div>
      <div>
        <el-dropdown @command="handleCommand">
          <span>
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </header>
    <el-container>
      <el-aside width="200px">

      
          <el-col :span="12" class="col">
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
              active-text-color="#ffd04b" router>

              <el-menu-item index="home">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
      


      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>
<script>
import https from '../api/login'
export default {
  data() {
    return {
      name: ''
    }
  }, created() {
    this.name = this.$route.query.name
  }, methods: {
    logout() {

    },
    handleCommand(command) {
      if (command == 'logout') {
        // console.log(123);
        https.logOut(sessionStorage.getItem('token')).then(res => {
          // console.log(res);
          sessionStorage.removeItem('token')
          this.$router.push('/')
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          });

        })
      }
    }
  }

}
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 70px;
  background-color: #2d3a4b;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  align-items: center;

  .imge {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 15px;
  }

  .el-dropdown {
    color: #fff;
    font-size: 18px;
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;

}

.el-main {
  background-color: #ffffff;
  color: #333;
  height: 90vh;
}
.col{
  width: 100%;
}
</style>


