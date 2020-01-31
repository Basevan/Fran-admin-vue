<template>
    <div>
      <edit-menu></edit-menu>
<!--      <router-link :to='{name: "editMenu"}'>-->
<!--        <span>编辑页面</span>-->
<!--      </router-link>-->
<!--      <el-divider direction="vertical"></el-divider>-->
<!--      <router-link :to='{name: "add"}'>-->
<!--        <span>新增</span>-->
<!--      </router-link>-->
<!--      <el-divider direction="vertical"></el-divider>-->
<!--      <router-link :to='{name: "addNewImpl"}'>-->
<!--        <span>新的新增</span>-->
<!--      </router-link>-->
<!--      <el-divider direction="vertical"></el-divider>-->
<!--      <router-link :to='{name: "editTree"}'>-->
<!--        <span>树形编辑</span>-->
<!--      </router-link>-->

<!--      <el-divider></el-divider>-->

<!--      <div>-->
<!--        <router-view />-->
<!--      </div>-->
    </div>
</template>

<script>
    import EditMenu from "./EditMenu";
    export default {
        name: "Layout",
        components: {EditMenu},
    }
</script>

<style scoped>

</style>

