<template>
  <div>

    <el-card v-if="!showSearchCard">
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item label="用户名称">
          <el-input v-model="queryForm.userName" placeholder="根据用户名称查询"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="queryForm.userPhone" placeholder="根据电话号码查询"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="queryForm.status" clearable filterable>
            <el-option v-for="option in statusOption" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchUser">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-button v-if="showSearchCard" type="text" size="mini" @click="addRoleUser">增加</el-button>

    <el-table :data="userList"
              style="width: 100%; margin-top: 20px;"
              :header-cell-style="{background: '#eaeaea',color:'#606266'}"
              v-loading="loading">
      <el-table-column
        width="100"
        prop="id"
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
          <el-button v-if="!showSearchCard" type="primary" size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button v-if="!showSearchCard" type="danger" size="mini" @click="delUser(scope.row)">删除</el-button>
          <el-button v-if="showSearchCard" type="primary" size="mini" @click="addRoleUser">增加</el-button>
          <el-button v-if="showSearchCard" type="danger" size="mini" @click="delRoleUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="名字" prop="userName">
          <el-input v-model="addForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="addForm.userPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userMail">
          <el-input v-model="addForm.userMail" placeholder="请输入员工邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelEdit('form')">取 消</el-button>
          <el-button @click="confirmEdit('form')" type="primary">确 定</el-button>
<!--          <el-button @click="confirmEdit('form')" type="info">批量导入</el-button>-->
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="增加角色用户" :visible.sync="addRoleUserVisible" width="80%">
      <el-card>
        <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
          <el-form-item label="用户名称">
            <el-input v-model="queryForm.userName" placeholder="根据用户名称查询"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="queryForm.userPhone" placeholder="根据电话号码查询"></el-input>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-select v-model="queryForm.status" clearable filterable>
              <el-option v-for="option in statusOption" :label="option.label" :value="option.value"
                         :key="option.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchAllUser">查 询</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-table :data="allUser"
                style="width: 100%; margin-top: 20px;"
                :header-cell-style="{background: '#eaeaea',color:'#606266'}">
        <el-table-column
          width="90"
          prop="userId"
          label="用户ID">
        </el-table-column>
        <el-table-column
          width="90"
          prop="userName"
          label="登录名称">
        </el-table-column>
        <el-table-column
          width="90"
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
            {{scope.row.status === 1 ? '应用' : '停用'}}
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
            <el-button v-if="showSearchCard" type="text" size="mini" @click="choseUser(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "User",
    props: ['showSearchCard'],
    data() {
      return {
        queryForm: {},
        addForm: {},
        rules: {
          userName: [
            {required: true, message: '请输入员工名字'}
          ],
          userPhone: [
            {required: true, message: '请输入员工手机号'}
          ],
          userMail: [
            {required: true, message: '请输入员工邮箱'}
          ]
        },
        statusOption: [
          {label: '使用中', value: 1},
          {label: '禁用', value: 0}
        ],
        addVisible: false,
        addRoleUserVisible: false,
      }
    },
    computed: {
      ...mapState([
        'userModule',
        'roleModule',
        'loading'
      ]),
      userList() {
        return this.userModule.userList;
      },
      allUser() {
        return this.userModule.allUser;
      },
      status() {
        return this.userModule.status;
      }
    },
    methods: {
      ...mapActions({
        getUserList: 'userModule/getUserList',
        getAllUser: 'userModule/getAllUser',
        changeStatus: 'userModule/changeStatus',
        saveRoleUser: 'roleModule/saveRoleUser',
        deleteRoleUser: 'roleModule/delRoleUser',
      }),
      searchUser() {
        this.getUserList(this.queryForm);
      },
      searchAllUser() {
        this.getAllUser(this.queryForm);
      },
      createUser() {
        this.addVisible = true;
      },
      editUser(row) {
        this.addVisible = true;
        this.addForm = {...row};
      },
      //改变用户状态
      transferStatus(row) {
        row.status = row.status === 1 ? 0 : 1;
        let tip = row.status === 1 ? '禁用' : '解禁';
        this.$confirm('是否' + tip + '该用户?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = row.status === 1 ? 0 : 1;
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
      },
      cancelEdit(form) {
        this.$refs[form].resetFields();
        this.addVisible = false;
      },
      confirmEdit(form) {
        this.$refs[form].validate( valid => {
          if (valid) {
            // todo 请求后台接口
            this.addVisible = false;
          } else {
            return false;
          }
        })
      },
      // 删除用户
      delUser() {
        this.$confirm("确定删除这个用户的信息？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {

        }).catch((err) => {
          console.log(err);
          this.$notify.info({
            title: '取消',
            message: '已取消删除'
          });
        });
      },
      // 增加角色用户
      addRoleUser() {
        this.getAllUser();
        this.addRoleUserVisible = true;
      },
      // 删除角色用户
      delRoleUser(row) {
        this.$confirm("确定取消该用户与角色的关联？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.deleteRoleUser({
            roleId: this.$route.query.roleId,
            userId: row.id,
          }).then(() => {
            this.$emit('loadPage');
          });
        }).catch((err) => {
          console.log(err);
          this.$notify.info({
            title: '取消',
            message: '已取消删除'
          });
        });
      },
      // 选择用户添加进某个角色
      choseUser(row) {
        let roleId = this.$route.query.roleId || 0;
        let userId = row.id || 0;
        this.saveRoleUser({
          roleId: roleId,
          userId: userId,
        }).then( () => {
          this.addRoleUserVisible = false;
          this.$emit('loadPage');
        });
      },
    },
    created() {
      if (!this.showSearchCard) {
        this.getUserList();
      }
    }
  }
</script>

<style scoped>

</style>
