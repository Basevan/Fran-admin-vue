<template>
  <div>
    <div class="header">
      <Header @getName="getName"/>
    </div>
    <div>
      <div class="menu">
        <Home @getName="getName"/>
      </div>
      <div class="main-box">
        <div class="crumb">
          <BreadCrumb :name="crumbName"/>
        </div>
        <div class="views">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from "./Header";
    import Home from "./Home";
    import LayoutContent from "./LayoutContent";
    import BreadCrumb from "./BreadCrumb";
    export default {
        name: "layout",
        components: {BreadCrumb, LayoutContent, Home, Header},
        data() {
            return {
                crumbName: '',
            }
        },
        methods: {
            getName(name) {
                this.crumbName = name;
            }
        }
    }
</script>

<style scoped>
  .header {
    position: absolute;
    left: 0;
  }
  .menu {
    position: absolute;
    top: 45px;
    left: 0;
    width: 200px;
  }
  .main-box {
    position: absolute;
    top: 76px;
    left: 210px;
    width: 86%;
  }
  .crumb {
    position: relative;
    top: 5px;
    left: 0;
  }
  .views {
    position: relative;
    top: 15px;
    left: -10px;
  }

</style>
