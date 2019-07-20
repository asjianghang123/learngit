$(function () {
	setTree();
	$("#NBIQueryMoTree").treeview("collapseAll", {silent: true});
	initElementTree();

	setFormulaTreeTable();

	initValidata_mode();
	initValidata_mode_copy();
	initValidata_formula();
});

function setTree() {
	var tree = "#NBIQueryMoTree";
	$(tree).treeview({
		data: getTree(),
		onNodeSelected: function (event, data) {
			if (data.parentId || data.parentId == 0) {
				var user = $(tree).treeview("getNode", data.parentId).text;
				setElementTree(data.id);
			} else {
				$("#NBIElementTree").empty();
			}

		}
	}); //树
}

function getTree() {
	var url = "NBITemplateManage/getNBITreeData";
	var treeData;
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		async: false,
		success: function (data) {
			treeData = data;
		}
	});
	return treeData;
}

//清空模板树
function clearNBIQuery() {
	$("#paramQueryMoErbs").val("");
	setTree();
	$("#NBIQueryMoTree").treeview("collapseAll", {silent: true});
}

//筛选模板树
function searchNBIQuery() {
	var inputData = $("#paramQueryMoErbs").val();
	inputData = $.trim(inputData);
	if (inputData == "") {
		setTree();
		return;
	}
	var params = {
		inputData: inputData
	};
	var url = "NBITemplateManage/searchNBITreeData";
	//var treeData;

	$.get(url, params, function (data) {
		//data = "["+data+"]";
		var tree = "#NBIQueryMoTree";
		$(tree).treeview({
			data: data,
			onNodeSelected: function (event, data) {
				if (data.parentId || data.parentId == 0) {
					var user = $(tree).treeview("getNode", data.parentId).text;
					setElementTree(data.id);
				} else {
					$("#NBIElementTree").empty();
				}
				//var user = data.user;
				//setElementTree(data.text,user);

			}
		});
		$("#NBIQueryMoTree").treeview("collapseAll", {silent: true});
	});
}
function initElementTree() {
	var tree = "#NBIElementTree";
	$(tree).treeview({
		data: null
	}); //树
}
function setElementTree(id) {
	var tree = "#NBIElementTree";
	$(tree).treeview({
		data: getElementTree(id),
		onNodeSelected: function (event, data) {
			findTemplateById(data.id);
		}
	}); //树
}
function getElementTree(id) {
	var url = "NBITemplateManage/getElementTree";
	var treeData;
	$.ajax({
		type: "GET",
		url: url,
		data: {
			templateId: id
		},
		dataType: "json",
		async: false,
		success: function (data) {
			$("#elementIds").val(data.elementId);
			treeData = getKpiNamebyId(data.elementId);
		}
	});
	return treeData;
}
function getKpiNamebyId(id) {
	var url = "NBITemplateManage/getKpiNamebyId";
	var treeData;
	$.ajax({
		type: "GET",
		url: url,
		data: {
			id: id
		},
		dataType: "json",
		async: false,
		success: function (data) {
			treeData = data;
			var ids = [];
			for(var i in data){
				ids.push(data[i].id);
			}
			$("#elementIds").val(ids.join(","));
		}
	});
	return treeData;
}

function setFormulaTreeTable() {


	var table = "#NBIFormulaTable";
	$(table).treegrid({
		url: "NBITemplateManage/getTreeTemplate",
		idField: "id",
		treeField: "kpiName",
		columns: [[
			{title: "Name", field: "kpiName", width: 150},
			{field: "kpiFormula", title: "Formula", width: 350},
			{field: "kpiPrecision", title: "Precision", width: 100}
		]],
		onDblClickRow: function (data) {
			if (!data.children) {
				editFormula(data);
			}
		}
	}); //树
}

function addFormula() {
	$("#add_edit_formula").modal();

	$("#add_edit_formula input").val("");
	$("#add_edit_formula textarea").val("");

	$("#formulaForm").data("bootstrapValidator").destroy();
	initValidata_formula();
}

