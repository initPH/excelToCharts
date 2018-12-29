<template>
  <div class="page-single">
    <div>
        <el-button class="tishen-button" @click="clickUploadButton" type="primary">上传文件</el-button>
        <span v-if="fileName">{{fileName}}</span>
        <input ref="input" class="file-input" type="file" @change="inputChange" accept=".xls,.xlsx,.csv"/>
        <TableBlock :isLoading="isLoading"></TableBlock>
        <chart-block></chart-block>
  </div>
  </div>
</template>

<script>
  import TableBlock from './components/TableBlock'
  import ChartBlock from './components/chartBlock'
  const XLSX = require('xlsx')
  export default {
    name: 'single',
    components: {
      TableBlock,
      ChartBlock
    },
    data () {
      return {
        tableData: [],
        isLoading: false,
        fileName: ''
      }
    },
    methods: {
      clickUploadButton () {
        this.$refs.input.click()
      },
      fileToTable (file) {
        this.isLoading = true
        this.tableData = []
        if (!/\.(xls|xlsx|csv)$/.test(file.name.toLowerCase())) {
          this.$message.error('上传格式不正确')
          this.isLoading = false
          return
        }
        this.fileName = file.name
        let isCsvFile = /csv$/.test(this.fileName.toLowerCase())
        let reader = new FileReader()
        if (isCsvFile) {
          reader.readAsText(file, 'gbk')
        } else {
          reader.readAsDataURL(file)
        }
        reader.onload = (e) => {
          let data = e.target.result
          data = isCsvFile ? data : data.substring(13, data.length)
          const workbook = XLSX.read(data, {
            type: isCsvFile ? 'string' : 'base64',
            cellDates: true
          })
          let csv = XLSX.utils.sheet_to_csv(workbook['Sheets'][workbook['SheetNames'][0]]).split('\n')
          csv.forEach((item, index) => {
            let rowData = item.split(',')
            if (!this._.isEmpty(rowData.filter(data => data))) {
              this.tableData.push(rowData)
            }
          })
          this.$store.dispatch('saveExcelData', this.tableData)
          this.isLoading = false
        }
      },
      inputChange (e) {
        let files = e.target.files
        this.fileToTable(files[0])
      }
    },
    mounted () {
      document.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()

        for (let f of e.dataTransfer.files) {
          this.fileToTable(f)
        }
      })
      document.addEventListener('dragover', function (e) {
        e.preventDefault()
        e.stopPropagation()
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .page-single {
    .el-dropdown-link {
      cursor: pointer;
    }
    .fr {
      float: right;
      margin-right: 5px;
    }
    .file-input {
      display: none;
    }
  }
</style>
