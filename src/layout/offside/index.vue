<template>
    <div>
        <div class="offside">
            <bread></bread>
         <router-view></router-view>
        </div>
    </div>
</template>

<script>
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
