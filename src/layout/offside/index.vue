<template>
    <div>
        <!-- 侧边栏路由显示页面 -->
        <div class="offside">
            <bread></bread>
         <router-view></router-view>
        </div>
    </div>
</template>

<script>
 // 调用面包屑
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
