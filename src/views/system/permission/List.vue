<template>
  <div class="box">

    <div class="route-permission-list">
      <h3>路由权限列表</h3>
      <el-card>

        <el-tree
          :data="getRoute"
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>

      </el-card>
    </div>

    <div class="operation-permission-list">
      <h3>操作权限列表</h3>
      <el-card>
        <el-tree
          :data="operationList"
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>
      </el-card>
    </div>

  </div>
</template>

<script>
  import router from '../../../router/index';

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
      }
    },
    computed: {
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
    },
    methods: {
      // 选中节点
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
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

</style>