function editFormula(data) {
	$("#add_edit_formula").modal();

	$("#formulaId").val(data.id);
	//$("#formulaUser").val(data.user);
	$("#name").val(data.kpiName);
	$("#precision").val(data.kpiPrecision);
	$("#formula").val(data.kpiFormula);

	$("#formulaForm").data("bootstrapValidator").destroy();
	initValidata_formula();
}

function updateFormula() {
	$("#formulaForm").data("bootstrapValidator").validate();
	var format_kpi = $("#NBIFormat_kpi").val();
	var flag = $("#formulaForm").data("bootstrapValidator").isValid();
	if (!flag) {
		return;
	}
	var param = $("#formulaForm").serialize().replace(/\+/g," ");
	var params = param.split("&");
	//var params = $("#formulaForm").serialize().split("&");
	var data = {};
	for (var i = 0; i < params.length; i++) {
		data[params[i].split("=")[0]] = decodeURIComponent(params[i].split("=")[1], true);
	}
	data["format_kpi"] = format_kpi;
	$.get("NBITemplateManage/updateFormula", data, function (res) {

		if (res) {
			//alert("success！");
			layer.open({
				title: "提示",
				content: "修改成功"
			});
			setFormulaTreeTable();
		} else {
			//alert("没有权限修改该公式!");
			layer.open({
				title: "提示",
				content: "没有权限修改该公式"
			});
		}
		$("#add_edit_formula").modal("hide");

	});
}

function deleteFormula() {
	var selectedNode = $("#NBIFormulaTable").treegrid("getSelected");
	if (!selectedNode || selectedNode.children) {
		//alert("请选择要删除的Formula");
		layer.open({
			title: "提示",
			content: "请选择要删除的Formula"
		});
		return;
	}
	layer.confirm("确认删除吗？", {title: "提示"}, function (index) {
		$.get("NBITemplateManage/deleteFormula", {"id": selectedNode.id}, function (res) {
			if (res) {
				layer.open({
					title: "提示",
					content: "删除成功"
				});
				setFormulaTreeTable();
			} else {
				layer.open({
					title: "提示",
					content: "没有权限删除该公式"
				});
			}
			$("#add_edit_formula").modal("hide");
		});
		layer.close(index);
	});
	/*var flag = confirm("确认删除吗？");
	 if(!flag){
	 return;
	 }
	 $.get("NBITemplateManage/deleteFormula",{"id":selectedNode.id},function(res){
	 if(res){
	 alert("删除成功！");
	 setFormulaTreeTable();
	 }else{
	 alert("没有权限删除该公式!");
	 }
	 $("#add_edit_formula").modal("hide");
	 });*/
}

function clearFormula() {
	$("#formulaQuery").val("");
	setFormulaTreeTable();
}
function searchFormula() {
	var inputData = $("#formulaQuery").val();
	inputData = $.trim(inputData);
	if (inputData == "") {
		setFormulaTreeTable();
		return;
	}
	var url = "NBITemplateManage/searchTreeTemplate";
	$.ajax({
		url: url,
		type: "get",
		data: {"formula": inputData},
		dataType: "json",
		success: function (data) {
			var table = "#NBIFormulaTable";
			$(table).treegrid("loadData", data);
		}
	});


}
function findTemplateById(id) {
	var data = $("#NBIFormulaTable").treegrid("find", id);
	if (!data) {
		return;
	}
	$("#NBIFormulaTable").treegrid("expandAll");
	$("#NBIFormulaTable").treegrid("select", id);

	var selectedNode = $(".datagrid-row-selected");
	var scroll = selectedNode.offset().top - $("#NBIFormulaTableDiv").offset().top + $("#NBIFormulaTableDiv").scrollTop();
	$("#NBIFormulaTableDiv").scrollTop(scroll);
}


