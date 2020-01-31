<template>
  <!-- 导航栏 -->
  <div class="home">
    <div class="change-menu-icon">
      <el-tooltip content="收起菜单" placement="right" effect="light" :visible-arrow="false" :hide-after="hideTime"><i class="el-icon-s-fold" @click="changeMenuState"></i></el-tooltip>
    </div>

    <div class="menu-box" :style=" 'height:' + height + 'px;' ">
      <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="true" :collapse="isCollapse" background-color="#475d6c" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="item in list.menus" >
          <el-submenu :index="item.name" v-if="!item.type && item.subMenus">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">
                  {{item.name}}
                </span>
            </template>

            <template v-for="child_item in item.subMenus">
              <el-menu-item v-if="child_item.type" :index="child_item.name" @click="handleLink(item.domain,child_item.uri,child_item.name)">
                <span>&nbsp; {{child_item.name}}</span>
              </el-menu-item>
              <el-submenu v-else :index="child_item.name">
                <template slot="title">
                  <span>&nbsp;  {{child_item.name}}</span>
                </template>
                <div v-for="grandchild_item in child_item.subMenus">
                  <el-menu-item v-if="grandchild_item.type" :index="grandchild_item.name" @click="handleLink(item.domain,grandchild_item.uri,grandchild_item.name)">
                    <span>&nbsp;  {{grandchild_item.name}}</span>
                  </el-menu-item>
                </div>
              </el-submenu>

            </template>
          </el-submenu>

          <template v-else>
            <el-menu-item v-if="item.type" :index="item.name" @click="handleLink(item.domain,item.uri)">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

export default {
  props: [],
  name: 'Home',
    data() {
        return {
            isCollapse: false,
            drawer: false,
            list: [],
            //完整路径
            link: '',
            //屏幕高度
            height: document.documentElement.clientHeight - 68,
            //收起菜单图标的提示文字显示时间
            hideTime: 300,
        };
    },
    watch: {
      //监听高度变化
      height(val) {
          if (!this.timer) {
              this.height = val;
              this.timer = true;
              let that = this;
              setTimeout(() => {
                  that.timer = false;
              },400);
          }
      }
    },
    methods: {
        handleLink(domain,uri,name){
            this.link = domain + uri;
            this.$emit("getName",name);
            this.$store.commit('changeDomain',this.link);
            this.$router.push("/views");
        },
        changeMenuState() {
            if (this.isCollapse === true) {
                this.isCollapse = false;
            } else {
                this.isCollapse = true;
            }
        },
        //动态获取浏览器高度
        get_body_height() {
          const that = this;
          window.onresize = () => {
              return ( () => {
                  window.height = document.documentElement.clientHeight;
                  that.height = window.height - 68;
              })
          }
        }
    },
    mounted() {
      this.get_body_height();
    },
    created() {
        axios.get('http://localhost:8110/menu/getAllMenu').then(res=>{
            this.list = res.data.data;
            console.log(this.list);
        }).then(error=>{
            console.log(error);
        });
    },
    // computed:{
    //   domain(){
    //       this.$store.commit('changeDomain',this.link);
    //       return this.$store.state.domain;
    //   },
    //   all(){
    //       this.$store.commit('addData',this.list);
    //       return this.$store.state.allData;
    //   },
    //   setAllData(){
    //       this.$store.commit('setAllData',this.list);
    //   }
    // }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    position: relative;
    background: #475d6c;
    width: 200px;
  }
  .change-menu-icon {
    position: relative;
    top: -25px;
    left: 200px;
  }
  .menu-box {
    background-color: #475d6c;
  }
  .home{
    position: absolute;
    width: 200px;
  }

</style>
