<template>
    <!-- home主页面 -->
    <div class="home">
        <!-- 调用头部 -->
        <HeaDer></HeaDer>
        <!-- element布局容器 -->
        <el-container>
            <el-aside width="200px">
                <!-- 调用侧边栏 -->
                <leftside></leftside>
            </el-aside>

            <el-main>
                <!-- 调用右侧router-view -->
                <offside></offside>
            </el-main>

        </el-container>
    </div>
</template>
<script>
//引入子组件
import HeaDer from './header'
import leftside from './leftside'
import offside from './offside/index.vue'
export default {
    name: "loyout",
    components: {
        HeaDer,
        leftside,
        offside
    }

    , watch: {
        //路由跳转时获取用户信息列表
        $route: {
            async handler(val) {
                //获取本地存储判断是否存在用户信息如果存在就不执行 如果不存在就调用获取用户信息接口
                const name = localStorage.getItem('userInfo')
                if (name === null || name === "") {
                    await this.$store.dispatch('userinfoL')
                    return
                }
            },
            deep: true
        }
    }

}
</script>
<style lang="scss">
.el-aside {
    background-color: #545c64;
    color: #333;
    height: 90vh;
}

.el-main {
    background-color: #ffffff;
    color: #333;
    height: 90vh;
    padding: 10px;
}

.col {
    width: 100%;
}
</style>
  