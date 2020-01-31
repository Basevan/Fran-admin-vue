<template>
  <div id="app">
    <router-view />
  </div>


</template>

<script>
import Header from "./components/home/Header";
export default {
  name: 'App',
    components: {Header},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
a {text-decoration:none; color:#000000;}
a:hover {text-decoration:none;color: darkgray;}
/*font-size:18px*/
</style>
