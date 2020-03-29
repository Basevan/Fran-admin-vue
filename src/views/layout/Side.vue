<template>
  <div class="layout-left">
    <div
      class="layout-logo"
      v-bind:class="{collapse: collapse}">
      <router-link to="/home">
        <img src="../../assets/images/logo.png">
      </router-link>
    </div>

    <el-menu class="layout-menu-left" :default-active="pathname" :unique-opened="true" :collapse="collapse">
      <template v-for="item in router.options.routes">
        <el-submenu :index="item.meta.index" v-if="item.children && !item.hidden">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">
              {{item.meta.title}}
            </span>
          </template>

          <template v-if="item.children" v-for="child_item in item.children">
            <el-menu-item v-if="!child_item.children" :index="child_item.meta.index"
                          @click="handleLink(child_item)">
              <span>{{child_item.meta.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="child_item.meta.index">
              <template slot="title">
                <span>{{child_item.meta.title}}</span>
              </template>
              <div v-for="grandchild_item in child_item.children">
                <el-menu-item v-if="!grandchild_item.children" :index="grandchild_item.meta.index"
                              @click="handleLink(grandchild_item)">
                  <span>{{grandchild_item.meta.title}}</span>
                </el-menu-item>
                <el-submenu v-else :index="grandchild_item.meta.index">
                  <template slot="title">
                    <span>{{grandchild_item.meta.title}}</span>
                  </template>
                  <div v-for="grandgrandchild_item in child_item.children">
                    <el-menu-item v-if="!grandgrandchild_item.children" :index="grandgrandchild_item.meta.index"
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
  import axios from 'axios';

  export default {

    data() {
      return {
        router,
        localRoute: false,
        //完整路径
        link: '',
        list: [],
      };
    },
    computed: {
      ...mapState([
        'menuModule'
      ]),
      sideList() {
        return this.menuModule.sideList;
      },
      collapse() {
        return this.$store.state.navCollapse;
      },
      routers() {
        console.log(this.$store.getters.routes);
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
        console.log(this.$route.matched);
        this.$router.push(item.path);

        // this.link = domain + uri;
        // this.$store.commit('changeDomain', this.link);
        // this.getLocalRoutes(uri);
        // if (this.localRoute) {
        //   this.localRoute = false;
        //   this.$router.push(uri);
        // } else {
        //   this.$router.push("/views");
        // }
      },
      getLocalRoutes(uri) {
        let routes = this.$router.options.routes;
        routes.forEach(route => {
          if ('/' + route.path === uri) {
            this.localRoute = true;
          }
          if (route.children !== undefined) {
            route.children.forEach(route => {
              if ('/' + route.path === uri) {
                this.localRoute = true;
              }
            });
          }
        });
      },
      getList: function () {
        this.$store.dispatch('GET_MENU');
        this.$store.dispatch('LOGIN');
      },
    },
    created() {
      // this.list = this.$router.options.routes;
      // this.list.splice(0,1);
      // console.log(this.list);
    },

  };
</script>
