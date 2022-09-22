<template>
    <div>
        <!-- 顶部跳转 || 退出登录  ||  修改密码 -->
        <header class="header">
            <div>
                <router-link to="/home"><img src="../../assets/logo.7156be27.png" alt="" class="imge"></router-link>
                <span>梦学谷会员管理系统</span>
            </div>
            <div>
                <el-dropdown @command="handleCommand">
                    <span>
                        {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changepassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }, methods: {
        handleCommand(val) {
            //退出登录
            if (val === 'logout') {
                //调用退出登录方法
                this.logout()

                //修改密码
            } else if (val === 'changepassword') {
                alert('修改成功')
            }
        },
        // 退出登录方法
        async logout() {
            try {
                //调用store异步方法
                const response = await this.$store.dispatch('logout')
                //跳转登录页面   可以加定时器让他延迟跳转
                this.$router.push('/')
                //设置成功提示
                this.$message({
                    message: '恭喜你，退出成功',
                    type: 'success'
                });
            } catch (e) {
                //返回错误信息
                console.log(e.message);
            }
        }

    },
    computed: {
        //获取用户姓名
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

