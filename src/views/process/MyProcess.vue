<template>
  <div>
    <div>
      <h3 style="text-align: center" @click="add()"> 暂未开放</h3>
<!--      {{apple}}-->
<!--      <h4 @click="getCounts()">获取</h4>-->
<!--      {{countA}}-->
    </div>
    <!--      <div class="step-class">-->
    <!--        <el-steps :active="1">-->
    <!--          <el-step title="步骤 1" icon="el-icon-edit"></el-step>-->
    <!--          <el-step title="步骤 2" icon="el-icon-upload"></el-step>-->
    <!--          <el-step title="步骤 3" icon="el-icon-picture"></el-step>-->
    <!--        </el-steps>-->
    <!--      </div>-->
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: "MyProcess",
    data() {
      return {
        count: 100
      };
    },
    computed: {
      ...mapGetters({
        getApp: 'menuModule/getApp'
      }),
      ...mapState([
        'menuModule',
        'processModule'
      ]),
      apple() {
        return this.menuModule.apple;
      },
      countA() {
        return this.$store.getters.getApp;
      }
    },
    methods: {
      ...mapActions({
        getMenu: 'processModule/getMenu'
      }),
      add() {
        console.log(this.count);
      },
      getCounts() {
        let a = this.getApp;
        console.log(a);
      }
    },
    created() {
      // this.getMenu();
    }
  }
</script>

<style scoped>

  /*.step-class{*/
  /*  position: absolute;*/
  /*  top: 40%;*/
  /*  left: 50%;*/
  /*  transform: translate(-50%, -50%);*/
  /*  width: 30%;*/
  /*  height: 50%;*/
  /*}*/

</style>
