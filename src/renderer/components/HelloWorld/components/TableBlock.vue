<template>
  <div class="table-block">
    <table class="altrowstable"
           v-if="!_.isEmpty(tableData)">
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
    <div v-if="isLoading">
      <spinner :size="45" :line-size="4" message="加载中...." style="margin-top: 150px"></spinner>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  export default {
    name: 'table-block',
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        default: () => false
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
    height: 300px;
    width: 100%;
    overflow-y: scroll;
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