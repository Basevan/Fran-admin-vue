<template>
  <div class="back">
    <div class="content-card">
      <div class="content" v-loading="loading">
        <h3>TFran</h3>
        <p>basevan.tang · Java开发工程师</p>
        <el-divider></el-divider>
        <el-form :model="data" label-position="top" :inline="true">
          <el-form-item label="工号">
            <el-input size="medium" placeholder="100001" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input size="medium" placeholder="男" disabled></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input size="medium" placeholder="2020-6-18" disabled></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-input size="medium" placeholder="研发部-架构组" disabled></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input size="medium" placeholder="Java架构师" disabled></el-input>
          </el-form-item>
          <el-form-item label="HRBP">
            <el-input size="medium" placeholder="强刘东" disabled></el-input>
          </el-form-item>
          <el-form-item label="名族" style="width: 300px">
            <el-input size="medium" v-model="data.family" placeholder="汉"></el-input>
          </el-form-item>
          <el-form-item label="户籍类型" style="width: 300px">
            <el-select size="medium" v-model="data.householdRegistrationType" style="width: 100%">
              <el-option v-for="item in householdRegistrationType"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户籍">
            <el-select size="medium" v-model="data.province" placeholder="省">
              <el-option v-for="item in householdRegistrationType"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select size="medium" v-model="data.city" placeholder="市">
              <el-option v-for="item in householdRegistrationType"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select size="medium" v-model="data.county" placeholder="区/县">
              <el-option v-for="item in householdRegistrationType"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学历" style="width: 300px">
            <el-select size="medium" v-model="data.educationBackground" style="width: 100%">
              <el-option v-for="item in educationBackground"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校" style="width: 300px">
            <el-input size="medium" v-model="data.graduateFrom" placeholder="重庆邮电大学"></el-input>
          </el-form-item>
          <el-form-item label="专业" style="width: 300px">
            <el-input size="medium" v-model="data.professional" placeholder="信息管理与信息系统"></el-input>
          </el-form-item>
          <el-form-item label="外语及水平" style="width: 300px">
            <el-input size="medium" v-model="data.foreignLanguageLevel" placeholder="英语四级"></el-input>
          </el-form-item>

          <el-form-item label="微信号" style="width: 400px">
            <el-input size="medium" v-model="data.vx" placeholder="a75727"></el-input>
          </el-form-item>
          <el-form-item label="QQ号" style="width: 400px">
            <el-input size="medium" v-model="data.qq" placeholder="183320926"></el-input>
          </el-form-item>
          <el-form-item label="个人邮箱" style="width: 400px">
            <el-input size="medium" v-model="data.persionalEmail" placeholder="183320926@qq.com"></el-input>
          </el-form-item>

          <el-form-item label="身份证号" style="width: 400px">
            <el-input size="medium" v-model="data.IDNumber" placeholder="50022519950916****"></el-input>
          </el-form-item>
          <el-form-item label="生日" style="width: 400px">
            <el-input size="medium" v-model="data.birthday" placeholder="19950916"></el-input>
          </el-form-item>
          <el-form-item label="年龄" style="width: 400px">
            <el-input size="medium" v-model="data.age" placeholder="24"></el-input>
          </el-form-item>

          <el-form-item label="手机号" style="width: 400px">
            <el-input size="medium" v-model="data.phone" placeholder="50022519950916****"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" style="width: 400px">
            <el-input size="medium" v-model="data.bankNumber" placeholder="6218 4888 "></el-input>
          </el-form-item>
          <el-form-item label="员工类型" style="width: 400px">
            <el-select size="medium" v-model="data.employeeType" style="width: 100%">
              <el-option v-for="item in employeeType"
                         :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="现居住地址" style="width: 600px">
            <el-input type="textarea" v-model="data.addressNow" placeholder="重庆市南岸区"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址" style="width: 600px">
            <el-input type="textarea" v-model="data.address" placeholder="北京市东城区"></el-input>
          </el-form-item>

          <el-form-item label="照片">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>

        <!-- 照片放大预览图 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-button type="primary" style="position: absolute; left: 50%" @click="handleSave">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    name: "EmployeeDetail",
    data() {
      return {
        data: {},
        householdRegistrationType: [
          {label: '本地城镇', value: 1},
          {label: '本地农村', value: 2},
          {label: '异地城镇', value: 3},
          {label: '异地农村', value: 4},
        ],
        educationBackground: [
          {label: '博士', value: 1},
          {label: '硕士', value: 2},
          {label: '本科', value: 3},
          {label: '大专', value: 4},
          {label: '中专', value: 5},
          {label: '高中及以下', value: 6},
        ],
        employeeType: [
          {label: '社会人士', value: 1},
          {label: '应届毕业生', value: 2},
          {label: '实习生', value: 3},
        ],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },
    computed: {
      ...mapState({
        loading: 'loading'
      })
    },
    methods: {
      handleRemove(file) {
        this.$notify({
          title: '移除',
          message: '移除： ' + file.name,
          type: 'success'
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        this.$notify({
          title: '下载',
          message: '下载： ' + file.name,
          type: 'success'
        });
      },
      // 保存页面数据
      handleSave() {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        });
      },
    },
    created() {
      console.log(this.$route.params);
    }

  }
</script>

<style scoped>

  .back {
    width: 100%;
  }

  .content-card {
    width: 90%;
    height: 100%;
    position: absolute;
    left: 5%;
    right: 5%;
  }

  .upload-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
  }

</style>
