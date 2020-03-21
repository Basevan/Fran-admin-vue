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
			<template v-for="item in sideList" >
				<el-submenu :index="item.name" v-if="!item.type && item.sub_menus">
					<template slot="title">
						<i :class="item.icon"></i>
						<span slot="title">
							{{item.name}}
						</span>
					</template>

					<template v-for="child_item in item.sub_menus">
						<el-menu-item v-if="child_item.type" :index="child_item.name" @click="handleLink(item.domain,child_item.uri,child_item.name)">
							<span>&nbsp; {{child_item.name}} </span>
						</el-menu-item>
						<el-submenu v-else :index="child_item.name">
							<template slot="title">
								<span>&nbsp; {{child_item.name}} </span>
							</template>
							<div v-for="grandchild_item in child_item.sub_menus">
								<el-menu-item v-if="grandchild_item.type" :index="grandchild_item.name" @click="handleLink(item.domain,grandchild_item.uri,grandchild_item.name)">
									<span>&nbsp; {{grandchild_item.name}} </span>
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
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import axios from 'axios';

	export default {

	    data() {
	      return {
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
                console.log('side');
                console.log(this.menuModule.sideList);
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
	        ...mapActions ({
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
			handleLink(domain,uri) {
                this.link = domain + uri;
                this.$store.commit('changeDomain',this.link);
                this.getLocalRoutes(uri);
				if (this.localRoute){
				    this.localRoute = false;
                    this.$router.push(uri);
				} else {
                    this.$router.push("/views");
                }
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

        },

	};
</script>
