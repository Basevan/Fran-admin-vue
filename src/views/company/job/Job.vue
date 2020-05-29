<template>
  <div>
    <el-card>
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item>
          <el-input size="medium" v-model="queryForm.idOrName" placeholder="根据职位名称查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="medium" v-model="queryForm.status" clearable filterable placeholder="状态">
            <el-option v-for="option in statusOption" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="searchDepartment">查 询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button size="medium" type="primary" @click="editCompany">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="jobList"
              style="width: 100%; margin-top: 20px;"
              :header-cell-style="{background: '#eaeaea',color:'#606266'}"
              v-loading="loading">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="jobCode"
        label="岗位编码">
      </el-table-column>
      <el-table-column
        prop="jobName"
        label="职位名称">
      </el-table-column>
      <el-table-column
        prop="departmentId"
        label="部门">
        <template slot-scope="scope">
          <el-tag type="info">
            {{transformDepartment(scope.row.departmentId)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#409EFF"
            inactive-color="grey">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot="header" slot-scope="scope">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCompany(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteJob(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="归属部门" prop="departmentId">
          <el-select size="medium" v-model="addForm.departmentId" clearable filterable placeholder="归属部门">
            <el-option v-for="option in departmentList" :label="option.name" :value="option.id"
                       :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位编码" prop="jobCode">
          <el-input v-model="addForm.jobCode" placeholder="请输入岗位编码"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="jobName">
          <el-input v-model="addForm.jobName" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addForm.sort" placeholder="请输入岗位排序"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelEdit('form')">取 消</el-button>
          <el-button @click="confirmEdit('form')" type="primary">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-pagination
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      :total="totalRecord"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  export default {
    name: "Job",
    data() {
      return {
        queryForm: {
          idOrName: '',
          status: '',
          currentPage: 1,
        },
        addVisible: false,
        addForm: {},
        rules: {
          jobCode: [
            {required: true, message: '请输入岗位编码'}
          ],
          jobName: [
            {required: true, message: '请输入员岗位名称'}
          ],
          departmentId: [
            {required: true, message: '请选择部门'}
          ],
        },
        statusOption: [
          {label: '所有', value: 2},
          {label: '启用', value: 1},
          {label: '停用', value: 0},
        ],
      }
    },
    created() {
      this.loadPage();
    },
    computed: {
      ...mapState([
        'jobModule',
        'loading',
        'departmentModule'
      ]),
      jobList() {
        return this.jobModule.jobList;
      },
      currentPage() {
        return this.jobModule.currentPage;
      },
      pageSize() {
        return this.jobModule.pageSize;
      },
      totalRecord() {
        return this.jobModule.totalRecord;
      },
      departmentList() {
        return this.departmentModule.departments;
      }
    },
    methods: {
      ...mapActions({
        getJobList: 'jobModule/jobList',
        updateJob: 'jobModule/updateJob',
        delJob: 'jobModule/delJob',
        getDepartments: 'departmentModule/departments'
      }),
      loadPage() {
        this.getJobList(this.queryForm);
        this.getDepartments();
      },
      searchDepartment() {
        this.loadPage();
      },
      editCompany(row) {
        this.addVisible = true;
        if (row !== undefined) {
          this.addForm = {...row};
        } else {
          this.addForm = {
            jobCode: '',
            jobName: '',
            sort: 0,
            departmentId: 0,
          };
        }
      },

      deleteJob(row) {
        this.$confirm("确定删除这个岗位的信息？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.delJob({
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

      cancelEdit(form) {
        this.$refs[form].resetFields();
        this.addVisible = false;
      },
      confirmEdit(form) {
        this.$refs[form].validate( valid => {
          if (valid) {
            this.updateJob(this.addForm).then(() => {
              this.loadPage();
            });
            this.addVisible = false;
          } else {
            return false;
          }
        })
      },
      // 将部门id装换为名称
      transformDepartment(id) {
        let name = '';
        this.departmentList.forEach(elem => {
          if (elem.id === id) {
            name = elem.name;
          }
        });
        return name;
      },
      // cancelEdit(form) {
      //   this.$refs[form].resetFields();
      //   this.addVisible = false;
      // },
      // confirmEdit(form) {
      //   this.$refs[form].validate( valid => {
      //     if (valid) {
      //       // todo 请求后台接口
      //       this.addVisible = false;
      //     } else {
      //       return false;
      //     }
      //   })
      // },
      handleCurrentChange(val) {
        this.queryForm.currentPage = val;
        this.loadPage(this.queryForm);
      },
    },
  }
</script>

<style scoped>

</style>
