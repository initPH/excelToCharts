<template>
  <div class="table-block">
    <div v-if="isLoading">
      <spinner :size="45" :line-size="4" message="加载中...."></spinner>
    </div>
    <div v-else-if="_.isEmpty(tableData)" class="data-empty">
      暂无数据
    </div>
    <table class="altrowstable"
           v-else>
      <thead>
      <tr>
        <th v-for="item in tableData[0]">
          {{item}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rowData, index) in tableData" v-if="index !== 0">
        <td v-for="item in rowData">
          {{item}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  export default {
    name: 'table-block',
    props: {
      isLoading: {
        type: Boolean,
        default: () => false
      }
    },
    computed: {
      tableData () {
        return this.$store.state.Excel.excelData
      }
    },
    components: {
      Spinner
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  .table-block {
    height: 144px;
    width: 100%;
    overflow-y: scroll;
    .data-empty {
      text-align: center;
      font-size: 30px;
      line-height: 140px;
      color: gray;
    }
    table {
      width: 100%;
      tr:nth-of-type(odd){ background-color:#c3dde0;}
      tr:nth-of-type(even){ background-color:#d4e3e5;}
      tr th {
        background: #d4e3e5;
      }
    }
  }
</style>