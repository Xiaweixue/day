<template>
    <div class="home">
        <header class="header">
            <div><img src="../../assets/logo.7156be27.png" alt="" class="imge"><span>梦学谷会员管理系统</span></div>
            <div>
                <el-dropdown>
                    <span>
                       {{name}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </header>
        <el-container>
            <el-aside width="200px">






            </el-aside>
            <el-main>

            </el-main>
        </el-container>
    </div>
</template>
<script>

export default {
    data() {
        return {
            name: ''
        }
    }, created() {
        this.name=this.$store.state.name
    }, methods: {


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

.col {
    width: 100%;
}
</style>
  