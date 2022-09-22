<template>
    <div>
        <!-- 登录页面 -->
        <div class="box">
            <div class="register">
                <h1 class="top">梦学谷会员管理系统</h1>
                <el-form :model="loginForm" :rules="rules" ref="form" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model.trim="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model.trim="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>

                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'index',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }, rules: {
                //input 失焦验证
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ], password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },

                ]
            }
        }
    }, methods: {
        login() {
            //登录验证
            this.$refs['form'].validate((valid) => {
                if (!valid) return
                console.log('1111');
                //调用登录方法
                this.handleLogin()
            })


        },
        //登录方法
        async handleLogin() {
            const token = await this.$store.dispatch('loginL', this.loginForm)
            if (!token) return
            const userinfo = await this.$store.dispatch('userinfoL')
            if (!userinfo) return
            this.$router.push('/layout')
            this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
            });
        }

    }
    //登录接口
    // async handleLogin() {
    //     try {
    //         const response = await http.login(this.loginForm)
    //         sessionStorage.setItem('token', response.data.token)
    //     } catch (e) {
    //         console.log(e.message)
    //     }

    // },
    // //用户信息接口
    // async userinfo() {
    //     try {
    //         const response = await http.userinfo()
    //         // console.log(response);
    //         sessionStorage.setItem('name', response.data.name)
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // }



}
</script>
<style lang="scss">
.box {
    width: 100%;
    height: 100vh;
    background: url(../../assets/login.b665435f.jpg
);
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



        .login {
            margin-left: 49px;
        }
    }
}
</style>