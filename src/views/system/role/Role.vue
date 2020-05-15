<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="queryForm.roleName" clearable placeholder="根据角色名称查询"></el-input>
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="queryForm.roleCode" clearable placeholder="根据权限查询"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" clearable filterable>
            <el-option v-for="option in statusOption" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchRole">搜 索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="createRole">新建角色</el-button>
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
            @click.native="transferStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="更新时间"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-popover
            placement="left-start"
            width="240"
            trigger="hover">
            <el-button type="danger" size="mini" @click="editRole(scope.row)">删 除</el-button>
            <el-button type="info" size="mini" @click="addUser(scope.row)">添加用户</el-button>
            <el-button type="primary" size="mini" @click="editRole(scope.row)">编 辑</el-button>
            <label slot="reference"><i class="el-icon-edit"></i></label>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑/新增角色" :visible.sync="editVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限字符" prop="roleCode">
          <el-input v-model="addForm.roleCode" placeholder="请输入权限字符"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addForm.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelEdit('form')">取 消</el-button>
          <el-button @click="confirmEdit('form')" type="primary">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "Role",
    data() {
      return {
        editVisible: false,
        queryForm: {},
        addForm: {},
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称' }
          ],
          roleCode: [
            { required: true, message: '请输入权限字符' }
          ],
        },
        statusOption: [
          {label: '使用中', value: 1},
          {label: '禁用', value: 0}
        ],
      }
    },
    computed: {
      ...mapState([
        'roleModule'
      ]),
      roleList() {
        return this.roleModule.list;
      },
      status() {
        return this.roleModule.status;
      }
    },
    methods: {
      ...mapActions({
        getRoleList: 'roleModule/getRoleList',
        changeStatus: 'roleModule/changeStatus',
        saveRole: 'roleModule/saveRole',
      }),
      loadPage() {
        this.getRoleList();
      },
      // 搜索
      searchRole() {},
      // 新建角色
      createRole() {
        this.addForm = {
          sort: this.roleList.length + 1,
        };
        this.editVisible = true;
      },
      editRole(row) {
        this.addForm = {...row};
        this.editVisible = true;
      },
      // 为角色添加用户
      addUser(row) {
        this.$router.push({
          path: '/system/role/user',
          query: {
            roleId: row.id,
          }
        });
      },
      transferStatus(row) {
        row.status = row.status === 1 ? 0 : 1;
        let tip = row.status === 1 ? '禁用' : '解禁';
        this.$confirm('是否' + tip + '该角色?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeStatus({
            id: row.id,
            status: row.status === 0 ? 1 : 0,
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
      },
      cancelEdit(form) {
        this.$refs[form].resetFields();
        this.editVisible = false;
      },
      confirmEdit(form) {
        this.$refs[form].validate( valid => {
          if (valid) {
            this.saveRole(this.addForm).then(() => {
              this.loadPage();
              this.editVisible = false;
            });
          } else {
            return false;
          }
        })
      },
    },
    created() {
      this.loadPage();
    }
  }
</script>

<style scoped>

</style>
