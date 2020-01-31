<template>
  <el-container direction="vertical">
    <P>mission3</P>
    <el-row>
      <el-col :span="3"><router-link :to="{name: 'fourth'}">Fourth</router-link></el-col>
      <rl-col :span="3"><router-link :to="{name: 'fifth'}">Fifth</router-link></rl-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
    export default {
        name: "Third"
    }
</script>

<style scoped>
</style>
