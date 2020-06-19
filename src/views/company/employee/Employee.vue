<template>
  <div>
    <el-card>
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item>
          <el-input v-model="queryForm.employeeName" clearable placeholder="根据用户名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="medium" v-model="queryForm.department" clearable filterable placeholder="归属部门">
            <el-option v-for="option in departmentList" :label="option.name" :value="option.id"
                       :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select size="medium" v-model="queryForm.job" clearable filterable placeholder="根据岗位查询">
            <el-option v-for="option in jobList" :label="option.jobName" :value="option.id"
                       :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryForm.status" clearable filterable placeholder="用户状态">
            <el-option v-for="option in statusOption" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchUser">查 询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="createUser" disabled>录入新员工</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="employeeList"
              style="width: 100%; margin-top: 20px;"
              :header-cell-style="{background: '#eaeaea',color:'#606266'}"
              v-loading="loading">
      <el-table-column
        prop="employeeName"
        label="员工名称">
      </el-table-column>
      <el-table-column
        prop="employeeMail"
        label="邮箱">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="邮箱"
            width="200"
            trigger="hover"
            :content="scope.row.employeeMail">
            <label slot="reference" >{{changeMail(scope.row.employeeMail)}}</label>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="employeePhone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="job"
        label="岗位">
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
        label="操作">
        <template slot="header" slot-scope="scope">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="editUser(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delEmployee(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      :total="totalRecord"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="编辑/创建用户" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="名字" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入员工邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelEdit('form')">取 消</el-button>
          <el-button @click="confirmEdit('form')" type="primary">确 定</el-button>
          <el-button @click="confirmEdit('form')" type="info">批量导入</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "Employee",
    data() {
      return {
        queryForm: {
          employeeName: '',
          department: '',
          job: '',
          status: '',
          currentPage: 1,
        },
        addForm: {},
        rules: {
          name: [
            {required: true, message: '请输入员工名字'}
          ],
          phone: [
            {required: true, message: '请输入员工手机号'}
          ],
          email: [
            {required: true, message: '请输入员工邮箱'}
          ]
        },
        statusOption: [
          {label: '使用中', value: 1},
          {label: '禁用', value: 0}
        ],
        addVisible: false,
      }
    },
    computed: {
      ...mapState([
        'employeeModule',
        'departmentModule',
        'jobModule',
        'loading',
      ]),
      employeeList() {
        return this.employeeModule.employeeList;
      },
      currentPage() {
        return this.employeeModule.currentPage;
      },
      pageSize() {
        return this.employeeModule.pageSize;
      },
      totalRecord() {
        return this.employeeModule.totalRecord;
      },
      departmentList() {
        return this.departmentModule.departments;
      },
      jobList() {
        return this.jobModule.jobList;
      },
    },
    methods: {
      ...mapActions({
        getEmployeeList: 'employeeModule/employeeList',
        delEmployees: 'employeeModule/delEmployee',
        getDepartments: 'departmentModule/departments',
        getJobList: 'jobModule/jobList',
      }),
      loadPage() {
        this.getEmployeeList(this.queryForm);
        this.getDepartments();
        this.getJobList({
          currentPage: 1,
          pageSize: 20,
        });
      },
      searchUser() {
        this.getEmployeeList(this.queryForm);
      },
      createUser() {
        this.addVisible = true;
      },
      editUser(row) {
        this.$router.push({
          name: 'employeeDetail',
          params: {
            detail: row,
          }
        })
      },
      delEmployee(row) {
        this.$confirm("确定删除这个员工的信息？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.delEmployees({
            id: row.id,
          }).then(() => {
            this.loadPage();
          });
        }).catch((err) => {
          console.log(err);
          this.$notify.info({
            title: '取消',
            message: '已取消删除'
          });
        });
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
        }).catch((err) => {
          console.log(err);
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
      changeMail(mail) {
        return mail.substring(0,mail.indexOf('@'));
      },
      handleCurrentChange(val) {
        this.queryForm.currentPage = val;
        this.loadPage(this.queryForm);
      },
    },
    created() {
      this.loadPage();
    }
  }
</script>

<style scoped>

</style>
