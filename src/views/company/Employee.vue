<template>
  <div>

    <el-card>
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item label="用户名称">
          <el-input v-model="queryForm.name" placeholder="根据用户名称查询"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="queryForm.phone" placeholder="根据电话号码查询"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="queryForm.status" clearable filterable>
            <el-option v-for="option in statusOption" :label="option.label" :value="option.value" :key="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchUser">查 询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="createUser">新建用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="userList"
      style="width: 100%; margin-top: 20px;"
      :header-cell-style="{background: '#eaeaea',color:'#606266'}">
      <el-table-column
        width="100"
        prop="userId"
        label="用户ID">
      </el-table-column>
      <el-table-column
        width="100"
        prop="userName"
        label="登录名称">
      </el-table-column>
      <el-table-column
        width="100"
        prop="userName"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="userMail"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态">

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
        label="修改时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot="header" slot-scope="scope">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="创建用户" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="用户名"></el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "User",
    data() {
      return {
        queryForm: {},
        addForm: {},
        statusOption: [
          { label: '使用中', value: 1 },
          { label: '禁用', value: 0 }
        ],
        addVisible: false,
      }
    },
    computed: {
      ...mapState([
        'userModule'
      ]),
      userList() {
        return this.userModule.userList;
      },
      status() {
        return this.userModule.status;
      }
    },
    methods: {
      ...mapActions({
        getUserList: 'userModule/getUserList',
        changeStatus: 'userModule/changeStatus',
      }),
      searchUser() {},
      createUser() {
        this.addVisible = true;
      },
      editUser(row) {
        console.log(row);
      },
      //改变用户状态
      transferStatus(row) {
        let tip = row.status === 1 ? '解禁' : '禁用';
        this.$confirm('是否' + tip + '该用户?', '温馨提示', {
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
        }).catch(() => {
          this.$notify.info({
            title: '取消',
            message: '已取消修改'
          });
        });
      }
    },
    created() {
      this.getUserList();
    }
  }
</script>

<style scoped>

</style>
