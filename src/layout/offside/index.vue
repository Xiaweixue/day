<template>
    <div>
        <!-- 后台显示页面 -->
        <div class="offside">
            <!-- 面包屑 -->
            <bread></bread>
            <!-- 路由 -->
         <router-view></router-view>
        </div>
    </div>
</template>

<script>
 // 引入面包屑
 import bread from './bread'   
export default {
    name: "offside",
    components:{
        bread
    }
}
</script>

<style>
.offside{
    width: 100%;
    height: 100%;
}
</style>
