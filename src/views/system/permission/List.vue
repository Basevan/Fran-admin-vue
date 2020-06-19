<template>
  <div class="box">
    <div>
      <el-card>
        <h3>权限列表</h3>
        <el-divider></el-divider>
        <el-checkbox v-if="all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="permission in getPermissionList" :label="permission.id" :key="permission.id">{{permission.name}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
    </div>
<!--    <div class="route-permission-list">-->
<!--      <h3>路由权限列表</h3>-->
<!--      <el-card>-->

<!--        <el-tree-->
<!--          :data="getRoute"-->
<!--          show-checkbox-->
<!--          @check-change="handleCheckChange">-->
<!--        </el-tree>-->

<!--      </el-card>-->
<!--    </div>-->

<!--    <div class="operation-permission-list">-->
<!--      <h3>操作权限列表</h3>-->
<!--      <el-card>-->
<!--        <el-tree-->
<!--          :data="operationList"-->
<!--          show-checkbox-->
<!--          @check-change="handleCheckChange">-->
<!--        </el-tree>-->
<!--      </el-card>-->
<!--    </div>-->

    <div class="button-list">
      <el-button v-if="back" @click="goBack">返 回</el-button>
      <el-button v-if="confirm" type="primary" @click="confirmEdit">确定分配</el-button>
    </div>

  </div>
</template>

<script>
  import router from '../../../router/index';
  import {mapState, mapActions} from 'vuex';
  import {$goBack} from "../../../utils/vueUtil";
  export default {
    name: "List",
    data() {
      return {
        router,
        operationList: [
          {
            label: '公司管理',
            children: [
              {
                label: '员工管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '岗位管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '部门管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },{
                label: '职称管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              }
            ]
          },
          {
            label: '系统管理',
            children: [
              {
                label: '用户管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '角色管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '权限列表',
                children: [
                  {label: '查询'},
                ]
              },{
                label: '菜单管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '字典管理',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '参数设置',
                children: [
                  {label: '删除'},
                  {label: '新建'},
                  {label: '详情'},
                  {label: '查询'},
                ]
              },
              {
                label: '日志管理',
                children: [
                  {label: '查询'},
                ]
              }
            ]
          },
          {
            label: '消息',
            children: [
              {label: '我的消息'}
            ]
          },
          {
            label: '流程',
            children: [
              {label: '我的流程'}
            ]
          }
        ],
        back: false,
        confirm: false,
        all: false,
        checkAll: false,
        checkedCities: [],
        isIndeterminate: true
      }
    },
    created() {
      if (this.$route.query.roleId !== undefined) {
        this.back = true;
        this.confirm = true;
        this.all = true;
      }
      this.loadPage();
    },
    computed: {
      ...mapState([
        'roleModule'
      ]),
      getRoute() {
        let routeList = [];
        this.router.options.routes.forEach( elem => {
          if (elem.hidden) {
            return;
          } else {
            let label = '';
            if (elem.meta !== undefined) {
              label = elem.meta.title;
            }
            let node = {
              label: label,
              children: []
            };
            if (elem.children !== undefined) {
              elem.children.forEach(route => {
                node.children.push({
                  label: route.meta.title,
                })
              })
            }

            routeList.push(node);
          }
        });
        return routeList;
      },
      getPermissionList() {
        return this.roleModule.permissionList;
      },
      rolePermissionList() {
        return this.roleModule.rolePermissionList;
      },
    },
    methods: {
      ...mapActions({
        permissionList: 'roleModule/permissionList',
        getRolePermissionList: 'roleModule/rolePermissionList',
        updateRolePermissionList: 'roleModule/updateRolePermissionList',
      }),
      // 选中节点
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      goBack() {
        this.$router.go(-1);
      },
      confirmEdit() {
        //  去重
        this.checkedCities = Array.from(new Set(this.checkedCities));

        this.updateRolePermissionList({
          roleId: this.$route.query.roleId,
          permissions: this.checkedCities,
        }).then(() => {
          this.goBack();
        });

      },
      handleCheckAllChange(val) {
        if (val) {
          this.getPermissionList.forEach( elem => {
            this.checkedCities.push(elem.id);
          });
        } else {
          this.checkedCities = [];
        }
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.getPermissionList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.getPermissionList.length;
      },
      loadPage() {
        this.permissionList();
        if (this.$route.query.roleId !== undefined) {
          this.getRolePermissionList({
            roleId: this.$route.query.roleId,
          }).then(() => {
            this.checkedCities = this.rolePermissionList;
          });
        }
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>

  .box {
    position: relative;
  }

  .route-permission-list {
    position: absolute;
    top: 0;
    left: 5%;
    width: 40%;
  }

  .operation-permission-list {
    position: absolute;
    top: 0;
    right: 5%;
    width: 40%;
  }

  .button-list {
    position: absolute;
    top: 300px;
    left: 40%;
  }

</style>
