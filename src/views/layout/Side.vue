<template>
  <div class="layout-left">
    <div
      class="layout-logo"
      v-bind:class="{collapse: collapse}">
      <router-link to="/home">
        <h3>Fran-admin</h3>
      </router-link>
    </div>

    <el-menu class="layout-menu-left" :default-active="pathname" :unique-opened="true" :collapse="collapse">
      <template v-for="item in router.options.routes">

        <!-- 第一层目录 -->
        <el-submenu :index="item.meta.index" v-if="item.children && !item.hidden">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">
              {{item.meta.title}}
            </span>
          </template>

          <template v-if="item.children" v-for="child_item in item.children">
            <!--第一层目录下的菜单-->
            <el-menu-item v-if="!child_item.children" :index="child_item.path"
                          @click="handleLink(child_item)">
              <span class="left">{{child_item.meta.title}}</span>
            </el-menu-item>
            <!--第一层目录下的目录，即第二层目录-->
            <el-submenu v-else :index="child_item.path">
              <template slot="title">
                <span class="left">{{child_item.meta.title}}</span>
              </template>
              <div v-for="grandchild_item in child_item.children">
                <!--第二层目录下的菜单-->
                <el-menu-item v-if="!grandchild_item.children" :index="grandchild_item.path"
                              @click="handleLink(grandchild_item)">
                  <span class="left">{{grandchild_item.meta.title}}</span>
                </el-menu-item>
                <el-submenu v-else :index="grandchild_item.path">
                  <template slot="title">
                    <span class="left">{{grandchild_item.meta.title}}</span>
                  </template>
                  <div v-for="grandgrandchild_item in child_item.children">
                    <el-menu-item v-if="!grandgrandchild_item.children" :index="grandgrandchild_item.path"
                                  @click="handleLink(grandgrandchild_item)">
                      <span>{{grandgrandchild_item.meta.title}}</span>
                    </el-menu-item>
                  </div>
                </el-submenu>
              </div>
            </el-submenu>

          </template>
        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import router from '../../router/index';

  export default {

    data() {
      return {
        router,
        localRoute: false,
      };
    },
    computed: {
      ...mapState([
        'menuModule'
      ]),
      collapse() {
        return this.$store.state.navCollapse;
      },
      routers() {
        return this.$store.getters.routes;
      },
      pathname() {
        return this.$route.path;
      },
      getRefresh() {
        return this.$store.state.refresh;
      },
    },
    methods: {
      ...mapActions({
        getMenu: 'menuModule/GET_MENU'
      }),
      /**
       * 路由跳转过滤参数
       * @param path {string} 路由
       */
      // handleLink(path) {
      // 	const linkPath = path.split('/:')[0];
      // 	this.$router.push(linkPath);
      // },
      handleLink(item) {
        this.$router.push(item.path);
      },
    },
    created() {

    },

  };
</script>

<style>
  /**
   * 导航栏菜单项左边间隔
   */
  .left {
    margin-left: 30px;
  }
</style>
