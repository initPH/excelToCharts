<template>
  <div>
    <div>
      <el-radio-group v-model="radio">
      <el-radio-button label="柱状图"></el-radio-button>
      <el-radio-button label="折线图"></el-radio-button>
      <el-radio-button label="饼图"></el-radio-button>
    </el-radio-group>
    </div>
    <keep-alive>
      <component :is="chartType"></component>
    </keep-alive>
  </div>
</template>

<script>
  import { bar, eLine, pie } from './charts'
  export default {
    name: 'index',
    components: {
      bar,
      eLine,
      pie
    },
    data () {
      return {
        chartType: 'bar',
        radio: '柱状图'
      }
    },
    watch: {
      radio (curVal) {
        switch (curVal) {
          case '柱状图':
            this.chartType = 'bar'
            break
          case '折线图':
            this.chartType = 'eLine'
            break
          case '饼图':
            this.chartType = 'pie'
        }
      }
    }
  }
</script>

<style lang="scss">

</style>