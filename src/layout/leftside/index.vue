<template>
    <div>
         <!-- 侧边栏 加 导航栏 -->
                 <!-- 设置高亮 -->
        <el-menu :default-active="sidebar" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" router>



            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>

            <el-menu-item index="/member">
                <i class="el-icon-s-custom"></i>
                <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">供应商管理</span>
            </el-menu-item>

            <el-menu-item index="/merchandise">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff">
                <i class="el-icon-user"></i>
                <span slot="title">员工管理</span>
            </el-menu-item>
        </el-menu>

    </div>
</template>

<script>
export default {
    computed: {
        sidebar() {
            //获取路由路径 设置导航切换高亮
            return this.$route.path
        }
    }
}
</script>

<style>

</style>
