<template>
  <div>
    <el-card>
      <el-form v-model="queryForm" :inline="true" label-width="80px" label-position="left">
        <el-form-item>
          <el-input size="medium" v-model="queryForm.name" clearable placeholder="根据部门名称查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="medium" v-model="queryForm.type" clearable filterable placeholder="机构类型">
            <el-option v-for="option in company" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
          </el-select>
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
          <el-button size="medium" type="primary" @click="editCompany()">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="departmentList"
              style="width: 100%; margin-top: 20px;"
              :header-cell-style="{background: '#eaeaea',color:'#606266'}"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              row-key="id"
              v-loading="loading">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
        <template slot-scope="scope">
          <el-tag :type="transform(scope.row.type).tagType">
            {{transform(scope.row.type).type}}
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
          <el-button type="danger" size="mini" @click="deleteDepartment(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="部门类型" prop="type">
          <el-select size="medium" v-model="addForm.type" clearable filterable placeholder="部门类型">
            <el-option  v-for="option in company" :label="option.label" :value="option.value"
                        :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级部门" prop="superiorId">
          <el-select size="medium" v-model="addForm.superiorId" clearable filterable placeholder="上级部门">
            <el-option v-for="option in departments" :label="option.name" :value="option.id"
                       :key="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addForm.sort" placeholder="请输入员工拍素"></el-input>
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
    name: "Department",
    data() {
      return {
        queryForm: {
          name: '',
          status: '',
          companyId: '',
          currentPage: 1,
        },
        addVisible: false,
        addForm: {

        },
        rules: {
          name: [
            {required: true, message: '请输入员工名字'}
          ],
          superiorId: [
            {required: true, message: '请选择上级部门'}
          ],
          type: [
            {required: true, message: '请选择部门类型'}
          ],
        },
        statusOption: [
          {label: '所有', value: 2},
          {label: '启用', value: 1},
          {label: '停用', value: 0},
        ],
        company: [
          {label: '总公司', value: 0},
          {label: '分公司', value: 1},
          {label: '部门', value: 2},
        ]
      }
    },
    created() {
      this.loadPage();
    },
    computed: {
      ...mapState([
        'departmentModule',
        'loading'
      ]),
      departmentList() {
        return this.departmentModule.departmentList;
      },
      departments() {
        return this.departmentModule.departments;
      },
    },
    methods: {
      ...mapActions({
        getDepartmentList: 'departmentModule/departmentList',
        getDepartments: 'departmentModule/departments',
        update: 'departmentModule/update',
        delete: 'departmentModule/delete',
      }),
      loadPage() {
        this.getDepartmentList(this.queryForm);
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
            type: 2,
            superiorId: '',
            name: '',
            sort: 0,
          };
        }
      },
      deleteDepartment(row) {
        this.$confirm("确定删除这个部门的信息？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          this.delete({
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
            this.update(this.addForm).then(() => {
              this.loadPage();
            });
            this.addVisible = false;
          } else {
            return false;
          }
        })
      },
      // 转换部门类型为汉字
      transform(type) {
        if (type === 0 ) {
          return { type: '总公司', tagType: 'success'};
        }if (type === 1 ) {
          return { type: '分公司', tagType: 'warning'};
        }if (type === 2 ) {
          return { type: '部门', tagType: 'info'};
        }
      }
    },
  }
</script>

<style scoped>

</style>
