<template>
  <div>
    <el-row>
      <el-col>
        <div class="grid-content">
          <el-popover
            placement="bottom"
            width="150"
            trigger="hover"
            content="点击开始编辑导航栏">
            <el-button plain slot="reference" size="small" icon="el-icon-edit" @click="drawer = true"  style="margin-left: 16px;"></el-button>
          </el-popover>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <el-input type="textarea" :rows="1" v-model="domain" placeholder="路径"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-drawer title="编辑导航栏" :visible.sync="drawer" size="30%">
      <div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="一级标签">
            <el-input v-model="form.name1" placeholder="标签名"></el-input>
            <el-input type="textarea" v-model="form.link1" placeholder="完整地址"></el-input>
          </el-form-item>
          <el-form-item label="二级标签">
            <el-input v-model="form.name2" placeholder="标签名"></el-input>
            <el-input type="textarea" v-model="form.link2" placeholder="完整地址"></el-input>
          </el-form-item>
          <el-form-item label="三级标签">
            <el-input v-model="form.name3" placeholder="标签名"></el-input>
            <el-input type="textarea" v-model="form.link3" placeholder="完整地址"></el-input>
          </el-form-item>

          <el-form-item>
            <label style="margin-left: 145px; color: red">输入时请加上父路径</label>
          </el-form-item>

          <el-form-item style="margin-left: 120px">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="handleCloseDrawer">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "Drawer",
        data(){
            return{
                form: {
                    name1: '',
                    link1: '',
                    name2: '',
                    link2: '',
                    name3: '',
                    link3: '',
                },
            }
        },
        methods: {
            handleCloseDrawer(done) {
                this.$confirm('确定？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            onSubmit(){

            },
            getLink(data){
                this.link = data;
                console.log(this.link);
            },
        },
        computed:{
            domain(){
                return this.$store.state.domain;
            }
        }
    }
</script>

<style scoped>

</style>
