<template>
	<div :action = "getDatas" style="position: relative;top: 10px;margin: 0px 15px 0px 15px;">
		<el-row>
			<el-col :span="4">
				<el-input placeholder="请输入用户组名" v-model="usergroupName" suffix-icon="el-icon-search" clearable></el-input>
			</el-col>
			<el-col :span="2" :offset="14">
				<el-button type="primary" size="medium" plain @click="openCreate();open">创建</el-button>
			</el-col>
			<el-col :span="2">
				<el-button type="danger" size="medium" plain @click="deleteUsergroups">删除</el-button>
			</el-col>
			<el-col :span="2">
				<el-dropdown placement="bottom-end">
					<el-button size="medium" plain>...</el-button>
					<el-dropdown-menu slot="dropdown">
				    	<el-dropdown-item>批量导入用户组</el-dropdown-item>
				    	<el-dropdown-item>导出全部角色</el-dropdown-item>
				  	</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<el-table ref="multipleTable" :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" style="width: 100%;top: 10px;" @selection-change="handleSelectionChange">
    		<el-table-column type="selection" width="55"></el-table-column>
    		<el-table-column v-for="item in tableHeads" :label="item.label" :key="item.label" :prop="item.prop" :width="item.width"> 
    		</el-table-column>
    		<el-table-column label="操作">
     	 		<template slot-scope="scope">
        			<el-button size="mini" @click="userbind(scope.$index, scope.row);user">用户绑定</el-button>
        			<el-button size="mini" @click="menubind(scope.$index, scope.row);menu">权限绑定</el-button>
        			<el-button size="mini" type="danger" @click="deletegroup(scope.$index, scope.row)">删除</el-button>
      			</template>
    		</el-table-column>
  		</el-table>
  		<el-dialog title="权限绑定":visible.sync="menu" width="50%" center>
  			<el-input placeholder="请输入子菜单名" v-model="menuname" suffix-icon="el-icon-search"></el-input>
  			<el-tree class="filter-tree" :data="menutree" show-checkbox node-key="id" ref="menutree" :filter-node-method="filterMenuname" :default-checked-keys="checkedid" :props="menuProps">
			</el-tree>
    		<el-button @click="menu = false">关闭</el-button>
    		<el-button type="primary" @click="getKeys" :loading="loading.updatemenuid">更新</el-button>
		</el-dialog>
		<el-dialog title="用户绑定" :visible.sync="user" width="50%" center>
			<el-input placeholder="请输入用户名" v-model="Username" suffix-icon="el-icon-search"></el-input>
			<el-tree class="filter-tree" :data="usertree" show-checkbox node-key="id" ref="usertree" :filter-node-method="filterUsername" :default-checked-keys="checkuserid" :props="userProps">
			</el-tree>
    		<el-button @click="user = false">关闭</el-button>
    		<el-button type="primary" @click="updateUserTree">更新用户</el-button>
		</el-dialog>
		<el-dialog title="创建用户组":visible.sync="open" width="50%" center>
			<el-form ref="form" :model="form" label-width="80px" label-position="left">
			  	<el-form-item label="用户组名">
			    	<el-input v-model="form.groupname"></el-input>
			  	</el-form-item>
			  	<el-form-item label="描述">
			  		<el-input v-model="form.describe"></el-input>
				</el-form-item>
			</el-form>
			<div style="text-align:center;">
	  			<el-input placeholder="请输入子菜单名" v-model="menuname" suffix-icon="el-icon-search" size="small" style="width: 50%;"></el-input>
	  			<el-tree class="filter-tree" :data="menutree" show-checkbox node-key="id" ref="menutree" :filter-node-method="filterMenuname" :props="menuProps">
				</el-tree>
			</div>
    		<el-button @click="open = false">关闭</el-button>
    		<el-button type="primary" @click="createUserGroup" :loading="loading.createStatus">创建</el-button>
		</el-dialog>
  		<div style="margin-top: 20px">
    		<el-button @click="toggleSelection()">取消选择</el-button>
  		</div>
  		<el-pagination @size-change="size_change" @current-change="current_change" :page-count="pagecount" :current-page="currentPage" :page-size="21" layout="total, prev, pager, next, jumper" :total="total">
    	</el-pagination>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				menutree:[],
				usertree: [],
				tableHeads: [],
				tableDatas: [],
				menuProps: {
		          	children: 'children',
		          	label: 'label'
		        },
		        userProps: {
		          	children: 'children',
		          	label: 'label'
		        },
		        currentPage: 1,
        		pagesize: 21,
        		pagecount: 0,
        		total:0,
        		menu: false,
        		checkedid: [],
        		checkuserid: [],
        		usergroup: "",
        		loading: {
        			updatemenuid: false,
        			createStatus: false
        		},
        		user: false,
        		menuname: "",
        		Username: "",
        		usergroupName: "",
        		open: false,
        		form: {
        			groupname: "",
        			describe: ""
        		},
        		multipleSelection: ""
			}
		},
		created() {
			
			this.$store.dispatch("UserGroupTable");
		},
		watch: {
      		menuname(val) {
        		this.$refs.menutree.filter(val);
      		},
      		Username(val) {
      			this.$refs.usertree.filter(val);	
      		}
    	},
		computed: {
			getDatas() {
				if (this.$store.getters.getmenuTreeStatus == 2) {
	  				this.menutree = this.$store.getters.getmenuTree["menu"];
	  				this.checkedid = this.$store.getters.getmenuTree["checkid"];
	  			}
	  			if (this.$store.getters.getusergrouptableStatus == 2) {
	  				this.currentPage = 1;
	  				this.tableDatas = this.$store.getters.getusergrouptables.tableDatas;
	  				this.tableHeads = this.$store.getters.getusergrouptables.tableHeads;
	  				if (this.usergroupName != "") {
	          			this.tableDatas = this.tableDatas.filter(data => !this.usergroupName || data.用户组.includes(this.usergroupName));
	          		}
	  				this.total = this.tableDatas.length;
	  				this.pagecount = parseInt(this.total)%parseInt(this.pagesize) ==0?(parseInt(this.total)/parseInt(this.pagesize)):parseInt(parseInt(this.total)/parseInt(this.pagesize))+1;
	  			}
	  			if (this.$store.getters.getuserTreeStatus == 2) {
	  				this.usertree = this.$store.getters.getuserTree["user"];
	  				this.checkuserid = this.$store.getters.getuserTree["checkid"];
	  			}
			}
		},
		methods:{
			current_change: function(currentPage) {
        		this.currentPage = currentPage;
      		},
      		size_change: function(sizeChange) {
        		this.pagesize = sizeChange;
      		},
      		toggleSelection(rows) {
        		if (rows) {
          			rows.forEach(row => {
            		this.$refs.multipleTable.toggleRowSelection(row);
          			});
        		} else {
          			this.$refs.multipleTable.clearSelection();
        		}
      		},
      		handleSelectionChange(val) {
        		this.multipleSelection = val;
      		},
      		userbind(index, row) {
      			this.user = true;
      			this.usergroup = row["用户组"];
      			this.$store.dispatch("getUserTree", {
      				usergroup: this.usergroup
      			})
      		},
      		getKeys() {
      			// console.log(this.usergroup);
      			this.loading.updatemenuid = true;
      			this.$store.dispatch("updateGroupMenu", {
      				usergroup: this.usergroup,
      				id: this.$refs.menutree.getCheckedKeys(true)
      			}).then(()=>{
      				this.loading.updatemenuid = false;
      				this.menu = false;
      				this.$notify({
	                  showClose: true,
	                  message: '更新成功',
	                  type: 'success'
	                });
      			});
		    },
      		menubind(index, row) {
      			this.menu = true;
      			this.usergroup = row["用户组"];
      			this.$store.dispatch("getMenuTree", {
      				usergroup: this.usergroup
      			});
      		},
      		updateUserTree() {
      			var username = new Array() ;
      			for (var node of this.$refs.usertree.getCheckedNodes(true)) {
      				username.push(node["label"]);
      			}
      			this.$confirm('确认将所选用户更新到'+this.usergroup, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$store.dispatch("updateUserGroup", {
		        		usergroup: this.usergroup,
		        		username: username
		        	});
		        	this.$store.dispatch("getUserTree", {
      					usergroup: this.usergroup
      				})
		          	this.$message({
		            	type: 'success',
		            	message: '更新成功!'
		          	});
		        });
      		},
      		filterMenuname(value, data) {
        		if (!value) return true;
        		return data.label.indexOf(value) !== -1;
      		},
      		filterUsername(value, data) {
      			if (!value) return true;
        		return data.label.indexOf(value) !== -1;
      		},
      		openCreate() {
      			this.open = true;
      			this.usergroup = "";
      			this.$store.dispatch("getMenuTree", {
      				usergroup: this.usergroup
      			});
      		},
      		createUserGroup() {
      			if (this.form.groupname == '' || this.form.groupname == null) {
					this.$message({
			          	message: '请输入用户组名',
			          	type: 'warning'
			        });
			        return;
				}
				if (this.tableDatas.some((element)=>{
					return element["用户组"] == this.form.groupname == true;
				})) {
					this.$message({
			          	message: '用户组名重复',
			          	type: 'warning'
			        });
			        return;
				}
				this.loading.createStatus = true;
				this.$store.dispatch("AddUserGroup", {
					usergroup: this.form.groupname,
					describe: this.form.describe,
					id: this.$refs.menutree.getCheckedKeys(true)
				}).then(()=>{
					this.$message({
		            	type: 'success',
		            	message: '创建成功!'
		          	});
		          	this.$store.dispatch("UserGroupTable");
		          	this.form.groupname = '';
		          	this.form.describe = '';
		          	this.loading.createStatus = false;
		          	this.open = false;
				});
      		},
      		deletegroup(index, row){
      			var usergroupArr = new Array();
      			usergroupArr.push(row["用户组"]);
      			this.$confirm('确认删除'+row["用户组"]+'这个用户组', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(()=>{
		        	this.$store.dispatch("DeleteGroup", {
	      				usergroup: usergroupArr
	      			}).then(()=>{
	      				this.$store.dispatch("UserGroupTable");
	      				this.$message({
			            	type: 'success',
			            	message: '删除成功!'
			          	});
	      				
	      			});
		        });
      			
      		},
      		deleteUsergroups() {
      			if (this.multipleSelection == '' || this.multipleSelection == null) {
					this.$message({
			          	message: '请选中用户组',
			          	type: 'warning'
			        });
			        return;
				}
				var usergroupArr = new Array();
				for (var node of this.multipleSelection) {
      				usergroupArr.push(node["用户组"]);
      			}
      			console.log(usergroupArr);
				this.$confirm('确认删除选中的用户组', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(()=>{
		        	this.$store.dispatch("DeleteGroup", {
	      				usergroup: usergroupArr
	      			}).then(()=>{
	      				this.$store.dispatch("UserGroupTable");
	      				this.$message({
			            	type: 'success',
			            	message: '删除成功!'
			          	});
	      				
	      			});
		        });
      			
      		}
		}
	}
</script>