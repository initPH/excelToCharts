<template>
  <div>
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane label="图表" name="charts"></el-tab-pane>
      <el-tab-pane label="人脸识别" name="track"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data () {
      return {
        activeName: 'charts'
      }
    },
    watch: {
      activeName: {
        handler (curVal) {
          switch (curVal) {
            case 'charts':
              this.$router.push({
                name: 'charts'
              })
              break
            case 'track':
              this.$router.push({
                name: 'track'
              })
          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>

</style>