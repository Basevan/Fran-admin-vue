<template>
      <div>
        <div class="head-box" :style=" 'width: ' + width + 'px;' ">
          <div class="body-box-img" :span="1" :index="item.id" :key="item.id" v-for="item in items" @click="setName(home)">
            <div class="logo"><router-link :to='{name: item.link}'><img src="../../assets/英文 logo-白字.png"></router-link></div>
          </div>
          <div class="body-box-1" :style=" 'left: ' + width*12/16 + 'px;' " @click="setName(editMenu)">
            <p class="box-msg"><i class="el-icon-edit"></i><router-link to='/edit'>{{editMenu}}</router-link></p>
          </div>
          <div class="body-box-2" :style=" 'left: ' + width*13/16 + 'px;' " @click="setName(myMessage)">
            <p class="box-msg"><i class="el-icon-chat-dot-round"></i><router-link :to='{name: "myMessage"}'>{{myMessage}}</router-link></p>
          </div>
          <div class="body-box-3" :style=" 'left: ' + width*14/16 + 'px;' " @click="setName(myProcess)">
            <p class="box-msg"><i class="el-icon-reading"></i><router-link :to='{name: "myProcess"}'>{{myProcess}}</router-link></p>
          </div>
          <div class="body-box-4" :style=" 'left: ' + width*15/16*1.01 + 'px;' ">
            <p class="box-msg">
              <el-dropdown>
                <span>
                  <el-avatar size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                  <i class="el-icon-caret-bottom" style="position: relative; left: -10px"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><router-link :to='{name: "myProcess"}' @click="setName('个人中心')">个人中心</router-link></el-dropdown-item>
                  <el-dropdown-item divided><router-link :to='{name: "login"}'>退出登录</router-link></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </p>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                width: document.documentElement.clientWidth,
                items: [
                    {
                        id: 1,
                        link: 'home',
                    }
                ],
                home: '首页',
                editMenu: '编辑菜单',
                myMessage: '我的消息',
                myProcess: '我的流程',
                checkId: null
            }
        },
        methods: {
            setName(name) {
                this.$emit("getName",name)
            }
        }
    }
</script>

<style scoped>

  img{
    width: auto;
    height: auto;
    max-width:100%;
    max-height:100%;
  }
  .head-box{
    position: relative;
    top: -10px;
    left: 0;
    background: #3c8dbc;
    display: table-cell;
    height: 70px;
  }
  .body-box-img{
    background-color: #2b6385;
    position: absolute;
    top: -20px;
    left: 0;
    width: 200px;
    height: 90px;
  }
  .logo {
    position: relative;
    top: 10px;
  }
  .body-box-changeMenu {
    position: absolute;
    top: 30px;
    left: 250px;
  }
  .body-box-1{
    position: relative;
    top: 25px;
    width: 100px;
  }
  .body-box-2{
    position: absolute;
    top: 25px;
    width: 100px;
  }
  .body-box-3{
    position: absolute;
    top: 25px;
    width: 100px;
  }
  .body-box-4{
    position: absolute;
    top: 20px;
    width: 60px;;
  }
  .box-msg{
    margin: auto;
  }
</style>
