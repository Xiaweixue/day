<template>
    <div>
        <!-- 面包屑 -->
        <el-card v-if="homepage">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"><span class="title">{{CrumbsJump}}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'bread',
    computed: {
        // 面包屑动态改变
        CrumbsJump() {
            return this.$route.meta?.title || ''
        },
        // 主页判断不显示面包屑
        homepage() {
            return !(this.$route.meta.title === '主页')
        }
    }
}
</script>

<style lang="scss">
.el-card{
    margin-bottom: 20px;
}

.title {
    border-left: 5px solid #31c17b;
    padding-left: 10px;
}
</style>

