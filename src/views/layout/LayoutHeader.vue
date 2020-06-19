<template>
	<div class="layout-header">
		<img
			:src="nav_arrow"
			class="iconfont icon-collapse nav-control"
			@click="changeCollapse">

<!--		<div class="editMenu">-->
<!--			<router-link to="/editMenu"><p><i class="el-icon-edit"></i>编辑导航</p></router-link>-->
<!--		</div>-->
		<div class="layout-header-info">
			<span class="username">{{username}}</span>
      <el-dropdown trigger="hover" :hide-timeout="200">
        <el-image
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          class="user-avater">
        </el-image>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a"><label @click="personalCenter">个人中心</label></el-dropdown-item>
<!--          <el-dropdown-item command="b">更换账号</el-dropdown-item>-->
<!--          <el-dropdown-item command="c">注销</el-dropdown-item>-->
          <el-dropdown-item command="d"><label @click="handleLoginOut">退出</label></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
<!--			<el-button-->
<!--				type="text"-->
<!--				@click="handleLoginOut">-->
<!--				退出-->
<!--			</el-button>-->
		</div>
	</div>
</template>

<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	import nav_arrow from '@/assets/images/nav_arrow.png';

	export default {
		data() {
			return {
				nav_arrow,
				headerMenu: [
					/*{
                      title: '商品中心',
                      key: 'goodsCenter'
                    },*/
					{
						title: '售后中心',
						key: 'aftersaleCenter',
						permission: ['saleAuth.invoiceManage.queryInvoice', /*'saleAuth.receivableManage.queryReceivables'*/]
					},
					/*{
                      title: '订单中心',
                      key: 'orderCenter'
                    },*/
					{
						title: '返利系统',
						key: 'saleDealerCenter',
						permission: ['saleAuth.rewardSetManager', 'saleAuth.rewardOrderManager', 'saleAuth.rewardSettleManager',
							'saleAuth.storeManager', 'saleAuth.categoryManager', 'saleAuth.dealerManager', 'saleAuth.assistantManager', 'saleAuth.provinceManager']
					},
					{
						title: '权限中心',
						key: 'permissionCenter',
						permission: ['saleAuth.permissionManage']
					}
				]
			};
		},
		computed: {
      ...mapState([
        'userModule'
      ]),
			username() {
				return this.userModule.username;
			},
			routeKey() {
				return this.$route.path.split('/')[1];
			}
		},
    created() {
		  this.getUserName();
    },
		methods: {
			...mapMutations({
				setCollapse: 'setCollapse',
			}),
      ...mapActions({
        getUserName: 'userModule/getUserName',
      }),
			/**
			 * 退出登录
			 */
			async handleLoginOut() {
			  this.$router.push('/login');
				// window.location.href = `${this.$store.state.manageLoginUrl}/logout?redirectUrl=${window.location.href}`;
			},

      personalCenter() {
        this.$message({
          message: '暂无',
          type: 'info'
        });
      },

			/**
			 * 导航栏折叠
			 */
			changeCollapse() {
				this.setCollapse();
			},

			/**
			 * 头部导航栏点击进入第一个有权限的路由
			 * @param key {String} 权限值,即路由第一个参数
			 */
			handleMenuClick(key) {
				this.$store.getters.routes.map((data) => {
					if (data.path.includes(key)) {
						this.$router.push({
							path: this.getPath(data)
						});
					}
				});
			},

			/**
			 * 根据key获取当前第一个跳转路由
			 * @param router {Object} 路由对象
			 * @returns {boolean}
			 */
			getPath(router) {
				let path = router.path;
				let routerArr = router.children;

				while (routerArr && routerArr.length > 0) {
					path += `/${routerArr[0].path}`;
					routerArr = routerArr[0].children;
				}

				return path;
			},
			editMenu() {
			    this.router.push('/editMenu');
			}
		}
	};
</script>

<style scoped>
	.editMenu {
		position: absolute;
		top: 10px;
		left: 90%;
	}
	a {text-decoration:none; color: #ffffff;}
	a:hover {color: #000000}
</style>
