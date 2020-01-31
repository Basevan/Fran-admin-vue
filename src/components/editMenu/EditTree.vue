<template>
  <div>

    <!-- 树形菜单 -->
    <div class="tree-box" >
      <el-tree :data="treeList" :props="defaultProps" accordion @node-click="handleNodeClick">
      </el-tree>
    </div>

    <div class="edit-blank-box">
      <div class="view-box">

        <!-- 展示框 -->
        <el-table
          :data="tableData"
          :stripe="true"
          :header-cell-style="{background: '#CBD4DE',color:'#606266'}">
          <el-table-column
            prop="id"
            label="id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="label"
            label="名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="domain"
            label="域名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="uri"
            label="路径"
            width="200">
          </el-table-column>
          <el-table-column
            prop="icon"
            label="图标"
            width="200">
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <label>操作</label>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>

        <p style="font-size: 12px">共找到 {{tableData.length}} 条记录</p>
      </div>

      <!-- 编辑对话框 -->
      <div>
        <el-dialog title="编辑" :visible.sync="handleEditView">
          <el-form label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.label"></el-input>
            </el-form-item>
            <el-form-item label="域名">
              <el-input v-model="formLabelAlign.domain"></el-input>
            </el-form-item>
            <el-form-item label="uri">
              <el-input v-model="formLabelAlign.uri"></el-input>
            </el-form-item>
            <el-form-item label="icon">
              <el-input v-model="formLabelAlign.icon"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleEditViewCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditViewConfirm(formLabelAlign)">确 定</el-button>
          </div>
        </el-dialog>

      </div>

    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Edit",
        props: [
        ],
        data(){
            return{
                //弹出对话框的数据列表
                formLabelAlign: {
                    id: null,
                    label: '',
                    domain: '',
                    uri: '',
                    icon: '',
                },
                //是否展示编辑框
                handleEditView: false,
                //树形列表数据
                treeList: [],
                // data: null,
                defaultProps: {
                    id: "id",
                    label: "label",
                    children: "children",
                },
                //展示框数据
                tableData: [],

            }
        },
        created(){
            axios.get('http://localhost:8110/menu/getAllMenu').then(res=>{
                let list = res.data.data.menus;
                this.changeToTree(list);
            }).then(error=>{
                console.log(error);
            });
        },
        methods:{
            //点击数形列表，将选中的内容展示到展示框
            handleNodeClick(data) {
                this.tableData = [];
                this.tableData.push(data);
                if (data.children != null){
                    data.children.forEach( el => {
                        this.tableData.push(el);
                        if (el.children != null){
                            el.children.forEach( elem => {
                                this.tableData.push(elem);
                            })
                        }
                    })
                }
            },
            //变为树形列表
            changeToTree(list){
                list.forEach(element => {
                    let type = element.type === 0 ? '目录' : '菜单';
                    let temp1 = {
                        id: element.id,
                        label: element.name,
                        domain: element.domain,
                        uri: element.uri,
                        type: type,
                        icon: element.icon,
                        children: []
                    };
                    if (element.sub_menus != null){
                        element.sub_menus.forEach( el =>{
                            let type = el.type === 0 ? '目录' : '菜单';
                            let temp2 = {
                                id: el.id,
                                label: el.name,
                                domain: el.domain,
                                uri: el.uri,
                                type: type,
                                icon: el.icon,
                                children: []
                            };
                            if (el.sub_menus != null){
                                el.sub_menus.forEach( elem => {
                                    let type = elem.type === 0 ? '目录' : '菜单';
                                    let temp3 = {
                                        id: elem.id,
                                        label: elem.name,
                                        domain: el.domain,
                                        uri: elem.uri,
                                        type: type,
                                        icon: elem.icon,
                                        children: []
                                    };
                                    temp2.children.push(temp3);
                                })
                            }
                            temp1.children.push(temp2);
                        })
                    }
                    this.treeList.push(temp1);
                });
            },
            //edit按钮
            handleEdit(row) {
                this.handleEditView = true;
                this.formLabelAlign.id = row.id;
                this.formLabelAlign.label = row.label;
                this.formLabelAlign.domain = row.domain;
                this.formLabelAlign.uri = row.uri;
                this.formLabelAlign.icon = row.icon;
            },
            //delete按钮
            handleDelete(data) {
                this.$confirm("确定？","提示",{
                  type: "warning",
                }).then(() => {
                  let index = 9999;
                  let temp = 0;
                  this.tableData.forEach(el => {
                      if (data.id === el.id){
                          index = temp;
                          let data = new FormData();
                          data.append('id',el.id);
                          this.$axios.post('http://localhost:8110/menu/delete',data).then(res => {
                              if (res.data.code === 200){
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success'
                                  });
                              }
                              else {
                                  this.$message.error('操作失误');
                              }
                          })
                      }
                      temp++;
                  });
                  this.tableData.splice(index,1);
                  this.treeList.splice(index,1);
                }).catch(() => {
                });
            },
            //取消编辑按钮
            handleEditViewCancel(){
                this.handleEditView = false;
            },
            //提交编辑过后的按钮
            handleEditViewConfirm(data){
                this.handleEditView = false;
                //修改展示面板
                this.tableData.forEach(element =>{
                   if (data.id === element.id){
                       element.label = data.label;
                       element.domain = data.domain;
                       element.uri = data.uri;
                       element.icon = data.icon;
                   }
                });
                //修改树形列表
                this.treeList.forEach(element =>{
                    console.log(this.treeList.length);
                    //这里只修改到最外层的label
                    if (data.id === element.id){
                        element.label = data.label;
                    }
                });
                //提交数据
                let dataList = new FormData();
                dataList.append('id',data.id);
                dataList.append('domain',data.domain);
                dataList.append('uri',data.uri);
                dataList.append('name',data.label);
                dataList.append('icon',data.icon);
                this.$axios.post('http://localhost:8110/menu/update',dataList).then( res => {
                    console.log(res.data.code);
                })
            }
        },
    }
</script>

<style scoped>
  .tree-box{
    position: absolute;
    width: 20px;
  }
  .edit-blank-box{
    position: absolute;
    left: 10%;
    width: 90%;
    height: 700px;
    background: whitesmoke;
  }
  .view-box{
    position: absolute;
    left: 1%;
    width: 97%;
  }
</style>
