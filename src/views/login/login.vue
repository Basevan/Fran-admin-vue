<template>
  <div class="page-box" v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">

    <el-image :src="imgArr[index]" ></el-image>

    <div class="description-box">
      <h1 style="font-family: Arial;color: whitesmoke">Fran-admin</h1>
      <p>@SpringBoot</p>
      <p>@Vue</p>
      <p>@Element-UI</p>
    </div>

    <div class="login-box">
      <div v-if="account">
        <el-form :model="ruleForm" status-icon label-width="0" class="demo-ruleForm">
          <el-row>
            <el-col></el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <h4 class="login-title">登录</h4>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <label></label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="20">
              <el-input type="text" suffix-icon="el-icon-user-solid" v-model="ruleForm.account"
                        placeholder="手机号/用户名/邮箱"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="20">
              <el-input type="password" suffix-icon="el-icon-lock" show-password v-model="ruleForm.password"
                        placeholder="请输入密码"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="6">
              <el-input type="text" v-model="inputCode" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :offset="2" :span="8">
              <!--                验证-->
              <canvas id="code-canvas" width="100px" height="36px" style="border: 1px solid #ccc;border-radius: 5px;"
                      @click="createCanvas"></canvas>
            </el-col>
            <el-col :span="4">
              <label style="color: #bfbfbf; font-size: smaller">看不清？点击图片</label>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="13">
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-col>
            <el-col :span="2">
              <el-tag size="small" effect="plain" type="info" @click="forgetPwd">忘了密码</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="20">
              <el-button class="sign-in-btn" size="medium" type="primary" data-loading="正在验证，请稍后..."
                         @click="submitForm">登录
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="5">
              <label style="color: whitesmoke; font-size: smaller;">© 2019 All Rights Reserved. TFran</label>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div v-if="qrCode">
        <router-link to="/home">

        </router-link>
      </div>
    </div>

    <div class="change-img-btn">
      <label @click="nextBackgroundImg">不喜欢？下一张</label>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "login",

    data() {
      return {
        background: '../../assets/login/loginBackground.jpg',
        msg: '',
        text: '向右滑',
        // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
        accuracy: 1,
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        loading: false,
        code: '',
        inputCode: '',
        account: true,
        qrCode: false,
        ruleForm: {
          account: '',
          password: '',
        },
        checked: '',
        srcArr: [
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        ],
        imgArr: [
          require('../../assets/login/loginBackground.jpg'),
          require('../../assets/login/background1.jpeg'),
          require('../../assets/login/background3.jpg'),
          require('../../assets/login/background4.jpg'),
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        ],

        index: -1,
        path: '',
      };
    },
    created() {
      this.nextBackgroundImg();
    },
    computed: {
      ...mapState([
        'userModule'
      ])
    },
    mounted() {
      this.code = '';
      this.inputCode = '';
      let c = document.getElementById("code-canvas");
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      let data = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f',
        'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
      ];
      let length = data.length;
      for (let i = 0; i < 4; i++) { //加载验证码
        let oneCode = data[Math.floor(Math.random() * length)];
        this.code = this.code + "" + oneCode;
        let x = 10 + i * 20; //文字在canvas上的x坐标
        let y = 30 + Math.random() * 3; //文字在canvas上的y坐标
        ctx.font = "30px 微软雅黑";
        ctx.fillText(oneCode, x, y);
        ctx.fillStyle = 'rgb(255,255,255)';  //文字上色
      }
      for (let i = 0; i <= 50; i++) { //验证码上显示小点
        ctx.strokeStyle = this.randomColor();
        ctx.beginPath();
        let x = Math.random() * c.width;
        let y = Math.random() * c.height;
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
      }
      for (let i = 0; i <= 10; i++) { //验证码上显示线条
        ctx.strokeStyle = this.randomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * c.width, Math.random() * c.height);
        ctx.lineTo(Math.random() * c.width, Math.random() * c.height);
        ctx.stroke();
      }

    },
    methods: {
      ...mapActions({
        login: 'userModule/login'
      }),
      submitForm() {
        this.loading = true;
        setTimeout(() => {
          if (this.ruleForm.account === null || '' === this.ruleForm.account || this.ruleForm.password === null || '' === this.ruleForm.password) {
            this.$message({
              message: '账号或密码不能为空',
              type: 'error'
            });
            this.loading = false;
            return;
          }
          if (this.inputCode === null || '' === this.inputCode) {
            this.loading = false;
            this.$message({
              message: '请输入验证码',
              type: "error",
            })
          } else if (this.code.toLocaleLowerCase() === this.inputCode.toLocaleLowerCase()) {
            this.loading = false;
            this.$message({
              message: '验证成功',
              type: 'success'
            });
            this.login({
              id: this.ruleForm.account,
            }).then( () => {
              this.$router.push("/home");
            });
          } else {
            this.loading = false;
            this.$message({
              message: '验证码错误',
              type: 'error'
            });
            this.createCanvas();
          }
        }, 500);

      },
      forgetPwd() {
        this.$message("记性不好，怪谁")
      },
      createCanvas() {
        this.code = '';
        this.inputCode = '';
        let c = document.getElementById("code-canvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        let data = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
          'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f',
          'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ];
        let length = data.length;
        for (let i = 0; i < 4; i++) { //加载验证码
          let oneCode = data[Math.floor(Math.random() * length)];
          this.code = this.code + "" + oneCode;
          let x = 10 + i * 20; //文字在canvas上的x坐标
          let y = 30 + Math.random() * 3; //文字在canvas上的y坐标
          ctx.font = "30px 微软雅黑";
          ctx.fillText(oneCode, x, y);
          ctx.fillStyle = 'rgb(255,255,255)';  //文字上色
        }
        for (let i = 0; i <= 50; i++) { //验证码上显示小点
          ctx.strokeStyle = this.randomColor();
          ctx.beginPath();
          let x = Math.random() * c.width;
          let y = Math.random() * c.height;
          ctx.moveTo(x, y);
          ctx.lineTo(x + 1, y + 1);
          ctx.stroke();
        }
        for (let i = 0; i <= 10; i++) { //验证码上显示线条
          ctx.strokeStyle = this.randomColor();
          ctx.beginPath();
          ctx.moveTo(Math.random() * c.width, Math.random() * c.height);
          ctx.lineTo(Math.random() * c.width, Math.random() * c.height);
          ctx.stroke();
        }

      },
      randomColor() { //选取随机颜色
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      nextBackgroundImg() {
        this.loading = true;
        //5张随机一张
        let index = Math.floor(Math.random() * 5);
        // this.index = index;
        setTimeout(() => {
          let arr = this.imgArr.length - 1;
          if (this.index === arr) {
            this.index = -1;
          }
          this.index++;
          this.loading = false;
        },300 * index);

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginByAccount() {
        this.account = true;
        this.qrCode = false;
      },
      loginByQrCode() {
        this.account = false;
        this.qrCode = true;
      }
    },
  }
</script>

<style>
  .page-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-image: url('../../assets/background/light.jpg');*/
    /*background-size: cover;*/
    /*background-repeat:no-repeat;*/
    /*background-position:center;*/
    /*background-attachment:fixed;*/
  }

  .description-box {
    position: absolute;
    top: 25%;
    left: 25%;

  }

  .login-box {
    border: 1px solid #A9C9E2;
    position: absolute;
    top: 40%;
    left: 60%;
    transform: translate(-0%, -52%);
    width: 350px;
    height: 400px;
    /*background: #d3e6f5;*/
  }

  .demo-ruleForm {

  }

  .login-title {
    margin: 0 !important;
    opacity: 0.5;
  }

  .label-title {
    margin-top: 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .sign-in-btn {
    width: 100%;
  }

  .change-img-btn {
    position: absolute;
    top: 90%;
    left: 90%;
    transform: translate(-10%, -10%);
    color: grey;
  }

  .input-box {
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*width: 65%;*/
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  input {
    margin: 0;
    font: inherit;
  }

  .login-Form {
    border: 1px solid whitesmoke;
  }
</style>
