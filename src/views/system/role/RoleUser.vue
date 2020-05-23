<template>
 <div>
   <user :show-search-card="true" @loadPage="loadPage"></user>
 </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import User from "../User";

  export default {
    name: "RoleUser",
    components: {User},
    data() {
      return {
        queryForm: {},
        addForm: {},
        rules: {
          name: [
            {required: true, message: '请输入员工名字'}
          ],
          phone: [
            {required: true, message: '请输入员工手机号'}
          ],
          email: [
            {required: true, message: '请输入员工邮箱'}
          ]
        },
        statusOption: [
          {label: '使用中', value: 1},
          {label: '禁用', value: 0}
        ],
        addVisible: false,
      }
    },
    computed: {
      ...mapState([
        'userModule',
        'roleModule'
      ]),
      userList() {
        return this.userModule.userList;
      },
      status() {
        return this.userModule.status;
      },
      roleUserList() {
        return this.roleModule.roleUserList;
      }
    },
    methods: {
      ...mapActions({
        getUserList: 'userModule/getUserList',
        changeStatus: 'userModule/changeStatus',
        getRoleUserList: 'roleModule/getRoleUserList',
      }),
      ...mapMutations({
        setUserList: 'userModule/setUserList',
      }),
      loadPage() {
        this.getRoleUserList(
          { roleId: this.$route.query.roleId }
        ).then(() => {
          let idList = [];
          if (this.roleUserList.length > 0) {
            this.roleUserList.forEach( elem => {
              idList.push(elem.userId);
            });
            this.getUserList({
              idList: idList,
            })
          } else {
            this.setUserList();
          }
        });
      },
      searchUser() {
      },
      createUser() {
        this.addVisible = true;
      },
      editUser(row) {
        this.addVisible = true;
        console.log(row);
      },
      //改变用户状态
      transferStatus(row) {
        row.status = row.status === 1 ? 0 : 1;
        let tip = row.status === 1 ? '禁用' : '解禁';
        this.$confirm('是否' + tip + '该用户?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = row.status === 1 ? 0 : 1;
          this.changeStatus({
            id: row.id,
            status: row.status,
          }).then(() => {
            row.status = this.status;
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
          });
        }).catch(() => {
          this.$notify.info({
            title: '取消',
            message: '已取消修改'
          });
        });
      },
      cancelEdit(form) {
        this.$refs[form].resetFields();
        this.addVisible = false;
      },
      confirmEdit(form) {
        this.$refs[form].validate( valid => {
          if (valid) {
            // todo 请求后台接口
            this.addVisible = false;
          } else {
            return false;
          }
        })
      },
    },
    created() {
      this.loadPage();
    }
  }
</script>

<style scoped>

</style>
