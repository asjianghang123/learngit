<template>
  <div class="userRightsManagement">
    <el-row>
      <div class="font marginBottom">用户</div>
      <el-col :spqn="24">
        <el-card shadow="hover">
          <el-row>
            <el-col :span="3">
              <el-input
                size="small"
                placeholder="请输入用户名"
                v-model="input.user"
                
                @change="inputUser">
                <!-- :computed="inputUser" -->
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            <el-col :span="4" :offset='1'>
              <el-select size="small" v-model="select.role" @change="changeRoles" placeholder="全部用户类型">
                <el-option
                  v-for="item in select.roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select size="small" v-model="select.status" @change="changeStatus" placeholder="全部使用状态">
                <el-option
                  v-for="item in select.statusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" style="float: right;">
              <el-button size="small" @click="refresh">刷新</el-button>
              <el-button size="small" type="info" @click="deleteUser">删除</el-button>
              <el-button size="small" type="primary" @click="dialogVisible = true">创建</el-button>
              <el-dropdown style="margin-left: 10px;">
                <el-button size="small" type="primary">
                  ...
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item @click="importUsers">批量导入用户</el-dropdown-item> -->
                  <!-- <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-dropdown-item slot="trigger" size="small" type="primary">批量导入用户</el-dropdown-item>
                  </el-upload> -->
                  <el-upload
                    class="upload-demo"
                    action="/uploadUser"
                    :show-file-list="uploadFiles.showFileList"
                    :accept="uploadFiles.accept"
                    :before-upload="beforeUpload"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    >
                   <!--  :on-change="handleChange"
                    :file-list="fileList" -->
                    <el-dropdown-item size="small" type="primary">批量导入用户</el-dropdown-item>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>

                  <el-dropdown-item>批量修改用户</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="24">
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe='true'
                size="mini"
                ref="multipleTable"
                :data="userData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                
                >
                <!-- :action="getData" -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  v-for="(column, index) in columns"
                  :key="index"
                  :prop="column.prop"
                  :label="column.label"
                >
                </el-table-column>
                <el-table-column prop="status"
                  label="账号状态"
                  width="100"
                  >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.status === 'off' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.status}}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="useStatus"
                  label="账号使用状态"
                  width="100"
                  >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.useStatus === 'off' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.useStatus}}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="handleResetPwd(scope.row)" type="text" size="small">重置密码</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button type="text" size="small" v-show="scope.row.useStatus==='on'" @click="handleUseStatus(scope.row)">停用</el-button>
                    <el-button type="text" size="small" v-show="scope.row.useStatus==='off'" @click="handleUseStatus(scope.row)">启用</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24">
              <el-pagination style="float: right;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagination.pageSize"
                layout="sizes, prev, pager, next"
                :total="pagination.total">
              </el-pagination>
            </el-col>
          </el-row>
          <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([userData[1], userData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div> -->
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="用户创建"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="userForm">
        <el-form-item label="城市" prop="city">
          <el-input v-model="userForm.city"></el-input>
        </el-form-item>
        <el-form-item label="区县" prop="county">
          <el-input v-model="userForm.county"></el-input>
        </el-form-item>
        <el-form-item label="账号名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属单位" prop="unit">
          <el-input v-model="userForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="userForm.department"></el-input>
        </el-form-item>
        <el-form-item label="用户分类" prop="userClassification">
          <el-input v-model="userForm.userClassification"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="userForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="userForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="userForm.role"></el-input>
        </el-form-item>
        <el-form-item label="密码有效天数" prop="passwordValidDays">
          <el-input v-model.number="userForm.passwordValidDays"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>  
</template>

<script>
  import {
    getUsers,
    deleteUsers,
    addUser,
    switchUseStatus,
    resetPwd
  } from "@/api/systemSecurityManagement/UserRightsManagement";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if ( value.length<6 && value.length>16 ) {
          callback(new Error('密码长度在6到16个字符'));
        }else {
          callback();
        }
      };
      /*var checkValidDays = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('天数不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          // if (value < 18) {
          //   callback(new Error('必须年满18岁'));
          // } else {
          callback();
          // }
        }
      };*/
      return {
        columns: [],
        userData: [],
        allData:[],
        multipleSelection: [],
        pagination: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        loading: false,

        input: {
          user: '',
        },
        select: {
          role: '',
          roles: [],

          status: '',
          statusArr: [],
        },

        dialogVisible: false,

        userForm:{
          city: '',
          county: '',
          name: '',
          email: '',
          password: '',
          unit: '',
          department: '',
          userClassification: '',
          username: '',
          idCard: '',
          contactPhone: '',
          role: '',
          passwordValidDays: 0
        },
        rules: {
          city: [{ required: true, message: '请输入城市名称', trigger: 'blur' }],
          county: [{ required: true, message: '请输入县区名称', trigger: 'blur' }],
          name: [
            {required: true, message: '请输入用户名名称', trigger: 'blur'},
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
            {  min: 6, max: 16, message: '密码长度在6到16个字符'}],
          // password: [{ validator: validatePass, trigger: 'blur' }],
          userClassification: [{required: true, message: '请输入用户分类名称', trigger: 'blur'}],
          username: [{required: true, message: '请输入用户姓名', trigger: 'blur'}],
          role: [{required: true, message: '请输入角色', trigger: 'blur'}],
          // passwordValidDays: { validator: checkValidDays, trigger: 'blur' }
          passwordValidDays: [{ required: true, message: '有效天数不能为空', trigger: 'blur'},
            { type: 'number', message: '天数必须为数字值', trigger: ['blur', 'change']}]
        },
        // fileList: []
        uploadFiles: {
          showFileList: false,
          accept: '.xlsx'
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.userData = this.handlePagination()
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.userData = this.handlePagination()
      },
      //分页
      handlePagination() {
        return Array.prototype.slice.call(
          this.allData, 
          (this.pagination.currentPage-1)*this.pagination.pageSize, 
          this.pagination.pageSize*this.pagination.currentPage);
      },
      //获取用户类型
      getRoles() {
        this.attayFilter('role', 'roles');
      },
      //获取状态类型
      getStatus() {
        this.attayFilter('status', 'statusArr');
      },
      //数组筛选
      attayFilter(name, arrs) {
        let arr = [];
        _.forEach(this.allData, v=>{
          arr.push(v[name]);
        });
        let array = Array.from(new Set(arr));
        _.forEach(array, v=>{
          this.select[arrs].push({'label': v, 'value': v})
        });
      },
      //初始化
      init() {
        //麻烦的写法。可能抛弃
        // this.$store.dispatch('GetUsers');
        this.loading = true;
        getUsers().then((res)=>{
          this.loading = false;
          this.allData = res;
          //数据备份，用作筛选备份
          this.bakData = res;
          
          this.getRoles();
          this.getStatus();

          this.columns = [];
          Object.keys(res[0]).forEach((key, i , v)=>{
            // if( key==='userId' || key==='status' ) {

            // } else {
            //   this.columns.push({prop: key, label: this.$t("message."+key)})
            // }
            if(key!=='userId' && key!=='status' && key!=='useStatus')
              this.columns.push({prop: key, label: this.$t("message."+key)})
            // if(key!=='userId'){
            //   this.columns.push({prop: key, label: label})
            // }
          });
          this.pagination.total = res.length;
          this.userData = this.handlePagination()
        }).catch(err => {
          this.loading = false;
          this.$message({
            type: 'error',
            message: err,
          })
        });
      },
      changeRoles(val) {
        this.select.status = '';
        this.input.user = '';
        this.allData = _.filter(this.bakData, o=>{
          return val === o.role;
        });
        this.pagination.total = this.allData.length;
        this.handleCurrentChange(1)
      },
      changeStatus(val) {
        this.select.role = '';
        this.input.user = '';
        this.allData = _.filter(this.bakData, o=>{
          return val === o.status;
        });
        this.pagination.total = this.allData.length;
        this.handleCurrentChange(1)
      },
      inputUser() {
        this.select.role = '';
        this.select.status = '';
        //用户输入字段
        let inputData = this.input.user,
          reg = RegExp(inputData);
        this.allData = _.filter(this.bakData, o=>{
          return reg.test(o.name);
        });
        this.pagination.total = this.allData.length;
        this.handleCurrentChange(1)
        // this.handleCurrentChange(this.pagination.currentPage)
      },
      refresh() {
        this.input.user = '';
        this.select.role = '';
        this.select.status = '';
        this.select.roles = [];
        this.select.statusArr = [];
        this.init();
      },
      execDeleteUsers(usersId) {
        deleteUsers(usersId).then((res)=>{
          if( !res.status ) {
            this.$message({
              type: 'error',
              message: '删除失败！(重复提交或者网络原因)'
            });
          }
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.refresh();
        });
      },
      deleteUser() {
        let chooses = this.multipleSelection,
            usersId = [];
        if ( !chooses.length ) {
          this.$message({
            showClose: true,
            message: '选择项为空，请选择要删除的项',
            type: 'warning'
          });
          return;
        }
        _.forEach(chooses, v=>usersId.push(v.email));
        this.$confirm('确定删除该用户信息？(删除后将无法恢复)', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(
          ()=>{
            this.execDeleteUsers(usersId)
          }
        )
        .catch(action => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let CryptoJS = require("crypto-js");
            //浅拷贝
            // let form = this.userForm;
            let form = [];
            //一个功能不全的深拷贝
            _.forEach(this.userForm, (v, k)=>{
              form[k] = v;
            });

            let pwd = JSON.stringify({password:form.password}),
                k = CryptoJS.enc.Latin1.parse(env.KEY),
                iv = CryptoJS.enc.Latin1.parse(env.IV),
                encrypted = CryptoJS.AES.encrypt(pwd, k, {
                  iv: iv,
                  mode:CryptoJS.mode.CBC,
                  padding:CryptoJS.pad.ZeroPadding
                }).toString();
            form.password = encrypted//CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Base64);
            // console.log(form)
            addUser(form).then((res)=>{
              if( res.status !== 'true' ) {
                this.$message({
                  type: 'error',
                  message: res.status
                });
                return;
              }
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.dialogVisible = false;
              this.init();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleResetPwd(row) {
        resetPwd(row.email).then(res=>{
          if( res.status === 'true' ) {
            this.$message({
              type: 'success',
              message: '密码已重置!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '密码重置失败!'
            });
          }
        });
      },
      handleDelete(row) {
        this.$confirm('确定删除该用户信息？(删除后将无法恢复)', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(
          ()=>{
            this.execDeleteUsers([row.email])
          }
        )
        .catch(action => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
      },
      handleUseStatus(row) {
        switchUseStatus(row.email, row.useStatus).then(res=>{
          if( res.status === 'true' ) {
            row.useStatus = (row.useStatus==='on'?'off':'on');
          } else {
            this.$message({
              type: 'error',
              message: '切换失败!'
            });
          }
        })
      },
      importUsers() {
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        // console.log(file);
        this.fileList = fileList.slice(-3);
      },
      beforeUpload(file) {
        // console.log(file.name);
        let format = file.name.split('.')[1];
        // let test = _.split(file.name, '-', 2 );
        if( format !== 'xlsx' ) {
          this.$message({
            type: 'error',
            message: '请选择xlsx格式上传!'
          })
          return false;
        }
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        if(response.status) {
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          this.init();
        }else {
          this.$message({
            type: 'error',
            message: response.status
          })
        }
      }
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handlePreview(file) {
      //   console.log(file);
      // }

      // filterTag(value, row) {
      //   console.log(value)
      //   return row.status === value;
      // },
    },
    created() {
      //初始化
      this.init();
    },
    computed: {
      // this.$store.getters.getUserData
      // getData() {
      //   if(this.$store.getters.getUserDataStatus === 2) {
      //     console.log(this.$store.getters.getUserData)
      //   }
      // },
      // inputUser() {
        //用户输入字段
        /*let inputData = this.input.user,
          reg = RegExp(inputData);
        this.allData = _.filter(this.bakData, o=>{
          return reg.test(o.name);
        });
        this.pagination.total = this.allData.length;
        this.handleCurrentChange(this.pagination.currentPage)*/
      // }
      /*,
      selectRole() {
        // this.select.role
        //用户选择用户类型
        let inputData = this.select.role,
          reg = RegExp(inputData);
        this.allData = _.filter(this.bakData, o=>{
          return reg.test(o.role);
        });
        console.log(this.allData)
        // this.pagination.total = this.allData.length;
        // this.handleCurrentChange(this.pagination.currentPage)
      }*/

    }
  }
</script>

<style>
  .userRightsManagement {
    margin: 10px 15px 0px 15px;
  }
  .userRightsManagement .font {
    font-weight: bold;
  }
  .userRightsManagement .marginBottom {
    margin-bottom: 0px;
  }
  .userRightsManagement .el-card__body {
    padding: 10px;
  }
  .userRightsManagement .el-row {
    margin-top: 15px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>