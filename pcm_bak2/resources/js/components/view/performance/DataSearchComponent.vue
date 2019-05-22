<template>
	<div class="datasearch" style="position: relative;top: 10px; margin: 0px 15px 0px 15px;">
		<input style="display: none;height: 10px;" :action="action">
		<el-row>
			<el-col :span="4">
	    	<span class="demonstration" style="text-align: left;width: 10%;">选择维度</span>
			</el-col>
			<el-col :offset="10" :span="2">
				<el-button class="rightbutton" type="primary" size="medium" @click="create = true;showkpiTree()">创建模板</el-button>
			</el-col>
			<el-col :span="2">
				<el-button class="rightbutton" type="primary" size="medium" @click="save = true" >保存模板</el-button>
			</el-col>
			<el-col :span="2">
				<el-button class="rightbutton" type="primary" size="medium" @click="choose = true">选择模板</el-button>
			</el-col >
			<el-col :span="2">
				<el-button class="rightbutton" type="primary" size="medium" @click="changeTemplate();change = true">修改模板</el-button>
			</el-col>
			<el-col :span="2">
				<el-button class="rightbutton" type="danger" size="medium" @click="deleteTemplate" >删除模板</el-button>
			</el-col>
		</el-row>
		<el-row style="position: relative;top: 5px;">
			<el-col :span="4">
    			<el-select v-model="location" placeholder="区域" class="select">
			  	</el-select>
    		</el-col>
			<el-col :span="2">
				<el-select v-model="dateType" placeholder="请选择时间类型" class="select">
    				<el-option v-for="item in dateTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  				</el-select>
			</el-col>
			<el-col :span="6">
				<el-date-picker class="select" v-if="dateType==='天'" v-model="date" :picker-options="pickerOptions" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
    			</el-date-picker>
    			<el-date-picker class="select" v-if="dateType==='月'" v-model="month" type="monthrange" value-format="yyyy-MM" range-separator="-" start-placeholder="开始月份"  end-placeholder="结束月份">
    			</el-date-picker>
    			<el-date-picker class="select" v-if="dateType==='天组'" :picker-options="pickerOptions" v-model="week" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
    			</el-date-picker>
    		</el-col>
    		<el-col :span="4">
    			<el-select v-model="hour" multiple placeholder="请选择小时" multiple collapse-tags class="select"> 
    				<el-option v-for="item in hours" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  				</el-select>
    		</el-col>
    		<el-col :span="4">
    			<el-select v-model="locationDim" placeholder="聚合等级" class="select">
    				<el-option v-for="(item,index) in locationDims" :key="item.index" :label="item.label" :value="item.value"> </el-option>
			  	</el-select>
    		</el-col>
    		<el-col :span="4">
    			<el-select v-model="locationDim" placeholder="频段" class="select">
			  	</el-select>
    		</el-col>
		</el-row>
		<el-tag type="success" size="medium" v-if="label !=''" style="position: relative;top: 5px;">已选模板: {{label}}</el-tag>
		<!-- <span v-if="label !=''" style="position: relative;top: 5px;">已选模板: {{label}}</span> -->
		<el-tabs v-model="activeName" @tab-click="handleClick" style="position: relative;top: 10px;">
		   	<el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.label">
		   		<el-card class="box-card">
		   			<div slot="header" class="clearfix">
		   				<el-row>
		   					<el-col :span="4">
						    	<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
				   				</el-checkbox>
				   			</el-col>
				   			<el-col :offset="16" :span="4">
			   					<el-input placeholder="指标名" size="medium" v-model="chooseKPI" suffix-icon="el-icon-search" clearable style="float: right;"></el-input>
			   				</el-col>
			   			</el-row>
					</div>
					<div style="margin: 15px 0;"></div>
					<el-checkbox-group v-loading="loading.loadkpis" v-model="checkedkpi" @change="handleCheckedkpiChange">
					   	<el-checkbox v-for="kpi in kpis" :label="kpi" :key="kpi" :disabled="disabled" >{{kpi}}</el-checkbox>
					</el-checkbox-group>
				</el-card>
		   	</el-tab-pane>
		</el-tabs>
		<el-card class="box-card" style="position: relative;top: 10px;">
			<div slot="header" class="clearfix">
			    <span>已选指标</span>
			    <el-button v-if="change === true" style="float: right; padding: 3px 0" type="warning" @click="confirmchange">确认修改</el-button>
			    <el-button v-if="change === true" style="float: right; padding: 3px 0" type="warning" @click="cancelchange">取消修改</el-button>
			    <el-button style="float: right; padding: 3px 0" type="text" @click="clearkpi">清空已选指标</el-button>
			</div>
			<el-tag :key="tag" v-for="tag in checkedkpi" :closable="closable" :disable-transitions="false" @close="handleClose(tag)">
				{{tag}}
			</el-tag>
		</el-card>
		<div style="text-align: right;position: relative;top: 10px;">
			<el-button type="primary" icon="el-icon-search" @click="DataQuery();query=true">查询</el-button>
			<el-button type="primary" icon="el-icon-download" @click="exportFile">导出</el-button>
    	</div>
    	<el-dialog title="创建模板":visible.sync="create" width="50%" center>
    		<el-form ref="form" :model="form" label-width="80px" label-position="left">
			  	<el-form-item label="模板名称">
			    	<el-input v-model="form.templateName"></el-input>
			  	</el-form-item>
			</el-form>
			<div style="text-align:center;">
	  			<el-input placeholder="指标名" v-model="kpiname" suffix-icon="el-icon-search" size="small" style="width: 50%;"></el-input>
	  			<el-tree class="filter-tree" :data="kpitree" v-loading = "loading.templatetreeStatus" show-checkbox node-key="id" ref="kpitree" :filter-node-method="filtername" :props="Props">
				</el-tree>
			</div>
			<el-button @click="create = false">取消</el-button>
    		<el-button type="primary" @click="createTemplate" :loading="loading.createStatus">创建</el-button>
		</el-dialog>
		<el-dialog title="选择模板":visible.sync="choose" width="50%" center >
			<div style="text-align:center;">
	  			<el-select v-model="value" clearable filterable placeholder="请选择模板" ref="template">
	  				<el-option v-for="(item,index) in templates" :key="index" :label="item.label" :value="item.label"> 
	  				</el-option>
	  			</el-select>
	  			<el-tree class="filter-tree" :data="templatetree" :props="Props" v-loading = "loading.templatetreeStatus">
				</el-tree>
			</div>
			<el-button @click="choose = false;cancel()">取消选择</el-button>
    		<el-button type="primary" @click="choose = false">确定选中</el-button>
		</el-dialog>
		<el-dialog title="保存模板":visible.sync="save" width="50%" center>
    		<el-form ref="form" :model="form" label-width="80px" label-position="left">
			  	<el-form-item label="模板名称">
			    	<el-input v-model="form.NewtemplateName"></el-input>
			  	</el-form-item>
			</el-form>
			<el-button @click="save = false">取消</el-button>
    		<el-button type="primary" @click="saveTemplate" :loading="loading.saveStatus">创建</el-button>
		</el-dialog>
		<Datatable v-if="query==true" :open="query" v-on:tablequery="tablequery"></Datatable>
	</div>
