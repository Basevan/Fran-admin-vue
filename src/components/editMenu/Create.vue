<template>
  <div class="main-box">
    <el-form :model="formData[0]" status-icon ref="formData[0]" label-width="80px" label-position="right">
      <div >
        <div class="label-box">
          <label style="font-size: small">一级目录</label>
        </div>
        <div class="menu-box1">
          <el-form-item label="名称" prop="name" :rules="[{required:true, message: '请输入名称', trigger: 'blur'}]">
            <el-input v-model="formData[0].name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="域名" prop="domain" :rules="[{required:true, message: '请输入域名', trigger: 'blur'}]">
            <el-input v-model="formData[0].domain" placeholder="域名"></el-input>
          </el-form-item>
          <el-form-item label="uri" prop="uri" :rules="[{required:true, message: '请输入uri', trigger: 'blur'}]">
            <el-input v-model="formData[0].uri" placeholder="uri"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon" :rules="[{required:true, message: '请输入icon', trigger: 'blur'}]">
            <el-input v-model="formData[0].icon" placeholder="icon"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <el-form :model="formData[1]" status-icon ref="formData[1]" label-width="80px" label-position="right">
      <div v-if="secondSeen">
        <div class="label-box">
          <label style="font-size: small">{{secondName}}</label>
        </div>
        <div class="menu-box2">
          <el-form-item label="名称" prop="name" :rules="[{required:true, message: '请输入名称', trigger: 'blur'}]">
            <el-input v-model="formData[1].name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="域名" prop="domain" :rules="[{required:true, trigger: 'blur'}]">
            {{formData[0].domain}}
          </el-form-item>
          <el-form-item label="uri" prop="uri" :rules="[{required:true, message: '请输入uri', trigger: 'blur'}]">
            <el-input v-model="formData[1].uri" placeholder="uri"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon" :rules="[{required:true, message: '请输入icon', trigger: 'blur'}]">
            <el-input v-model="formData[1].icon" placeholder="icon"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>

    <el-form :model="formData[2]" status-icon ref="formData[2]" label-width="80px" label-position="right">
      <div v-if="thirdSeen">
        <div class="label-box">
          <label style="font-size: small">三级菜单</label>
        </div>
        <div class="menu-box3" >
          <el-form-item label="名称" prop="name" :rules="[{required:true, message: '请输入名称', trigger: 'blur'}]">
            <el-input v-model="formData[2].name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="域名" prop="domain" :rules="[{required:true, trigger: 'blur'}]">
            {{formData[0].domain}}
          </el-form-item>
          <el-form-item label="uri" prop="uri" :rules="[{required:true, message: '请输入uri', trigger: 'blur'}]">
            <el-input v-model="formData[2].uri" placeholder="uri"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon" :rules="[{required:true, message: '请输入icon', trigger: 'blur'}]">
            <el-input v-model="formData[2].icon" placeholder="icon"></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 添加/删除 菜单/导航 按钮 -->
      <div>
        <el-form-item>
          <el-button @click="addMenu" :disabled="addDisable">+++</el-button>
          <el-button @click="subMenu" :disabled="subDisable">- - -</el-button>
        </el-form-item>
      </div>

      <!-- 提示 -->
      <div class="tip-box">
        <el-form-item v-if="labelSeen">
          <label style="margin-left: 160px; color: red">输入第{{count}}级时请加上父uri</label><br>
          <label style="margin-left: 160px; color: red">{{count}}级域名默认为父域名</label>
        </el-form-item>
      </div>

      <div class="button-box">
        <el-form-item style="margin-left: 140px">
          <el-button type="primary" @click="onSubmit('formData[0]')">立即创建</el-button>
          <el-button @click="handleCloseDrawer('formData[0]')">清空</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "EditMenu",
        data() {
            return {
                count: '',
                secondSeen: false,
                secondName: '',
                thirdSeen: false,
                labelSeen: false,
                drawer: false,
                list: [],
                addDisable: false,
                subDisable: true,
                disable: true,
                formData: [
                    {
                        name: '',
                        uri: '',
                        domain: '',
                        icon: '',
                    },
                    {
                        name: '',
                        uri: '',
                        icon: '',
                    },
                    {
                        name: '',
                        uri: '',
                        icon: '',
                    }
                ],
            };
        },
        methods: {
            addMenu(){
                if (this.secondSeen === false && this.thirdSeen === false){
                    this.secondName = "二级菜单";
                    this.count = "二";
                    this.subDisable = false;
                    this.secondSeen = true;
                    this.labelSeen = true;
                    return;
                }
                if (this.secondSeen === true && this.thirdSeen === false){
                    this.secondName = "二级目录";
                    this.count = "三";
                    this.addDisable = true;
                    this.thirdSeen = true;
                    return;
                }
            },
            subMenu(){
                if (this.secondSeen === true && this.thirdSeen === false){
                    this.secondSeen = false;
                    this.subDisable = true;
                    this.labelSeen = false;
                    this.formData[1].name = "";
                    this.formData[1].uri = "";
                    this.formData[1].icon = "";
                }
                if (this.secondSeen === true && this.thirdSeen === true){
                    this.thirdSeen = false;
                    this.subDisable = false;
                    this.addDisable = false;
                    this.secondName = "二级菜单";
                    this.count = "二";
                    this.formData[2].name = "";
                    this.formData[2].uri = "";
                    this.formData[2].icon = "";
                }
            },
            handleCloseDrawer(form) {
                this.$confirm('确定','提示',{
                  type: 'warning'
                }).then(() => {
                    this.$refs[form].resetFields();
                })
            },
            onSubmit(form){
                this.$refs[form].validate( (valid)=> {
                    if (valid) {
                        console.log(this.formData);
                        // let param = {
                        //     MenuQueryVO: this.formData
                        // };
                        axios.post('http://localhost:8110/menu/add',this.formData)
                            .then(res=>{
                                this.$message({
                                    message: '成功',
                                    type: 'success'
                                })
                            });
                    } else {
                        console.log('error submit');
                        return false;
                    }
                })
            },
        },
        computed:{
        }
    }
</script>

<style scoped>
  .main-box{
  }
  .label-box{
    height: 30px;
  }
  .menu-box1{
    width: 30%;
  }
  .menu-box2{
    width: 30%;

  }
  .menu-box3{
    width: 30%;

  }
  .tip-box{
  }
  .button-box{
  }
</style>
