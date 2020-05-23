<template>
    
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
        name: "Title",
      computed: {
        ...mapState([
          'titleModule'
        ]),

      },
      methods: {
        ...mapActions({
          getJobList: 'titleModule/jobList'
        }),
        loadPage() {
          this.getJobList({
            currentPage: 1
          });
        }
      },
      created() {
          this.loadPage();
      }
  }
</script>

<style scoped>

</style>
