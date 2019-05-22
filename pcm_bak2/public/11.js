(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/systemSecurityManagement/UserRightsManagement */ "./resources/js/api/systemSecurityManagement/UserRightsManagement.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var validatePass = function validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6 && value.length > 16) {
        callback(new Error('密码长度在6到16个字符'));
      } else {
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
      allData: [],
      multipleSelection: [],
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      loading: false,
      input: {
        user: ''
      },
      select: {
        role: '',
        roles: [],
        status: '',
        statusArr: []
      },
      dialogVisible: false,
      userForm: {
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
        city: [{
          required: true,
          message: '请输入城市名称',
          trigger: 'blur'
        }],
        county: [{
          required: true,
          message: '请输入县区名称',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入用户名名称',
          trigger: 'blur'
        }, {
          min: 3,
          max: 15,
          message: '长度在 3 到 15 个字符',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度在6到16个字符'
        }],
        // password: [{ validator: validatePass, trigger: 'blur' }],
        userClassification: [{
          required: true,
          message: '请输入用户分类名称',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户姓名',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: '请输入角色',
          trigger: 'blur'
        }],
        // passwordValidDays: { validator: checkValidDays, trigger: 'blur' }
        passwordValidDays: [{
          required: true,
          message: '有效天数不能为空',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '天数必须为数字值',
          trigger: ['blur', 'change']
        }]
      },
      // fileList: []
      uploadFiles: {
        showFileList: false,
        accept: '.xlsx'
      }
    };
  },
  methods: {
    handleSelectionChange: function handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange: function handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.userData = this.handlePagination();
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.userData = this.handlePagination();
    },
    //分页
    handlePagination: function handlePagination() {
      return Array.prototype.slice.call(this.allData, (this.pagination.currentPage - 1) * this.pagination.pageSize, this.pagination.pageSize * this.pagination.currentPage);
    },
    //获取用户类型
    getRoles: function getRoles() {
      this.attayFilter('role', 'roles');
    },
    //获取状态类型
    getStatus: function getStatus() {
      this.attayFilter('status', 'statusArr');
    },
    //数组筛选
    attayFilter: function attayFilter(name, arrs) {
      var _this = this;

      var arr = [];

      _.forEach(this.allData, function (v) {
        arr.push(v[name]);
      });

      var array = Array.from(new Set(arr));

      _.forEach(array, function (v) {
        _this.select[arrs].push({
          'label': v,
          'value': v
        });
      });
    },
    //初始化
    init: function init() {
      var _this2 = this;

      //麻烦的写法。可能抛弃
      // this.$store.dispatch('GetUsers');
      this.loading = true;
      Object(_api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__["getUsers"])().then(function (res) {
        _this2.loading = false;
        _this2.allData = res; //数据备份，用作筛选备份

        _this2.bakData = res;

        _this2.getRoles();

        _this2.getStatus();

        _this2.columns = [];
        Object.keys(res[0]).forEach(function (key, i, v) {
          // if( key==='userId' || key==='status' ) {
          // } else {
          //   this.columns.push({prop: key, label: this.$t("message."+key)})
          // }
          if (key !== 'userId' && key !== 'status' && key !== 'useStatus') _this2.columns.push({
            prop: key,
            label: _this2.$t("message." + key)
          }); // if(key!=='userId'){
          //   this.columns.push({prop: key, label: label})
          // }
        });
        _this2.pagination.total = res.length;
        _this2.userData = _this2.handlePagination();
      })["catch"](function (err) {
        _this2.loading = false;

        _this2.$message({
          type: 'error',
          message: err
        });
      });
    },
    changeRoles: function changeRoles(val) {
      this.select.status = '';
      this.input.user = '';
      this.allData = _.filter(this.bakData, function (o) {
        return val === o.role;
      });
      this.pagination.total = this.allData.length;
      this.handleCurrentChange(1);
    },
    changeStatus: function changeStatus(val) {
      this.select.role = '';
      this.input.user = '';
      this.allData = _.filter(this.bakData, function (o) {
        return val === o.status;
      });
      this.pagination.total = this.allData.length;
      this.handleCurrentChange(1);
    },
    inputUser: function inputUser() {
      this.select.role = '';
      this.select.status = ''; //用户输入字段

      var inputData = this.input.user,
          reg = RegExp(inputData);
      this.allData = _.filter(this.bakData, function (o) {
        return reg.test(o.name);
      });
      this.pagination.total = this.allData.length;
      this.handleCurrentChange(1); // this.handleCurrentChange(this.pagination.currentPage)
    },
    refresh: function refresh() {
      this.input.user = '';
      this.select.role = '';
      this.select.status = '';
      this.select.roles = [];
      this.select.statusArr = [];
      this.init();
    },
    execDeleteUsers: function execDeleteUsers(usersId) {
      var _this3 = this;

      Object(_api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__["deleteUsers"])(usersId).then(function (res) {
        if (!res.status) {
          _this3.$message({
            type: 'error',
            message: '删除失败！(重复提交或者网络原因)'
          });
        }

        _this3.$message({
          type: 'success',
          message: '删除成功！'
        });

        _this3.refresh();
      });
    },
    deleteUser: function deleteUser() {
      var _this4 = this;

      var chooses = this.multipleSelection,
          usersId = [];

      if (!chooses.length) {
        this.$message({
          showClose: true,
          message: '选择项为空，请选择要删除的项',
          type: 'warning'
        });
        return;
      }

      _.forEach(chooses, function (v) {
        return usersId.push(v.email);
      });

      this.$confirm('确定删除该用户信息？(删除后将无法恢复)', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(function () {
        _this4.execDeleteUsers(usersId);
      })["catch"](function (action) {
        _this4.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitForm: function submitForm(formName) {
      var _this5 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          var CryptoJS = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js"); //浅拷贝
          // let form = this.userForm;


          var form = []; //一个功能不全的深拷贝

          _.forEach(_this5.userForm, function (v, k) {
            form[k] = v;
          });

          var pwd = JSON.stringify({
            password: form.password
          }),
              k = CryptoJS.enc.Latin1.parse(env.KEY),
              iv = CryptoJS.enc.Latin1.parse(env.IV),
              encrypted = CryptoJS.AES.encrypt(pwd, k, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
          }).toString();
          form.password = encrypted; //CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Base64);
          // console.log(form)

          Object(_api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__["addUser"])(form).then(function (res) {
            if (res.status !== 'true') {
              _this5.$message({
                type: 'error',
                message: res.status
              });

              return;
            }

            _this5.$message({
              type: 'success',
              message: '添加成功!'
            });

            _this5.dialogVisible = false;

            _this5.init();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleResetPwd: function handleResetPwd(row) {
      var _this6 = this;

      Object(_api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__["resetPwd"])(row.email).then(function (res) {
        if (res.status === 'true') {
          _this6.$message({
            type: 'success',
            message: '密码已重置!'
          });
        } else {
          _this6.$message({
            type: 'error',
            message: '密码重置失败!'
          });
        }
      });
    },
    handleDelete: function handleDelete(row) {
      var _this7 = this;

      this.$confirm('确定删除该用户信息？(删除后将无法恢复)', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(function () {
        _this7.execDeleteUsers([row.email]);
      })["catch"](function (action) {
        _this7.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleUseStatus: function handleUseStatus(row) {
      var _this8 = this;

      Object(_api_systemSecurityManagement_UserRightsManagement__WEBPACK_IMPORTED_MODULE_0__["switchUseStatus"])(row.email, row.useStatus).then(function (res) {
        if (res.status === 'true') {
          row.useStatus = row.useStatus === 'on' ? 'off' : 'on';
        } else {
          _this8.$message({
            type: 'error',
            message: '切换失败!'
          });
        }
      });
    },
    importUsers: function importUsers() {
      this.$refs.upload.submit();
    },
    handleChange: function handleChange(file, fileList) {
      // console.log(file);
      this.fileList = fileList.slice(-3);
    },
    beforeUpload: function beforeUpload(file) {
      // console.log(file.name);
      var format = file.name.split('.')[1]; // let test = _.split(file.name, '-', 2 );

      if (format !== 'xlsx') {
        this.$message({
          type: 'error',
          message: '请选择xlsx格式上传!'
        });
        return false;
      }
    },
    handleSuccess: function handleSuccess(response, file, fileList) {
      console.log(response);

      if (response.status) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
        this.init();
      } else {
        this.$message({
          type: 'error',
          message: response.status
        });
      }
    } // handleRemove(file, fileList) {
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
  created: function created() {
    //初始化
    this.init();
  },
  computed: {// this.$store.getters.getUserData
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
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.userRightsManagement {\n  margin: 10px 15px 0px 15px;\n}\n.userRightsManagement .font {\n  font-weight: bold;\n}\n.userRightsManagement .marginBottom {\n  margin-bottom: 0px;\n}\n.userRightsManagement .el-card__body {\n  padding: 10px;\n}\n.userRightsManagement .el-row {\n  margin-top: 15px;\n  margin-bottom: 20px;\n&:last-child {\n    margin-bottom: 0;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "userRightsManagement" },
    [
      _c(
        "el-row",
        [
          _c("div", { staticClass: "font marginBottom" }, [_vm._v("用户")]),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { spqn: 24 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c(
                    "el-row",
                    [
                      _c(
                        "el-col",
                        { attrs: { span: 3 } },
                        [
                          _c(
                            "el-input",
                            {
                              attrs: {
                                size: "small",
                                placeholder: "请输入用户名"
                              },
                              on: { change: _vm.inputUser },
                              model: {
                                value: _vm.input.user,
                                callback: function($$v) {
                                  _vm.$set(_vm.input, "user", $$v)
                                },
                                expression: "input.user"
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "el-input__icon el-icon-search",
                                attrs: { slot: "suffix" },
                                slot: "suffix"
                              })
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 4, offset: 1 } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                size: "small",
                                placeholder: "全部用户类型"
                              },
                              on: { change: _vm.changeRoles },
                              model: {
                                value: _vm.select.role,
                                callback: function($$v) {
                                  _vm.$set(_vm.select, "role", $$v)
                                },
                                expression: "select.role"
                              }
                            },
                            _vm._l(_vm.select.roles, function(item) {
                              return _c("el-option", {
                                key: item.value,
                                attrs: { label: item.label, value: item.value }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 4 } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                size: "small",
                                placeholder: "全部使用状态"
                              },
                              on: { change: _vm.changeStatus },
                              model: {
                                value: _vm.select.status,
                                callback: function($$v) {
                                  _vm.$set(_vm.select, "status", $$v)
                                },
                                expression: "select.status"
                              }
                            },
                            _vm._l(_vm.select.statusArr, function(item) {
                              return _c("el-option", {
                                key: item.value,
                                attrs: { label: item.label, value: item.value }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { staticStyle: { float: "right" }, attrs: { span: 5 } },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { size: "small" },
                              on: { click: _vm.refresh }
                            },
                            [_vm._v("刷新")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { size: "small", type: "info" },
                              on: { click: _vm.deleteUser }
                            },
                            [_vm._v("删除")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { size: "small", type: "primary" },
                              on: {
                                click: function($event) {
                                  _vm.dialogVisible = true
                                }
                              }
                            },
                            [_vm._v("创建")]
                          ),
                          _vm._v(" "),
                          _c(
                            "el-dropdown",
                            { staticStyle: { "margin-left": "10px" } },
                            [
                              _c(
                                "el-button",
                                { attrs: { size: "small", type: "primary" } },
                                [
                                  _vm._v(
                                    "\n                ...\n              "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-dropdown-menu",
                                {
                                  attrs: { slot: "dropdown" },
                                  slot: "dropdown"
                                },
                                [
                                  _c(
                                    "el-upload",
                                    {
                                      staticClass: "upload-demo",
                                      attrs: {
                                        action: "/uploadUser",
                                        "show-file-list":
                                          _vm.uploadFiles.showFileList,
                                        accept: _vm.uploadFiles.accept,
                                        "before-upload": _vm.beforeUpload,
                                        "on-change": _vm.handleChange,
                                        "on-success": _vm.handleSuccess
                                      }
                                    },
                                    [
                                      _c(
                                        "el-dropdown-item",
                                        {
                                          attrs: {
                                            size: "small",
                                            type: "primary"
                                          }
                                        },
                                        [_vm._v("批量导入用户")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("el-dropdown-item", [
                                    _vm._v("批量修改用户")
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 24 } },
                        [
                          _c(
                            "el-table",
                            {
                              directives: [
                                {
                                  name: "loading",
                                  rawName: "v-loading",
                                  value: _vm.loading,
                                  expression: "loading"
                                }
                              ],
                              ref: "multipleTable",
                              staticStyle: { width: "100%" },
                              attrs: {
                                "element-loading-text": "拼命加载中",
                                "element-loading-spinner": "el-icon-loading",
                                "element-loading-background":
                                  "rgba(0, 0, 0, 0.8)",
                                stripe: true,
                                size: "mini",
                                data: _vm.userData,
                                "tooltip-effect": "dark"
                              },
                              on: {
                                "selection-change": _vm.handleSelectionChange
                              }
                            },
                            [
                              _c("el-table-column", {
                                attrs: { type: "selection", width: "55" }
                              }),
                              _vm._v(" "),
                              _vm._l(_vm.columns, function(column, index) {
                                return _c("el-table-column", {
                                  key: index,
                                  attrs: {
                                    prop: column.prop,
                                    label: column.label
                                  }
                                })
                              }),
                              _vm._v(" "),
                              _c("el-table-column", {
                                attrs: {
                                  prop: "status",
                                  label: "账号状态",
                                  width: "100"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(scope) {
                                      return [
                                        _c(
                                          "el-tag",
                                          {
                                            attrs: {
                                              type:
                                                scope.row.status === "off"
                                                  ? "primary"
                                                  : "success",
                                              "disable-transitions": ""
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(scope.row.status) +
                                                "\n                  "
                                            )
                                          ]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              }),
                              _vm._v(" "),
                              _c("el-table-column", {
                                attrs: {
                                  prop: "useStatus",
                                  label: "账号使用状态",
                                  width: "100"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(scope) {
                                      return [
                                        _c(
                                          "el-tag",
                                          {
                                            attrs: {
                                              type:
                                                scope.row.useStatus === "off"
                                                  ? "primary"
                                                  : "success",
                                              "disable-transitions": ""
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(scope.row.useStatus) +
                                                "\n                  "
                                            )
                                          ]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              }),
                              _vm._v(" "),
                              _c("el-table-column", {
                                attrs: {
                                  fixed: "right",
                                  label: "操作",
                                  width: "150"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "default",
                                    fn: function(scope) {
                                      return [
                                        _c(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "text",
                                              size: "small"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.handleResetPwd(
                                                  scope.row
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("重置密码")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "text",
                                              size: "small"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.handleDelete(
                                                  scope.row
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("删除")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  scope.row.useStatus === "on",
                                                expression:
                                                  "scope.row.useStatus==='on'"
                                              }
                                            ],
                                            attrs: {
                                              type: "text",
                                              size: "small"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.handleUseStatus(
                                                  scope.row
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("停用")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "el-button",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  scope.row.useStatus === "off",
                                                expression:
                                                  "scope.row.useStatus==='off'"
                                              }
                                            ],
                                            attrs: {
                                              type: "text",
                                              size: "small"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.handleUseStatus(
                                                  scope.row
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("启用")]
                                        )
                                      ]
                                    }
                                  }
                                ])
                              })
                            ],
                            2
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 24 } },
                        [
                          _c("el-pagination", {
                            staticStyle: { float: "right" },
                            attrs: {
                              "current-page": _vm.pagination.currentPage,
                              "page-sizes": [5, 10, 15, 20],
                              "page-size": _vm.pagination.pageSize,
                              layout: "sizes, prev, pager, next",
                              total: _vm.pagination.total
                            },
                            on: {
                              "size-change": _vm.handleSizeChange,
                              "current-change": _vm.handleCurrentChange,
                              "update:currentPage": function($event) {
                                return _vm.$set(
                                  _vm.pagination,
                                  "currentPage",
                                  $event
                                )
                              },
                              "update:current-page": function($event) {
                                return _vm.$set(
                                  _vm.pagination,
                                  "currentPage",
                                  $event
                                )
                              }
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "用户创建",
            visible: _vm.dialogVisible,
            width: "50%"
          },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              ref: "userForm",
              staticClass: "userForm",
              attrs: {
                model: _vm.userForm,
                rules: _vm.rules,
                "label-width": "100px"
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "城市", prop: "city" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.city,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "city", $$v)
                      },
                      expression: "userForm.city"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "区县", prop: "county" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.county,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "county", $$v)
                      },
                      expression: "userForm.county"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "账号名", prop: "name" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.name,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "name", $$v)
                      },
                      expression: "userForm.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "邮箱", prop: "email" } },
                [
                  _c("el-input", {
                    attrs: { autocomplete: "off" },
                    model: {
                      value: _vm.userForm.email,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "email", $$v)
                      },
                      expression: "userForm.email"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "密码", prop: "password" } },
                [
                  _c("el-input", {
                    attrs: { type: "password", autocomplete: "off" },
                    model: {
                      value: _vm.userForm.password,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "password", $$v)
                      },
                      expression: "userForm.password"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "所属单位", prop: "unit" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.unit,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "unit", $$v)
                      },
                      expression: "userForm.unit"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "部门", prop: "department" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.department,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "department", $$v)
                      },
                      expression: "userForm.department"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "用户分类", prop: "userClassification" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.userClassification,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "userClassification", $$v)
                      },
                      expression: "userForm.userClassification"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "用户姓名", prop: "username" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.username,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "username", $$v)
                      },
                      expression: "userForm.username"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "身份证号", prop: "idCard" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.idCard,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "idCard", $$v)
                      },
                      expression: "userForm.idCard"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "联系电话", prop: "contactPhone" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.contactPhone,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "contactPhone", $$v)
                      },
                      expression: "userForm.contactPhone"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "角色", prop: "role" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.role,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "role", $$v)
                      },
                      expression: "userForm.role"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "密码有效天数", prop: "passwordValidDays" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.userForm.passwordValidDays,
                      callback: function($$v) {
                        _vm.$set(_vm.userForm, "passwordValidDays", _vm._n($$v))
                      },
                      expression: "userForm.passwordValidDays"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("userForm")
                        }
                      }
                    },
                    [_vm._v("立即创建")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          return _vm.resetForm("userForm")
                        }
                      }
                    },
                    [_vm._v("重置")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.dialogVisible = false
                        }
                      }
                    },
                    [_vm._v("关闭")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userRightsManagementComponent.vue?vue&type=template&id=e58749ac& */ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac&");
/* harmony import */ var _userRightsManagementComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userRightsManagementComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _userRightsManagementComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************!*\
  !*** ./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./userRightsManagementComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************!*\
  !*** ./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./userRightsManagementComponent.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac&":
/*!********************************************************************************************************************************!*\
  !*** ./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./userRightsManagementComponent.vue?vue&type=template&id=e58749ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/view/systemSecurityManagement/userRightsManagementComponent.vue?vue&type=template&id=e58749ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_userRightsManagementComponent_vue_vue_type_template_id_e58749ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);