<template>
  <div class="param">
  	<el-table :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading.TableDatasStatus" border style="width: 100%" :action="getdatas" max-height="850">
    	<el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop"> 
    	</el-table-column>
  	</el-table>
    <el-pagination @size-change="size_change" @current-change="current_change" :page-count="pagecount" :current-page="currentPage" :page-size="21" layout="total, prev, pager, next, jumper" :total="total">
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
    .param .has-gutter tr th {
      background: #CDCDCD;
      font-weight: bolder!important;
      color:black;
    }
</style>
<script>
	export default {
      props: {
        location: Array,
        enodeid: String,
        cellid: String,
        cellname: String,
        table: String
      },
  		data() {
  			return {
  				tableDatas:[],
  				tableHeads:[],
  				loading: {
  					TableDatasStatus: true
  				},
          currentPage: 1,
          pagesize: 21,
          pagecount: 0,
          total:0,
  			}
  		},
  		computed: {
    		getdatas() {	
          if (this.$store.getters.getParamDatasStatus == 1) {
            this.loading.TableDatasStatus = true;
          }
          if (this.$store.getters.getParamDatasStatus == 2) {
            this.loading.TableDatasStatus = false;
            this.tableDatas = this.$store.getters.getParamDatas.tableDatas;
            this.tableHeads = this.$store.getters.getParamDatas.tableHeads;
            this.currentPage = 1;
            if (this.table == 'CM_CC_view') {
              if (this.enodeid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.enodeid || data.eNodeBDN值.includes(this.enodeid));
              }
              if (this.cellid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellid || data.小区ID.toLowerCase().includes(this.cellid.toLowerCase()));
              }
              if (this.cellname != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellname || data.小区名称.toLowerCase().includes(this.cellname.toLowerCase()));
              }
            } else if (this.table == 'CM_CE_view') {
              if (this.enodeid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.enodeid || data.eNodeBDN值.includes(this.enodeid));
              }
              if (this.cellid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellid || data.厂商唯一标识DN.toLowerCase().includes(this.cellid.toLowerCase()));
              }
              if (this.cellname != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellname || data.基站名称.toLowerCase().includes(this.cellname.toLowerCase()));
              }
              
            } else if (this.table == 'CM_CP_view') {
              if (this.enodeid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.enodeid || data.eNodeBID.includes(this.enodeid));
              }
              if (this.cellid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellid || data.小区ID.toLowerCase().includes(this.cellid.toLowerCase()));
              }
              if (this.cellname != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellname || data.小区名称.toLowerCase().includes(this.cellname.toLowerCase()));
              }
            } else if (this.table == 'CM_EP_view') {
              if (this.enodeid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.enodeid || data.eNodeBID.includes(this.enodeid));
              }
              if (this.cellid != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellid || data.厂商唯一标识DN.toLowerCase().includes(this.cellid.toLowerCase()));
              }
              if (this.cellname != "") {
                this.tableDatas = this.tableDatas.filter(data => !this.cellname || data.基站名称.toLowerCase().includes(this.cellname.toLowerCase()));
              }
            }
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