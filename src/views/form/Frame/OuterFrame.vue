<template>
  <div>
    <el-divider style="margin: 0 auto;width: 50px"></el-divider>
    <el-menu>
      <el-popover
        placement="bottom"
        width="150"
        trigger="hover"
        content="点击开始编辑导航栏">
        <el-button plain slot="reference" size="small" icon="el-icon-edit" @click="drawer = true"  style="margin-left: 16px;"></el-button>
      </el-popover>

    </el-menu>
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
        name: "OuterFrame",
        data(){
            return{
            }
        },
        methods:{
            handleCloseDrawer(done) {
                this.$confirm('确定？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        }
    }
</script>

<style scoped>

</style>