function initValidata_formula() {
	$("#formulaForm").bootstrapValidator({
		message: "This value is not valid",
		feedbackIcons: {
			valid: "glyphicon glyphicon-ok",
			invalid: "glyphicon glyphicon-remove",
			validating: "glyphicon glyphicon-refresh"
		},
		fields: {
			name: {
				//message: "用户名验证失败",
				validators: {
					notEmpty: {
						message: "Name不能为空"
					}
				}
			},
			precision: {
				//message: "密码验证失败",
				validators: {
					notEmpty: {
						message: "Precision不能为空"
					}
				}
			},
			formula: {
				//message: "用户类型验证失败",
				validators: {
					notEmpty: {
						message: "Formula不能为空"
					}
				}
			}
		}
	});
}

function elementUp() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0]) {
		//alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	if (!$("#NBIElementTree").treeview("getSelected")[0]) {
		//alert("尚未选择需要上移的指标");
		layer.open({
			title: "提示",
			content: "尚未选择需要上移的指标"
		});
		return;
	}
	elementUpdate("up");
}
function elementDown() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0]) {
		alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	if (!$("#NBIElementTree").treeview("getSelected")[0]) {
		//alert("尚未选择需要下移的指标");
		layer.open({
			title: "提示",
			content: "尚未选择需要下移的指标"
		});
		return;
	}
	elementUpdate("down");
}
function elementDelete() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0]) {
		alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	if (!$("#NBIElementTree").treeview("getSelected")[0]) {
		//alert("尚未选择要删除的指标");
		layer.open({
			title: "提示",
			content: "尚未选择要删除的指标"
		});
		return;
	}
	elementUpdate("delete");
}
function elementAdd() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0] || $("#NBIQueryMoTree").treeview("getSelected")[0].parentId == undefined) {
		alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	if (!$("#NBIFormulaTable").treegrid("getSelected") || $("#NBIFormulaTable").treegrid("getSelected")._parentId == undefined) {
		//alert("尚未选择要添加的公式");
		layer.open({
			title: "提示",
			content: "尚未选择要添加的公式"
		});
		return;
	}

	elementUpdate("add");
}
function elementUpdate(type) {
	var ids = $("#elementIds").val() == "" ? [] : $("#elementIds").val().split(",");
	var selectedNodeId = $("#NBIQueryMoTree").treeview("getSelected")[0].id;
	var selectedNodeIndex;
	var temp;
	if (type == "up") {
		selectedNodeIndex = $("#NBIElementTree").treeview("getSelected")[0].nodeId;
		temp = ids[selectedNodeIndex - 1];
		if (!temp) {
			//alert("已是第一个，无法上移");
			layer.open({
				title: "提示",
				content: "已是第一个，无法上移"
			});
			return;
		}
		ids[selectedNodeIndex - 1] = ids[selectedNodeIndex];
		ids[selectedNodeIndex] = temp;
		selectedNodeIndex = selectedNodeIndex - 1;
	} else if (type == "down") {
		selectedNodeIndex = $("#NBIElementTree").treeview("getSelected")[0].nodeId;
		var len = ids.length;
		temp = ids[selectedNodeIndex + 1];
		if (selectedNodeIndex + 1 == len) {
			//alert("已是最后一个，无法下移");
			layer.open({
				title: "提示",
				content: "已是最后一个，无法下移"
			});
			return;
		}
		ids[selectedNodeIndex + 1] = ids[selectedNodeIndex];
		ids[selectedNodeIndex] = temp;
		selectedNodeIndex = selectedNodeIndex + 1;
	} else if (type == "delete") {
		/*var flag = confirm("确认删除吗？");
		 if(!flag){
		 return;
		 }
		 selectedNodeIndex = $("#NBIElementTree").treeview("getSelected")[0].nodeId;
		 ids.splice(selectedNodeIndex,1);*/
		layer.confirm("确认删除吗？", {title: "提示"}, function (index) {
			selectedNodeIndex = $("#NBIElementTree").treeview("getSelected")[0].nodeId;
			ids.splice(selectedNodeIndex, 1);

			ids = ids.join(",");
			$.get("NBITemplateManage/updateElement", {"ids": ids, "id": selectedNodeId}, function (res) {
				if (res) {
					var tree = "#NBIElementTree";
					$(tree).treeview({
						data: getKpiNamebyId(ids),
						onNodeSelected: function (event, data) {
							findTemplateById(data.id);
						}
					}); //树
					//$("#elementIds").val(ids);
				} else {
					//alert("没有权限对该指标进行操作！");
					layer.open({
						title: "提示",
						content: "没有权限对该指标进行操作"
					});
				}
			});
			layer.close(index);
		});
		return;
	} else if (type == "add") {
		var nodeId = $("#NBIFormulaTable").treegrid("getSelected").id;

		if (ids.indexOf(nodeId) == -1) {
			ids.push(nodeId);
		} else {
			//alert("已存在该公式");
			layer.open({
				title: "提示",
				content: "已存在该公式"
			});
			return;
		}
	}

	ids = ids.join(",");
	$.get("NBITemplateManage/updateElement", {"ids": ids, "id": selectedNodeId}, function (res) {
		if (res) {
			var tree = "#NBIElementTree";
			$(tree).empty();
			$(tree).treeview({
				data: getKpiNamebyId(ids),
				onNodeSelected: function (event, data) {
					findTemplateById(data.id);
				}
			}); //树
			$("#elementIds").val(ids);
			$(tree).treeview("selectNode",selectedNodeIndex);
		} else {
			//alert("没有权限对该指标进行操作！");
			layer.open({
				title: "提示",
				content: "没有权限对该指标进行操作"
			});
		}
	});
}

