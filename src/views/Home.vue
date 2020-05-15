<template>
  <div class="home-tip">
    <el-alert
      title="欢迎使用 Fran-admin 管理平台"
      type="info"
      :closable="false">
    </el-alert>

    <ve-line :data="chartData"></ve-line>

    <el-form :inline="true">
      <el-form-item>
        <el-card class="chart-card">
          <ve-histogram :data="chartData2" width="500px"></ve-histogram>
        </el-card>
      </el-form-item>

      <el-form-item>
        <el-card class="chart-card pie">
          <ve-pie :data="chartData" width="500px"></ve-pie>
        </el-card>
      </el-form-item>

      <el-form-item>
        <el-card class="chart-card">
          <ve-map :data="chartData3" width="500px"></ve-map>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-card class="chart-card">
          <ve-ring :data="chartData4"></ve-ring>
        </el-card>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartData2: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        },
        chartData3: {
          columns: ['位置', '员工数'],
          rows: [
            { '位置': '重庆', '员工数': 10000 },
            { '位置': '北京', '员工数': 500 },
            { '位置': '上海', '员工数': 200 },
            { '位置': '浙江', '员工数': 400 },
            { '位置': '四川', '员工数': 1500 },
          ]
        },
        chartData4: {
          columns: ['商标', '数量'],
          rows: [
            { '商标': '科学仪器', '数量': 30 },
            { '商标': '设计研究', '数量': 30 },
            { '商标': '广告销售', '数量': 50 },
            { '商标': '金属材料', '数量': 20 },
            { '商标': '其他', '数量': 50 },
          ]
        }
      }
    }
  }
</script>

<style lang="less">
  .home-tip {
    .el-alert {
      padding: 15px 16px;
    }

    .el-alert__title {
      font-size: 18px;
    }
  }

  .chart-card {
    width: 555px;
  }
</style>
