<template>
  <div>
    name：
    <el-select clearable v-model="xvalue" placeholder="请选择">
      <el-option
        v-for="item in XOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    value：
    <el-select
      v-model="yvalue"
      placeholder="请选择">
      <el-option
        v-for="item in YOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="genChart" :disabled="_.isEmpty(xvalue.toString()) || _.isEmpty(yvalue.toString())">生成</el-button>
    <div ref="chart" :style="{width: '700px', height: '400px'}">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bar',
    data () {
      return {
        myChart: undefined,
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
        let series = {type: 'pie', data: []}
        this.yData.forEach((data, index) => {
          series.data.push({
            name: this.xData[index],
            value: data
          })
        })
        this.myChart.setOption(this._.merge({}, {
          grid: {
            right: 0
          },
          backgroundColor: 'rgba(0,0,0,0)',
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
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
        let dataList = []
        this.excelData.forEach((data, index) => {
          if (index > 0) {
            dataList.push(data[curVal])
          }
        })
        this.yData = dataList
      }
    },
    mounted () {
      this.myChart = this.$echarts.init(this.$refs.chart)
    }
  }
</script>
<style scoped>

</style>