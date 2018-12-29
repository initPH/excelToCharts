<template>
  <div>
    <div>
      <el-radio-group v-model="radio">
      <el-radio-button label="柱状图"></el-radio-button>
      <el-radio-button label="折线图"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
    </div>
    <keep-alive>
      <component :is="chartType"></component>
    </keep-alive>
  </div>
</template>

<script>
  import { bar, eLine } from './charts'
  export default {
    name: 'index',
    components: {
      bar,
      eLine
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
        }
      }
    }
  }
</script>

<style lang="scss">

</style>