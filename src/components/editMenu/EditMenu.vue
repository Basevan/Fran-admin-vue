<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :header-cell-style="{background: '#CBD4DE',color:'#606266'}">>
      <el-table-column
        prop="name"
        label="名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="80">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="domain"
        label="域名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="uri"
        label="路径"
        width="150">
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleAdd(scope.$index, scope.row)">新增</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form :modal="dialogData" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单：">
              <el-input placeholder="请输入内容" v-model="dialogData.pName" class="input-with-select" disabled>
                <el-button slot="append" icon="el-icon-search" type="primary" plain @click="searchParent"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型：" prop="type">
              <el-radio-group v-model="dialogData.type">
                <el-radio label="目录">目录</el-radio>
                <el-radio label="菜单">菜单</el-radio>
              </el-radio-group>
              <label v-if="title === '新增'" style="font-size: smaller;color: #cbcbcb">如不选择，默认为菜单</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="域名：" prop="domain">
              <el-input v-model="dialogData.domain" v-if="dialogData.pid === 0 || dialogData.pid === undefined" placeholder="输入时请加上 'http://' 或 'https://'"></el-input>
              <label v-else-if="title === '编辑'">{{dialogData.domain}}</label>
              <label v-else>#</label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="路径：" prop="uri">
              <el-input v-model="dialogData.uri"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="dialogData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item label="图标：" prop="icon">
              <el-input v-model="dialogData.icon"> <el-button slot="prepend" :icon="dialogData.icon"></el-button></el-input></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="dialogData.sort" placeholder="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 树形列表对话框 -->
    <el-dialog :visible.sync="openTree" width="300px">
      <el-input v-model="treeNode.name">
        <el-button slot="append"  @click="confirmParent">确定</el-button>
      </el-input>
      <el-tree node-key="id" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :default-expanded-keys="defaultExpandedArray">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "EditMenu",
        data(){
            return {
                //弹出框是否被显示
                open: false,
                //树形列表是否显示
                openTree: false,
                //树节点名称
                treeNode: {},
                //弹出框标题
                title: '',
                //弹出框数据
                dialogData: {},
                //old
                oldDialogFData: {},
                //表格数据
                tableData: [],
                //树数据
                treeData: [],
                //获取某一行数据，与弹出框相联系
                oneLine: {},
                //树形列表默认展开节点的key
                defaultExpandedArray: [],
                defaultProps: {
                    label: "name",
                    children: "children",
                },
            }
        },
        created(){
            axios.get('http://localhost:8110/menu/getAllMenu').then(res=>{
                let list = res.data.data.menus;
                this.changeToTree(list,0);
            }).then(error=>{
                console.log(error);
            });
            axios.get('http://localhost:8110/menu/getAllmenu').then(res=>{
                let list = res.data.data.menus;
                this.changeToTree(list,1);
            }).then(error=>{
                console.log(error);
            });
        },
        methods: {
            //点击树节点触发的事件
            handleNodeClick(data){
                this.treeNode = {
                    id: data.id,
                    name: data.name,
                    domain: data.domain,
                    type: data.type,
                }
            },
            //搜索父节点
            searchParent(){
                this.openTree = true;
            },
            //确认找到父节点
            confirmParent(){
                //设置值
                this.dialogData.pName = this.treeNode.name;
                this.dialogData.pid = this.treeNode.id;
                // if(this.title === '新增'){
                //     this.dialogData.doamin = this.treeNode.name;
                // }
                if (this.treeNode.type === "菜单") {
                    this.$confirm("菜单下面不能再编辑子级了",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: "error"
                    })
                }
                else {
                    this.treeNode = {};
                    //然后隐藏对话框
                    this.openTree = false;
                }
            },
            //清空oneLine
            resetLine(){
                this.dialogData = {};
            },
            //寻找pid的名称
            parentLabel(pid){
                if (pid === 0){
                    return "根目录";
                }
                let label = "";
                this.tableData.forEach( el => {
                    if (el.id === pid){
                        label = el.name;
                    }
                    else if(el.children != null){
                        el.children.forEach( elem => {
                            if (elem.id === pid){
                                label = elem.name;
                            }
                        })
                    }
                });
                return label;
            },
            //编辑按钮
            handleEdit(index,row){
                this.open = true;
                this.title = "编辑";
                this.oneLine = row;
                this.oneLine.pName = this.parentLabel(row.pid);
                this.dialogData = {
                    pid: row.pid,
                    pName: this.oneLine.pName,
                    type: row.type,
                    domain: row.domain,
                    uri: row.uri,
                    name: row.name,
                    icon: row.icon,
                    sort: row.sort,
                    level: row.level,
                };
            },
            //新增按钮
            handleAdd(index,row){
                this.open = true;
                this.title = "新增";
                this.dialogData = {
                    pid: row.pid,
                    pName: this.parentLabel(row.pid),
                    domain: '',
                    uri: '',
                    name: '',
                }
            },
            //删除按钮
            handleDelete(index,row){
                if (row.children.length !== 0){
                    this.$confirm('您不能删除带有子菜单的目录','提示',{
                        type: 'error',
                    });
                }
                else {
                    this.$confirm("确定删除这条记录？","提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: "warning"
                    }).then(() => {
                        let data = new FormData();
                        data.append('id',row.id);
                        this.$axios.post('http://localhost:8110/menu/delete',data).then(res => {
                            if (res.data.code === 200){
                                this.$router.replace("/editMenu");
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                })
                            }
                            else {
                                this.$message.error('操作失误');
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })

                }
            },
            //取消编辑、添加
            handleCancel(){
                this.resetLine();
                this.open = false;
            },
            //提交编辑、添加
            handleConfirm(){
                if (this.hasChange()){
                    if ("编辑" === this.title) {
                        let data = new FormData();
                        data.append('id',this.oneLine.id);
                        data.append('domain',this.dialogData.domain);
                        data.append('uri',this.dialogData.uri);
                        data.append('name',this.dialogData.name);
                        data.append('icon',this.dialogData.icon);
                        data.append('sort',this.dialogData.sort);
                        axios.post('http://localhost:8110/menu/update',data).then(res => {
                            if (res.data.code === 200){
                                this.$router.replace("/editMenu");
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
                    else {
                        console.log(this.dialogData);
                        this.oneLine.pName = this.dialogData.pName;
                        this.oneLine.pid = this.dialogData.pid;
                        this.oneLine.type = this.dialogData.type;
                        this.oneLine.domain = this.dialogData.domain === undefined ? '#' : this.dialogData.domain;
                        this.oneLine.uri = this.dialogData.uri;
                        this.oneLine.name = this.dialogData.name;
                        this.oneLine.icon = this.dialogData.icon === undefined ? 'el-icon-menu' : this.dialogData.icon;
                        this.oneLine.sort = this.dialogData.sort === undefined ? 1 : this.dialogData.sort;
                        let data = new FormData();
                        let type = this.oneLine.type === '目录' ? 0 : 1;
                        data.append('pid',this.oneLine.pid);
                        data.append('type', type);
                        data.append('domain',this.oneLine.domain);
                        data.append('uri',this.oneLine.uri);
                        data.append('name',this.oneLine.name);
                        data.append('icon',this.oneLine.icon);
                        data.append('sort',this.oneLine.sort);
                        axios.post('http://localhost:8110/menu/add',data).then(res => {
                            if (res.data.code === 200){
                                this.$router.replace("/editMenu");
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                            else {
                                this.$message.error('操作失误,' + res.data.msg);
                            }
                        });

                    }
                }
                else {
                    this.$message('您的操作没有产生任何变动');
                }
                this.resetLine();
                this.open = false;
            },

            //是否改动
            hasChange(){
                let dialog = this.dialogData;
                let oneLine = this.oneLine;
                let flag = false;
                if (dialog.domain != oneLine.domain){
                    flag = true;
                }
                if (dialog.name != oneLine.name){
                    flag = true;
                }
                if (dialog.uri != oneLine.uri){
                    flag = true;
                }
                if (dialog.icon != oneLine.icon){
                    flag = true;
                }
                if (dialog.sort != oneLine.sort){
                    flag = true;
                }
                return flag
            },

            //变为树形列表
            changeToTree(list,index){
                if (index === 1) {this.treeData.push({id: 0,name: '根目录'});}
                list.forEach(element => {
                    this.defaultExpandedArray.push(element.id);
                    let form = element.type === 0 ? '目录' : '菜单';
                    let temp1 = element;
                    temp1.type = form;
                    temp1.level = 3;
                    temp1.children = [];
                    if (element.subMenus != null){
                        element.subMenus.forEach( el =>{
                            let form = el.type === 0 ? '目录' : '菜单';
                            let temp2 = el;
                            temp2.type = form;
                            temp2.level = 2;
                            temp2.children = [];
                            if (el.subMenus != null){
                                el.subMenus.forEach( elem => {
                                    let temp3 = elem;
                                    temp3.type = "菜单";
                                    temp3.level = 1;
                                    temp3.children = [];
                                    temp2.children.push(temp3);
                                })
                            }
                            temp1.children.push(temp2);
                        })
                    }
                    if (index === 0) {this.tableData.push(temp1);}
                    else {
                        this.treeData.push(temp1);
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
