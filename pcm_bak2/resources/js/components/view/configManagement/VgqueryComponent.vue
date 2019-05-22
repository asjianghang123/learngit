<template>
  <div>
  	<el-row>
  		<el-col :span="4" :offset="2">
  			<el-input placeholder="地市" v-model="location" suffix-icon="el-icon-search" clearable></el-input>
  		</el-col>
  		<el-col :span="4" :offset="4"> 
  			<el-input placeholder="小基站TAC" v-model="tac" suffix-icon="el-icon-search" clearable></el-input>
  		</el-col>
  		<el-col :span="4" :offset="4"> 
  			<el-input placeholder="eNBID(十进制)" v-model="eNBID" suffix-icon="el-icon-search" clearable></el-input>
  		</el-col>
	</el-row>
    <el-table :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading.TableDatasStatus" border style="width: 100%" :action="getdatas" max-height="790">
    	<el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop" :width="item.width"> 
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
        		pagesize: 21,
        		pagecount: 0,
        		total:0,
        		location: "",
        		eNBID: "",
        		tac: ""
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
	          		this.currentPage = 1;
	          		if (this.location != "") {
	          			this.tableDatas = this.tableDatas.filter(data => !this.location || data.地市.includes(this.location));
	          		}
	          		if (this.eNBID != "") {
	          			this.tableDatas = this.tableDatas.filter(data => !this.eNBID || data['eNBID（十进制始）'].toLowerCase().includes(this.eNBID.toLowerCase()));
	          		}
	          		if (this.tac != "") {
	          			var temp = this.tac;
	  	          		this.tableDatas = this.tableDatas.filter(function(data){
	  	          			if (data['小基站TAC'] != "" && data['小基站TAC'] != null) {
	  	          				if (data['小基站TAC'].toLowerCase().includes(temp.toLowerCase())) {
	  	          					return data;
	  	          				}
	  	          			}
	  	          		});
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