<template>
  <div>
    <el-table :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading.TableDatasStatus" border :action="getdatas" max-height="700">
      <el-table-column type="index" label="序号" prop="序号" width="50">
      </el-table-column>
      <el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop"> 
    	</el-table-column>	
    </el-table>
    <el-pagination @size-change="size_change" @current-change="current_change" :page-count="pagecount" :current-page.sync="currentPage" :page-size="7" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
<style>
	body .el-table th.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
  body .el-table colgroup.gutter{
    display: table-cell!important;
  }/*防止单元格错位*/
</style>
<script>
  export default {
   data() {
      return {
        tableDatas:[],
        tableHeads:[],
        loading: {
          TableDatasStatus: false
        },
        currentPage: 1,
        pagesize: 7,
        pagecount: 0,
        total:0
      }
    },
    computed: {
      getdatas() {  
        if (this.$store.getters.getAlarmQueryStatus == 2) {
          this.tableDatas = this.$store.getters.getAlarmQueryDatas.tableDatas;
          this.tableHeads = this.$store.getters.getAlarmQueryDatas.tableHeads;
          this.currentPage = 1;
          this.total = this.tableDatas.length;
          this.pagecount = parseInt(this.total)%parseInt(this.pagesize) ==0?(parseInt(this.total)/parseInt(this.pagesize)):parseInt(parseInt(this.total)/parseInt(this.pagesize))+1;
        }
       
      }
    },
    methods: {
        current_change: function(currentPage) {
          this.currentPage = currentPage;
        },
        size_change: function(sizeChange) {
          this.pagesize = sizeChange;
        }
    }
  }
</script>