function addMode() {
	$("#add_mode").modal();

	$("#add_mode input").val("");
	$("#add_mode textarea").val("");

	$("#modeForm").data("bootstrapValidator").destroy();
	initValidata_mode();
}
function updateMode() {
	var format = $("#NBIFormat").val();
	$("#modeForm").data("bootstrapValidator").validate();
	var flag = $("#modeForm").data("bootstrapValidator").isValid();
	if (!flag) {
		return;
	}
	var param = $("#modeForm").serialize().replace(/\+/g," ");
	var params = param.split("&");
	// var params = $("#modeForm").serialize().split("&");
	var data = {};
	for (var i = 0; i < params.length; i++) {
		data[params[i].split("=")[0]] = decodeURIComponent(params[i].split("=")[1], true);
	}
	data["format"] = format;
	$.get("NBITemplateManage/addMode", data, function (res) {

		if (res == "login") {
			//alert("尚未登录，不能添加模板");
			layer.open({
				title: "提示",
				content: "尚未登录，不能添加模板"
			});
			window.location.href = "login";
			return;
		}
		if (res == "名称已有") {
			//alert("已存在该模板，请重新输入");
			layer.open({
				title: "提示",
				content: "已存在该模板，请重新输入"
			});
			return;
		}
		if (res) {
			//alert("添加成功！");
			layer.open({
				title: "提示",
				content: "添加成功"
			});
			setTree();
		} else {
			//alert("添加失败!");
			layer.open({
				title: "提示",
				content: "添加失败"
			});
		}
		$("#add_mode").modal("hide");

	});
}
function deleteMode() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0] || !$("#NBIQueryMoTree").treeview("getSelected")[0].id) {
		//alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	layer.confirm("确认删除吗？", {title: "提示"}, function (index) {
		var id = $("#NBIQueryMoTree").treeview("getSelected")[0].id;
		$.get("NBITemplateManage/deleteMode", {"id": id}, function (res) {
			if (res == "login") {
				layer.open({
					title: "提示",
					content: "尚未登录，不能删除模板"
				});
				window.location.href = "login";
				return;
			}
			if (res == "1") {
				layer.open({
					title: "提示",
					content: "删除成功"
				});
				setTree();
			} else if (res == "2") {
				layer.open({
					title: "提示",
					content: "删除失败"
				});
			} else if (res == "3") {
				layer.open({
					title: "提示",
					content: "没有权限删除该模板"
				});
			}
		});
		layer.close(index);
	});
	/*var flag = confirm("确认删除该模板吗？");
	 if(!flag){
	 return;
	 }
	 var id = $("#NBIQueryMoTree").treeview("getSelected")[0].id;
	 $.get("NBITemplateManage/deleteMode",{"id":id},function(res){
	 if(res == "login"){
	 alert("尚未登录，不能删除模板");
	 window.location.href = "login";
	 return;
	 }
	 if(res == "1"){
	 alert("删除成功！");
	 setTree();
	 }else if(res == "2"){
	 alert("删除失败！");
	 }else if(res == "3"){
	 alert("没有权限删除该模板！");
	 }
	 });*/
}

