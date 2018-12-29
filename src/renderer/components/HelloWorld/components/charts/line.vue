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
    <el-select
      v-model="yvalue"
      multiple
      collapse-tags
      placeholder="请选择">
      <el-option
        v-for="item in YOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="genChart" :disabled="_.isEmpty(xvalue.toString()) || _.isEmpty(yvalue)">生成</el-button>
    <div ref="chart" :style="{width: '700px', height: '400px'}">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eline',
    data () {
      return {
        myChart: undefined,
        barOptions: {
          yAxis: {}
        },
        xvalue: '',
        yvalue: [],
        xData: [],
        yData: []
      }
    },
    computed: {
      excelData () {
        return this.$store.state.Excel.excelData || []
      },
      XOptions () {
        let options = []
        if (this.excelData[0]) {
          this.excelData[0].forEach((data, index) => {
            options.push({
              label: data,
              value: index
            })
          })
        }
        return options
      },
      YOptions () {
        let options = []
        if (this.excelData[1]) {
          this.excelData[1].forEach((data, index) => {
            if (!isNaN(data)) {
              options.push({
                value: index,
                label: this.excelData[0][index]
              })
            }
          })
        }
        return options
      }
    },
    methods: {
      // 生成图
      genChart () {
        let series = []
        this.yData.forEach((data, index) => {
          series.push({
            name: index,
            type: 'line',
            barGap: 0,
            data: data
          })
        })
        this.myChart.setOption(this._.merge(this.barOptions, {
          grid: {
            right: 50
          },
          backgroundColor: 'rgba(0,0,0,0)',
          toolbox: {
            show: true,
            feature: {
              magicType: {type: ['line', 'bar']},
              saveAsImage: {}
            }
          },
          xAxis: {
            data: this.xData
          },
          dataZoom: {
            type: 'inside'
          },
          series: series
        }))
      }
    },
    watch: {
      xvalue (curVal) {
        let dataList = []
        this.excelData.forEach((data, index) => {
          if (index > 0) {
            dataList.push(data[curVal])
          }
        })
        this.xData = dataList
      },
      yvalue (curVal) {
        // y轴可以能不止选择一列数据
        let ydata = []
        curVal.forEach(yindex => {
          let dataList = []
          this.excelData.forEach((data, index) => {
            if (index > 0) {
              dataList.push(data[yindex])
            }
          })
          ydata.push(dataList)
        })
        this.yData = ydata
      }
    },
    mounted () {
      this.myChart = this.$echarts.init(this.$refs.chart)
    }
  }
</script>
<style lang="scss">
</style>