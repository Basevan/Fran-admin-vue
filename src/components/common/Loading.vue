<template>
    <div v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
</template>

<script>
    export default {
        name: "Loading",
      computed: {
          loading() {
            return this.$store.state.loading;
          }
      }
    }
</script>

<style scoped>

</style>
