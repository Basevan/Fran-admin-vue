<template>
  <!-- 导航栏 -->
  <div class="home">
    <el-menu default-active="1" class="el-menu-vertical-demo" text-color="black" >
      <div v-for="item in list.data" :key="item.id">
        <el-submenu index="">

              <span slot="title">
                {{item.name}}
              </span>

          <div v-for="child_item in item.children" :key="child_item.id">

            <el-menu-item v-if="child_item.type" index="child_item.id">
              {{child_item.name}}
            </el-menu-item>

            <el-submenu v-else index="child_item.id">
              <template slot="title">{{child_item.name}}</template>
              <div v-for="grandchild_item in child_item.children" :key="grandchild_item.id">
                <el-menu-item v-if="grandchild_item.type" index="grandchild_item.id">
                  {{grandchild_item.name}}
                </el-menu-item>
              </div>
            </el-submenu>

          </div>

        </el-submenu>

      </div>

    </el-menu>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SlideBar",
        data(){
            return{
                drawer: false,
                list: [],
            }
        },
        created() {
            axios.get('http://localhost:9999/goss/getData').then(res=>{
                this.list = res.data
                console.log(this.list)
            }).then(error=>{
                console.log(error)
            });
        },

    }
</script>

<style scoped>
  .home{
    height: 100%;
  }
</style>
