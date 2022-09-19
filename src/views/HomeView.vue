<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }, created() {
    this.$axios({
      url: process.env.VUE_APP_BAES_API + '/',
      method: 'GET'
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>
