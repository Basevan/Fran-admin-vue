<template>
  <div class="layout-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumb"
        :key="item.name"
        v-if="item.meta.title"
      >
        <el-tag size="medium" closable @close="handleClose(index)">{{item.meta.title}}</el-tag>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bread: [],
      }
    },
    computed: {
      breadcrumb() {
        this.bread = this.$route.matched;
        return this.bread;
      }
    },
    methods: {
      handleClose(index) {
        this.bread.splice(index,1);
        if (this.bread.length !== 0) {
          this.$router.push(this.bread[index - 1].path);
        }
      },
    },
    created() {

    },
    watch: {
      data() {

      }
    }
  };
</script>
