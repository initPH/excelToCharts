<template>
  <div>
    X轴：
    <el-select clearable v-model="xvalue" placeholder="请选择">
      <el-option
        v-for="item in XOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    Y轴：
    <el-select clearable v-model="yvalue" placeholder="请选择">
      <el-option
        v-for="item in YOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="generateChart">生成</el-button>
    <div class="type-choose-button">
      <el-radio-group v-model="chartType">
        <el-radio-button label="柱状图"></el-radio-button>
        <el-radio-button label="折线图"></el-radio-button>
      </el-radio-group>
    </div>
    <div ref="chart" :style="{width: '700px', height: '500px'}">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      tableData: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      XOptions () {
        this.value = ''
        let options = []
        if (!this._.isEmpty(this.tableData)) {
          this.tableData[0].filter(data => data).forEach((data, index) => {
            options.push(
              {
                value: index,
                label: data
              }
            )
          })
        }
        return options
      },
      YOptions () {
        this.value = ''
        let options = []
        if (!this._.isEmpty(this.tableData)) {
          this.tableData[1].filter(data => data).forEach((data, index) => {
            if (!isNaN(data)) {
              options.push({
                label: this.tableData[0][index],
                value: index
              })
            }
          })
        }
        return options
      }
    },
    data () {
      return {
        xvalue: '',
        yvalue: '',
        chartType: '柱状图',
        xChartData: [],
        yChartData: []
      }
    },
    watch: {
      xvalue (curVal) {
        this.xChartData = []
        this.tableData.forEach((data, index) => {
          if (index !== 0) {
            this.xChartData.push(data[curVal])
          }
        })
      },
      yvalue (curVal) {
        this.yChartData = []
        this.tableData.forEach((data, index) => {
          if (index !== 0) {
            this.yChartData.push(data[curVal])
          }
        })
      },
      chartType (curVal) {
        if (!this._.isEmpty(this.xChartData) && !this._.isEmpty(this.yChartData)) {
          this.generateChart()
        }
      }
    },
    methods: {
      generateChart () {
        let chart = this.$echarts.init(this.$refs.chart)
        chart.setOption({
          yAxis: {
          },
          xAxis: {
            data: this.xChartData
          },
          series: [{
            type: this.chartType === '柱状图' ? 'bar' : 'line',
            data: this.yChartData
          }]
        })
      }
    }
  }
</script>

<style lang="scss">

</style>