<template>
  <div>
    <el-card>
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item>
          <el-input size="medium" v-model="queryForm.titleName" clearable placeholder="根据职称名称查询"></el-input>
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
          <el-button size="medium" type="primary" @click="editTitle">新 增</el-button>
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
        prop="titleName"
        label="职称名称">
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
        prop="updatedTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot="header" slot-scope="scope">
          <label>操作</label>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editTitle(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteTitle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="职称名称" prop="titleName">
          <el-input v-model="addForm.titleName" placeholder="请输入职称名称"></el-input>
        </el-form-item>
        <el-form-item label="职称状态" prop="status">
          <el-select size="medium" v-model="addForm.status" clearable filterable placeholder="职称状态">
            <el-option v-for="option in status" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
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
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "Title",
    data() {
      return {
        queryForm: {
          titleName: '',
          status: '',
          currentPage: 1,
        },
        addForm: {},
        addVisible: false,
        rules: {
          titleName: [
            {required: true, message: '请输入岗位编码'}
          ],
          status: [
            {required: true, message: '请输入员岗位名称'}
          ],
        },
        statusOption: [
          {label: '所有', value: 2},
          {label: '启用', value: 1},
          {label: '停用', value: 0},
        ],
        status: [
          {label: '启用', value: 1},
          {label: '停用', value: 0},
        ],
      }
    },
    computed: {
      ...mapState([
        'titleModule',
        'loading'
      ]),
      jobList() {
        return this.titleModule.jobList;
      },
      currentPage() {
        return this.titleModule.currentPage;
      },
      pageSize() {
        return this.titleModule.pageSize;
      },
      totalRecord() {
        return this.titleModule.totalRecord;
      },
    },
    methods: {
      ...mapActions({
        getTitleList: 'titleModule/titleList',
      }),
      loadPage() {
        this.getTitleList(this.queryForm);
      },
      searchDepartment() {
        this.loadPage(this.queryForm);
      },
      editTitle(row) {
        this.addVisible = true;
        if (row !== undefined) {
          this.addForm = {...row};
        } else {
          this.addForm = {
            titleName: '',
            status: 1,
          };
        }
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
      deleteTitle(row) {
        this.$confirm("确定删除这个职称的信息？","提示",{
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
