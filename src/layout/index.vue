<template>
    <div class="home">
        <HeaDer></HeaDer>
        <el-container>
            <el-aside width="200px">
                <leftside></leftside>
            </el-aside>

            <el-main>
                <offside></offside>
            </el-main>

        </el-container>
    </div>
</template>
<script>
import HeaDer from './header'
import leftside from './leftside'
import offside from './offside/index.vue'
export default {
    name: "loyout",
    components: {
        HeaDer,
        leftside,
        offside
    },
    data() {
        return {

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
}

.col {
    width: 100%;
}
</style>
  