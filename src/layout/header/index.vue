<template>
    <div>
        <header class="header">
            <div>
                <router-link to="/home"><img src="../../assets/logo.7156be27.png" alt="" class="imge"></router-link>
                <span>梦学谷会员管理系统</span>
            </div>
            <div>
                <el-dropdown >
                    <span>
                        {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </header>
    </div>
</template>

<script>
export default {
    computed: {
        username() {
            return this.$store.getters.name
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

    div {
        .imge {
            width: 30px;
            height: 30px;
            vertical-align: middle;
            margin-right: 15px;
        }

        .span {
            color: #fff;
        }
    }

    .el-dropdown {
        color: #fff;
        font-size: 18px;
    }
}
</style>