</template>
<style>
	.el-tag + .el-tag {
	   margin-left: 10px;
	}
	.datasearch .select {
		width: 100%;
	}
	.datasearch .rightbutton {
		float: right;
	}
</style>
<script>
	// window.Vue = require('vue');
 //  	Vue.component('Datatable', function (resolve) {
 //    	require([`./DataSearch/table.vue`], resolve)
 //  	});
 	import {download} from '@/mixin/download.js';
  	import Datatable from './DataSearch/table.vue'
	export default {
		mixins:[
			download
		],
  		data() {
  			return {
  				date: [],
  				dateType: '天',
  				hours:[
	  				{ value: 'allSelect', label: '全选' },
	                { value: '0', label: '0' }, 
	                { value: '1', label: '1' }, 
	                { value: '2', label: '2' }, 
	                { value: '3', label: '3' }, 
	                { value: '4', label: '4' }, 
	                { value: '5', label: '5' }, 
	                { value: '6', label: '6' },
	                { value: '7', label: '7' }, 
	                { value: '8', label: '8' }, 
	                { value: '9', label: '9' }, 
	                { value: '10', label: '10' }, 
	                { value: '11', label: '11' }, 
	                { value: '12', label: '12' }, 
	                { value: '13', label: '13' }, 
	                { value: '14', label: '14' }, 
	                { value: '15', label: '15' }, 
	                { value: '16', label: '16' }, 
	                { value: '17', label: '17' }, 
	                { value: '18', label: '18' }, 
	                { value: '19', label: '19' }, 
	                { value: '20', label: '20' }, 
	                { value: '21', label: '21' }, 
	                { value: '22', label: '22' }, 
	                { value: '23', label: '23' }
	            ],
	            pickerOptions: {
	            	firstDayOfWeek: 1
	            },
  				month: [],
  				week: [],
  				dateTypes:[
  					{ value: '天', label: '天' }, 
                	{ value: '月', label: '月' },
                	{ value: '天组', label: '天组' }
               	],
               	location:'',
               	locationDims: [
               		{ value: 'cell', label: '小区' }, 
                	{ value: 'site', label: '基站' },
                	{ value: 'city', label: '城市' }
                ],
                locationDim:"",
               	activeName: 'allkpi',
               	isIndeterminate: true,
               	checkAll: false,
               	kpis:[],
               	checkedkpi:[],
               	tabs:[],
               	chooseKPI: '',
               	hour:[],
               	create: false,
               	form: {
               		templateName:'',
               		NewtemplateName: ''
               	},
               	kpiname:'',
               	kpitree: [],
               	Props: {
		          	children: 'children',
		          	label: 'label'
		        },
		        loading: {
		        	createStatus: false,
		        	templatetreeStatus: false,
		        	loadkpis: false,
		        	saveStatus: false
		        },
		        choose: false,
		        value: '',
		        templatetree:[],
		        templates: [],
		        label: '',
		        closable: true,
		        disabled: false,
		        change: false,
		        query: false,
		        save: false,
		        downloadurl: ""
  			}
  		},
  		components: {
  			Datatable
  		},
  		watch: {
      		kpiname(val) {
        		this.$refs.kpitree.filter(val);
      		},
      		value(val) {
      			if (val == "" || val == null) {
      				this.templatetree = [];
      				this.kpis = [];
  					this.checkedkpi = [];
  					this.closable = true;
  					this.disabled = false;
  					this.label = "";
      			} else {
      				var temp = new Array();
      				var ids;
      				this.templates.map((element)=>{
      					if (element["label"] == val) {
      						ids = element["value"];
      					}
      				});
      				this.$store.dispatch("KpiTree", {
						ids: ids
					}).then(()=>{
						this.$store.getters.getkpiTree.map((item)=>{
	      					item["children"].map((element)=>{
	      						temp.push(element["label"]);
	      					});
	      				});
	      				// this.kpis = temp;
	      				this.checkedkpi = temp;
	      				this.closable = false;
	      				this.disabled = true;
					});
      				
      				
      			}
      			
      		},
    	},
    	created() {
    		this.$store.dispatch("ShowKPI", {
    			kpiType: this.activeName
    		});
    		this.$store.dispatch("ShowKpiType");
    		this.$store.dispatch("GetTemplate");
    	},
    	computed: {
    		action() {
    			if (this.$store.getters.getloadKPIStatus == 2) {
    				this.loading.loadkpis = false;
    				this.kpis = this.$store.getters.getkpisData;
    				if (this.chooseKPI != "") {
	          			this.kpis = this.kpis.filter(data => !this.chooseKPI || data.includes(this.chooseKPI));
	          		}
    			}
    			if (this.$store.getters.getloadKPIStatus == 1) {
    				this.loading.loadkpis = true;
    			}
    			if (this.$store.getters.getloadKpisTypesStatus == 2) {
    				
    				this.tabs = this.$store.getters.getkpisTypes;
    			}
    			if (this.$store.getters.getloadkpiTreeStatus == 1) {
    				this.loading.templatetreeStatus = true;
    			}
    			if (this.$store.getters.getloadkpiTreeStatus == 2) {
    				this.loading.templatetreeStatus = false;
    				this.kpitree = this.$store.getters.getkpiTree;
    				if (this.value != "" && this.value != null) {
    					this.templatetree = this.$store.getters.getkpiTree;
    				}
    				
    			}
    			if (this.$store.getters.gettemplateStatus == 2) {
    				this.templates = this.$store.getters.gettemplate;
    				if (this.value != "" && this.value != null) {
    					this.templates.map((element)=>{
    						if (element["label"] == this.value) {
    							this.checkedtree = element["value"].split(",");
    						}
    					});
    					this.label = this.value;
    				}
    			}
    			if (this.$store.getters.getUpdateTemplateStatus == 2) {

    			}
    			if (this.hour.some((element)=>{
    				return element == "allSelect" == true;
    			})) {
    				if (this.hour.length <23) {
    					this.hour = [];
    					this.hours.map((item)=>{
    						if (item["value"] != "allSelect") {
    							this.hour.push(item["value"]);
    						}
    						
    					});
    					
    				} else {
    					this.hour = [];
    				}
    			}//小时多选逻辑
    		}
    	},
  		methods:{
  			handleClick(tab, event) {
  				this.$store.dispatch("ShowKPI", {
	    			kpiType: this.activeName
	    		});
  			},
  			handleCheckAllChange(val) {
  				// if (val) {
  				// 	this.kpis.map((value)=>{
  				// 		this.checkedkpi.push(value);
  				// 	});
  						
  				// } else {
  				// 	this.kpis.map((value)=>{
  				// 		this.checkedkpi.splice(this.checkedkpi.indexOf(value), 1);
  				// 	});	
  				// }
		        this.checkedkpi = val ? this.kpis : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedkpiChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.kpis.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.kpis.length;
		    },
		    handleClose(tag) {
		        this.checkedkpi.splice(this.checkedkpi.indexOf(tag), 1);
		    },
		    clearkpi() {
		    	if (this.checkedkpi.length == 0) {
		    		this.$message({
			          	message: '没有选中的指标',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	if ((this.label !="" && this.label != null) && (this.closable == false && this.disabled == true)) {
		    		this.$message({
			          	message: '模板选中时不能清空',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	this.$confirm('确认清空所选指标', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.checkedkpi = [];
		        }).catch(()=>{

		        });
		    },
		    createTemplate() {
		    	if (this.form.templateName == '' || this.form.templateName == null) {
					this.$message({
			          	message: '请输入模板名称',
			          	type: 'warning'
			        });
			        return;
				}
      			if (this.$refs.kpitree.getCheckedKeys(true).length == 0) {
		    		this.$message({
			          	message: '没有选中的指标',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	if (this.templates.some((element)=>{
		    		return element["label"] == this.form.templateName == true;
		    	})) {
		    		this.$message({
			          	message: '模板名重复',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	this.loading.createStatus = true;
		    	this.$store.dispatch("AddTemplate", {
		    		id: this.$refs.kpitree.getCheckedKeys(true),
		    		templateName: this.form.templateName
		    	}).then(()=>{
		    		this.loading.createStatus = false;
		    		this.$store.dispatch("GetTemplate");
    				this.$notify({
	                  	showClose: true,
	                  	message: '创建成功',
	                  	type: 'success'
	                });
	                this.create = false;
		    	});
		    },
		    filtername(value, data) {
        		if (!value) return true;
        		return data.label.indexOf(value) !== -1;
      		},
      		cancel() {
      			this.value = "";
      			this.label = "";
      			this.change = false;
      			this.closable = true;
  				this.disabled = false;
      		},
      		changeTemplate() {
      			if (this.label == '' || this.label == null) {
					this.$message({
			          	message: '请选择模板',
			          	type: 'warning'
			        });
			        return;
				}
				this.closable = true;
  				this.disabled = false;
      		},
      		confirmchange() {
      			if (this.checkedkpi.length == 0) {
					this.$message({
			          	message: '模板里不能没有指标',
			          	type: 'warning'
			        });
			        return;
				}
				this.$confirm('确认修改所选模板', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$store.dispatch("UpdateTemplate", {
	      				kpiName: this.checkedkpi,
	      				templateName: this.label
	      			}).then(()=>{
	      				this.$store.dispatch("GetTemplate").then(()=>{
	      					var tempid;
		      				this.templates.map((element)=>{
	      						if (element["label"] == this.label) {
	      							tempid = element["value"];
	      						}
		      					
		      				})
		      				this.$store.dispatch("KpiTree", {
								ids: tempid
							});
							this.closable = false;
  							this.disabled = true;
  							this.change = false;
		      				this.$notify({
			                  	showClose: true,
			                  	message: '修改成功',
			                  	type: 'success'
			                });
	      				});
	      				
	      			});
		        }).catch(()=>{

		        });
      			
      		},
      		deleteTemplate() {
      			if (this.label == '' || this.label == null) {
					this.$message({
			          	message: '请选择模板',
			          	type: 'warning'
			        });
			        return;
				}
				this.$confirm('确认删除'+this.label+'模板', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$store.dispatch("DeleteTemplate", {
		        		templateName: this.label
		        	}).then(()=>{
		        		this.value = "";
      					this.label = "";
      					this.$store.dispatch("GetTemplate");
		        		this.$notify({
		                  	showClose: true,
		                  	message: '删除成功',
		                  	type: 'success'
		                });

		        	});
		        }).catch(()=>{

		        });
      		},
      		showkpiTree() {
      			this.$store.dispatch("KpiTree", {
	    			ids: ""
	    		});
      		},
      		cancelchange() {
      			this.change = false;
      			this.closable = false;
  				this.disabled = true;
      		},
      		saveTemplate() {
      			if (this.form.NewtemplateName == '' || this.form.NewtemplateName == null) {
					this.$message({
			          	message: '请输入模板名称',
			          	type: 'warning'
			        });
			        return;
				}
      			if (this.checkedkpi.length == 0) {
		    		this.$message({
			          	message: '没有选中的指标',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	this.loading.saveStatus = true;
		    	if (this.templates.some((element)=>{
		    		return element["label"] == this.form.NewtemplateName == true;
		    	})) {
		    		this.$message({
			          	message: '模板名重复',
			          	type: 'warning'
			        });
			        return;
		    	}
		    	this.$store.dispatch("SaveTemplate", {
		    		kpiName: this.checkedkpi,
		    		templateName: this.form.NewtemplateName
		    	}).then(()=>{
		    		this.value = "";
		    		this.$store.dispatch("GetTemplate");
		    		this.loading.saveStatus = false;
		    		this.label = this.form.NewtemplateName;
		    		this.closable = false;
		        	this.disabled = true;
    				this.$notify({
	                  	showClose: true,
	                  	message: '创建成功',
	                  	type: 'success'
	                });
	                this.save = false;
		    	});
      		},
      		DataQuery() {
      			if (this.checkedkpi.length == 0) {
      				this.query = false;
      				this.$message({
			          	message: '请选择指标或者模板',
			          	type: 'warning'
			        });
			        return;
      			}
      			switch(this.dateType) {
      				case "天":
      					this.month = null;
      					this.week = null;
      					break;
      				case "月":
      					this.date = null;
      					this.week = null;
      					break;
      				case "周":
      					this.date = null;
      					this.month = null;
      					break;

      			}
  				this.$store.dispatch("DataQuery", {
  					date: this.date || this.month || this.week,
  					dateType: this.dateType,
  					hour: this.hour,
  					kpiName: this.checkedkpi,
  					templateName: this.label,
  					locationDim: this.locationDim
  				});
      		},
      		tablequery(val) {
      			this.query = false;
      		},
      		exportFile() {
      			if (this.checkedkpi.length == 0) {
      				this.$message({
			          	message: '请选择指标或者模板',
			          	type: 'warning'
			        });
			        return;
      			}
      			switch(this.dateType) {
      				case "天":
      					this.month = null;
      					this.week = null;
      					break;
      				case "月":
      					this.date = null;
      					this.week = null;
      					break;
      				case "周":
      					this.date = null;
      					this.month = null;
      					break;

      			}
      			this.downloadurl = "";
  				this.$store.dispatch("DataQuery", {
  					date: this.date || this.month || this.week,
  					dateType: this.dateType,
  					hour: this.hour,
  					kpiName: this.checkedkpi,
  					templateName: this.label,
  					locationDim: this.locationDim
  				}).then(()=>{
  					if (this.$store.getters.getDataQueryStatus == 2) {
  						for (var key in this.$store.getters.getDataQuery) {
							if (key == "error") {
								this.$notify.error({
						          	title: '错误',
						          	message: this.$store.getters.getDataQuery.error,
						          	duration: 0
						        });
						        return;
							}
						}
  						this.downloadurl = this.$store.getters.getDataQuery.downloadurl;
	  					var uerAgent = navigator.userAgent.toLowerCase();
		              	var format = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
		              	var matches = uerAgent.match(format);
		              	var browerInfo = matches[1].replace(/version/, "'safari");
		              	if (browerInfo == "chrome") {
			                this.download_chrome(this.downloadurl);
			                this.$notify({
			                  message: '导出成功',
			                  type: 'success'
			                });
			                
			            } else if (browerInfo == "firefox") {
			                this.download_firefox(this.downloadurl);
			                this.$notify({
			                  message: '导出成功',
			                  type: 'success'
			                });
			                
			            }
  					}

  					
  				});
  				
      			
      		}
  		}
  	}
</script>