<template>
  <div class="page-single">
    <div>
      <div class="" style="color: #dc3545;">
        <el-button class="tishen-button" @click="clickUploadButton" type="primary">上传文件</el-button>
        <span v-if="fileName">{{fileName}}</span>
        <input ref="input" class="file-input" type="file" @change="inputChange" accept=".xls,.xlsx,.csv"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  const XLSX = require('xlsx')
  export default {
    name: 'single',
    components: {
      Spinner
    },
    data () {
      return {
        fileName: '',
        isLoading: false,
        titleList: [],
        dataList: []
      }
    },
    methods: {
      clickUploadButton () {
        this.$refs.input.click()
      },
      fileToTable (file) {
        this.isLoading = true
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
          csv.forEach((row, index) => {
            if (index === 0) {
              this.titleList = row.split(',').filter(item => !this._.isEmpty(item))
            } else {
              if (!this._.isEmpty(row.split(',').filter(item => !this._.isEmpty(item)))) {
                this.dataList.push(row.split(','))
              }
            }
          })
          console.log(this.dataList)
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
  html,
  boby {
    height: 100%;
  }

  body {
    background-size: cover;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
  }

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
    .table-div {
      min-height: 400px;
      height: 400px;
      width: 980px;
      overflow: scroll;
      table {
        width: 2000px;
      }
    }
    table.altrowstable {
      text-align: center;
      font-family: verdana,arial,sans-serif;
      font-size:16px;
      color:#333333;
      border-width: 1px;
      border-color: #a9c6c9;
      border-collapse: collapse;
    }
    table.altrowstable th {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #a9c6c9;
    }
    table.altrowstable td {
      border-width: 1px;
      padding: 8px;
      border-style: solid;
      border-color: #a9c6c9;
    }
    table tr:nth-of-type(odd){ background-color:#d4e3e5;}
    table tr:nth-of-type(even){ background-color:#c3dde0;}
    .oddrowcolor{
      background-color:#d4e3e5;
    }
    .evenrowcolor{
      background-color:#c3dde0;
    }
  }
</style>