function initValidata_mode() {
	$("#modeForm").bootstrapValidator({
		message: "This value is not valid",
		feedbackIcons: {
			valid: "glyphicon glyphicon-ok",
			invalid: "glyphicon glyphicon-remove",
			validating: "glyphicon glyphicon-refresh"
		},
		fields: {
			modeName: {
				//message: "用户名验证失败",
				validators: {
					notEmpty: {
						message: "模板名称不能为空"
					}
				}
			}
		}
	});
}
function copyMode() {
	if (!$("#NBIQueryMoTree").treeview("getSelected")[0] || !$("#NBIQueryMoTree").treeview("getSelected")[0].id) {
		//alert("尚未选择模板");
		layer.open({
			title: "提示",
			content: "尚未选择模板"
		});
		return;
	}
	$("#copy_mode").modal();

	$("#copy_mode input").val("");
	$("#copy_mode textarea").val("");

	$("#modeForm_copy").data("bootstrapValidator").destroy();
	initValidata_mode_copy();

	var id = $("#NBIQueryMoTree").treeview("getSelected")[0].id;
	$("#copyId").val(id);
}
function updateModeCopy() {
	var format_copy = $("#NBIFormat_copy").val();
	$("#modeForm_copy").data("bootstrapValidator").validate();
	var flag = $("#modeForm_copy").data("bootstrapValidator").isValid();
	if (!flag) {
		return;
	}
	var param = $("#modeForm_copy").serialize().replace(/\+/g," ");
	var params = param.split("&");
	//var params = $("#modeForm_copy").serialize().split("&");
	var data = {};
	for (var i = 0; i < params.length; i++) {
		data[params[i].split("=")[0]] = decodeURIComponent(params[i].split("=")[1], true);
	}
	data["format_copy"]=format_copy;
	$.get("NBITemplateManage/copyMode", data, function (res) {

		if (res == "login") {
			//alert("尚未登录，不能添加模板");
			layer.open({
				title: "提示",
				content: "尚未登录，不能添加模板"
			});
			window.location.href = "login";
			return;
		}
		if (res == "名称已有") {
			//alert("已存在该模板，请重新输入");
			layer.open({
				title: "提示",
				content: "已存在该模板，请重新输入"
			});
			return;
		}
		if (res) {
			//alert("复制成功！");
			layer.open({
				title: "提示",
				content: "复制成功"
			});
			setTree();
		} else {
			//alert("复制失败!");
			layer.open({
				title: "提示",
				content: "复制失败"
			});
		}
		$("#copy_mode").modal("hide");

	});
}
function initValidata_mode_copy() {
	$("#modeForm_copy").bootstrapValidator({
		message: "This value is not valid",
		feedbackIcons: {
			valid: "glyphicon glyphicon-ok",
			invalid: "glyphicon glyphicon-remove",
			validating: "glyphicon glyphicon-refresh"
		},
		fields: {
			modeName_copy: {
				//message: "用户名验证失败",
				validators: {
					notEmpty: {
						message: "模板名称不能为空"
					}
				}
			}
		}
	});
}