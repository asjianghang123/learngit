<template>
  	<el-table :data="tableDatas" v-loading="loading.TableDatasStatus" border style="width: 100%" :action="getdatas" max-height="850" show-summary>
  		<el-table-column type="index" label="序号" prop="序号" width="50">
    	</el-table-column>
    	<el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop"> 
    	</el-table-column>
  	</el-table>
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
  				}
  			}
  		},
  		computed: {
    		getdatas() {	
    			if (this.$store.getters.getTableDatasStatus == 1) {
    				this.loading.TableDatasStatus = true;
    			}
	            if (this.$store.getters.getTableDatasStatus == 2) {
	            	this.loading.TableDatasStatus = false;
	            	this.tableHeads = this.$store.getters.getTableDatas.tableHeads;
	            	this.tableDatas = this.$store.getters.getTableDatas.tableDatas;
	            }
    		}
    	},
  	}
</script>