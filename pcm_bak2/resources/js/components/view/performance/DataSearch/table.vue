<template>
	<el-dialog title="查询框" :visible.sync="query" fullscreen :action="action">
		<el-table :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe border style="width: 100%" v-loading="loading.TableDatasStatus">
			<el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop"> 
    		</el-table-column>
    	</el-table>
		<el-pagination @size-change="size_change" @current-change="current_change" :page-count="pagecount" :current-page.sync="currentPage" :page-size="7" layout="total, prev, pager, next, jumper" :total="total" style="float: right;">
		</el-pagination>
	</el-dialog>
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
		props: {
			open: Boolean
		},
		data() {
			return {
				tableDatas: [],
				tableHeads:[],
		        query: this.open,
		        loading: {
		        	TableDatasStatus: false
		        },
		        currentPage: 1,
		        pagesize: 7,
		        pagecount: 0,
		        total:0
			}
		},
		watch: {
			query(val) {
				this.$emit('tablequery', val);
			}
		},
		created() {
			
		},
		computed: {
			action() {
				if (this.$store.getters.getDataQueryStatus == 1) {
					this.loading.TableDatasStatus = true;
				}
				if (this.$store.getters.getDataQueryStatus == 2) {
					for (var key in this.$store.getters.getDataQuery) {
						if (key == "error") {
							this.$notify.error({
					          	title: '错误',
					          	message: this.$store.getters.getDataQuery.error,
					          	duration: 0
					        });
					        this.query = false;
					        return;
						}
					}
					this.loading.TableDatasStatus = false;
					this.tableHeads = this.$store.getters.getDataQuery.tableHeads;
					this.tableDatas = this.$store.getters.getDataQuery.tableDatas;
					this.currentPage = 1;
          			this.total = this.tableDatas.length;
          			this.pagecount = parseInt(this.total)%parseInt(this.pagesize) ==0?(parseInt(this.total)/parseInt(this.pagesize)):parseInt(parseInt(this.total)/parseInt(this.pagesize))+1;
				}
				
				// console.log(this.query);
			}
		},
		methods:{
			current_change: function(currentPage) {
          		this.currentPage = currentPage;
        	},
        	size_change: function(sizeChange) {
          		this.pagesize = sizeChange;
        	}
		}
	}
</script>