<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-success="handleAvatarSuccess"
    multiple
    list-type="picture"
    :data="uploadData">
    <el-button size="small" type="primary">{{defaultName}}</el-button>
  </el-upload>
</template>

<script>

  import { Notification } from 'element-ui';
  import { getLangMessage } from '@/utils';

  export default {
    name: "MyUpload",
    props: ['name'],
    data() {
      return {
        uploadData: { "busiName": 'ossWeb' },
        form: {
          fileUrl: '',
          fileName: '',
          md5: '',
        },
        defaultName: this.name || '点击上传',
      };
    },
    methods: {
      /** 图片上传相关 **/
      // handleAvatarSuccess(res, file) {
      //   if (res.code === 200) {
      //     this.form.fileUrl = res.data.accessUrl;
      //     this.form.md5 = res.data.md5;
      //     this.form.fileName = file.name;
      //     this.$emit("success", this.form);
      //   } else {
      //     Notification.error({
      //       title: getLangMessage('error'),
      //       message: getLangMessage('uploadFail')
      //     });
      //   }
      // },
    }
  };
</script>

<style scoped>

</style>
