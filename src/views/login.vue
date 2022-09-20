<template>
    <div>
        <div class="box">
            <div class="register">
                <h1 class="top">梦学谷会员管理系统</h1>
                <div class="name"><span>账号:</span>&ensp;
                    <el-input v-model="username" placeholder="请输入内容" class="username"></el-input>
                </div>
                <div class="name"><span>密码:</span>&ensp;
                    <el-input placeholder="请输入密码" v-model="password" show-password class="username"></el-input>
                </div>
                <el-button type="primary" class="login" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import https from '../api/login'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    }, methods: {
        login() {
            https.login({ username: this.username, password: this.password }).then(res => {
                // console.log(res);
                this.$router.push('/about')

                this.username = '',
                    this.password = ''
                sessionStorage.setItem('token', res.data.data.token)
                console.log(res.data.data.token);

                this.$message({
                    message: '恭喜你，登陆成功',
                    type: 'success'
                });

            }).catch(error => {
                // console.log(error);
                this.$message.error(error.request.response.slice(8, 1));
            })
        }
    },
}
</script>
<style lang="scss">
.box {
    width: 100%;
    height: 100vh;
    background: url(../assets/login.b665435f.jpg);
    background-size: 100% 100%;
    overflow: hidden;

    .register {
        width: 350px;
        height: 240px;
        margin: 160px auto;
        background-color: hsla(0, 0%, 100%, .8);
        padding: 40px;
        border-radius: 20px;

        .top {
            text-align: center;
            margin-bottom: 20px;
        }

        .name {
            float: left;
            margin-bottom: 20px;

            .username {
                width: 300px;
            }
        }

        .login {
            margin-left: 49px;
        }
    }
}
</style>
