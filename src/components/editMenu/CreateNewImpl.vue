<template>
  <div>
    <div class="input-box">
      <el-form :model="form" status-icon ref="form" label-width="100px" label-position="right">
        <!--      <el-form-item label="层级">-->
        <!--        <el-select v-model="levelValue" placeholder="请选择层级">-->
        <!--          <el-option-->
        <!--            v-for="item in options"-->
        <!--            :key="item.value"-->
        <!--            :label="item.label"-->
        <!--            :value="item.value">-->
        <!--          </el-option>-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->

        <el-form-item label="类型"  :rules="[{required:true, trigger: 'blur'}]">
          <el-select v-model="typeValue" clearable placeholder="请选择类型">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称" prop="name" :rules="[{required:true, message: '请输入名称', trigger: 'blur'}]">
          <el-input v-model="form.name" placeholer="名称"></el-input>
        </el-form-item>

        <el-form-item label="域名" prop="domain" :rules="[{required:true, message: '请输入域名', trigger: 'blur'}]">
          <el-input v-model="form.domain" placeholer="名称"></el-input>
        </el-form-item>

        <el-form-item label="uri" prop="uri" :rules="[{required:true, message: '请输入uri', trigger: 'blur'}]">
          <el-input v-model="form.uri" placeholer="名称"></el-input>
        </el-form-item>

        <el-form-item label="icon" prop="icon" :rules="[{required:true, message: '请输入icon', trigger: 'blur'}]">
          <el-input v-model="form.icon" placeholer="名称"></el-input>
        </el-form-item>

        <el-form-item label="选择父节点" :rules="[{required:true, trigger: 'blur'}]">
          <el-select v-model="parentValue" clearable placeholder="请选择父节点">
            <el-option
              v-for="item in parentNode"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form',typeValue,parentValue)">立即创建</el-button>
          <el-button @click="handleCloseDrawer('form')">清空</el-button>
        </el-form-item>

      </el-form>

<!--      {{all}}-->
    </div>

    <div class="temp"> </div>

    <div class="history-class" v-if="seeHistory">
      <label style="font-size: smaller;color: red">上一次添加记录</label>
      <el-form>
        <el-form-item label="类型" ></el-form-item>
        <el-form-item label="名称" ></el-form-item>
        <el-form-item label="域名" ></el-form-item>
        <el-form-item label="uri" ></el-form-item>
        <el-form-item label="icon" ></el-form-item>
        <el-form-item label="父节点" ></el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "CreateNewImpl",
        data(){
            return{
                seeHistory: false,
                //层级选项表
                options: [{
                    value: '1',
                    label: '一级'
                }, {
                    value: '2',
                    label: '二级'
                }, {
                    value: '3',
                    label: '三级'
                }],
                //类型选择表
                typeOption: [
                    {
                      value: 0,
                      label: '目录',
                    },
                    {
                        value: 1,
                        label: '菜单'
                    }
                ],
                //父节点
                parentNode: [
                    // {
                    //     id: null,
                    //     name: '',
                    // }
                ],
                parentValue: '',
                levelValue: '',
                typeValue: '',
                //需要提交的数据
                form: {
                    pid: null,
                    type: null,
                    name: '',
                    domain: '',
                    uri: '',
                    icon: '',
                },
                history: [],
            }
        },
        created() {
            axios.get('http://localhost:8110/menu/getContent').then(res => {
                let data = res.data.data.menus;
                console.log(data);
                this.addParentValue(data);
            })
        },
        methods: {
            //给父节点选项框 添加选项
            addParentValue(data){
                let temp1 = {
                    id: 0,
                    name: '根目录',
                };
                this.parentNode.push(temp1);
                data.forEach(element => {
                    let temp = {
                        id: element.id,
                        name: element.name,
                    };
                    this.parentNode.push(temp);
                });
            },
            handleCloseDrawer(form) {
                this.$confirm('确定','提示',{
                    type: 'warning'
                }).then(() => {
                    this.$refs[form].resetFields();
                    this.typeValue = '';
                    this.parentValue = '';
                })
            },
            onSubmit(form,type,parentId){
                this.$refs[form].validate( (valid)=> {
                    if (valid) {
                        this.form.type = type;
                        this.form.pid = parentId;
                        console.log(this.form);
                        let param = {
                            MenuQueryVO: this.form
                        };
                        axios.post('http://localhost:8110/menu/add',this.form)
                            .then( res=>{
                                if (res.data.code === 200){
                                    this.$message({
                                        showClose: true,
                                        message: '恭喜你，添加成功',
                                        type: 'success'
                                    });
                                    if (type === 0){
                                        this.$alert('您添加的是一级目录，若目录没有子级则不会显示，赶快去添加吧', '提示', {
                                            confirmButtonText: '确定',
                                            callback: action => {
                                                this.$message({
                                                    type: 'info',
                                                    message: `action: ${ action }`
                                                });
                                            }
                                        });
                                    }
                                    this.history.push(this.form)
                                    this.$refs[form].resetFields();
                                    this.typeValue = '';
                                    this.parentValue = '';
                                    this.$router.push('/edit/newAdd');
                                    this.seeHistory = true;
                                }
                            });
                    } else {
                        console.log('error submit');
                        return false;
                    }
                })
            },
        },
        computed:{
            all(){
                return this.$store.state.allData;
            }
        }
    }
</script>

<style scoped>

  .input-box{
    position: absolute;
    width: 19%;
    left: 15%;
    top: 22%;
  }
  .history-class{
    margin-left: 40%;
  }
</style>
