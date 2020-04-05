<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="queryForm.name" placeholder="根据角色名称查询"></el-input>
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="queryForm.name" placeholder="根据权限查询"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="queryForm.status" placeholder="根据状态查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>搜 索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button>新建角色</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="roleList"
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{background: '#eaeaea',color:'#606266'}">
      <el-table-column
        prop="id"
        label="角色编号">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleCode"
        label="权限字符">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="status"
        label="角色状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#409EFF"
            inactive-color="grey"
            @change="transferStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="更新时间">
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editRole">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "Role",
    data() {
      return {
        queryForm: {},
      }
    },
    computed: {
      ...mapState([
        'roleModule'
      ]),
      roleList() {
        return this.roleModule.list;
      }
    },
    methods: {
      ...mapActions({
        getRoleList: 'roleModule/getRoleList'
      }),
      editRole() {

      },
      transferStatus(row) {
        let tip = row.status === 1 ? '解禁' : '禁用';
        this.$confirm('是否' + tip + '该角色?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeStatus({
            id: row.id,
            status: row.status,
          }).then(() => {
            row.status = this.status;
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          });
        }).catch((res) => {
          this.$notify.info({
            title: '取消',
            message: res
          });
        });
      }
    },
    created() {
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
