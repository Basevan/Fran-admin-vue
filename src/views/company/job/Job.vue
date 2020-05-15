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
          <el-button size="medium" type="primary" disabled>新 增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="jobList"
              style="width: 100%; margin-top: 20px;"
              :header-cell-style="{background: '#eaeaea',color:'#606266'}">
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
          <el-button type="danger" size="mini">删除</el-button>
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
        'jobModule'
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
      }
    },
    methods: {
      ...mapActions({
        getJobList: 'jobModule/jobList',
      }),
      loadPage() {
        this.getJobList(this.queryForm);
      },
      searchDepartment() {
        this.loadPage();
      },
      editCompany() {

      },
      handleCurrentChange(val) {
        this.queryForm.currentPage = val;
        this.loadPage(this.queryForm);
      },
    },
  }
</script>

<style scoped>

</style>
