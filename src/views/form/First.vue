<template>
    <div class="framePage">
      <iframe :src="domain" style="width: 100%; height: 800px" frameborder="0"></iframe>
    </div>
</template>

<script>
  import Home from '../home/Home'
    export default {
        name: "First",
        data(){
            return{
                link: ''
            }
        },
        methods:{

        },
        computed:{
          domain(){
              return this.$store.state.domain;
          }
        }
    }
</script>

<style scoped>
/*.page{*/
/*  background-color: bisque;*/
/*}*/
</style>
