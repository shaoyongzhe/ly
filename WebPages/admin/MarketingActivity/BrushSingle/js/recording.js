/**
 * Created by MrCheng on 2016/12/9.
 */
//获取数据写入tbody
var djcishu = 1,
	allcont = 0;
var arr1 = new Fndate();
var state = {
	state: "未处理", //状态
	membername: "", //会员名称
	membertype: "", //会员类型
	querybegindate: arr1.strold, //查询开始日期
	queryenddate: arr1.strnew, //查询截止日期
	province: "", //省
	city: "", //市
	county: "", //区
	brcount: "", //违规次数
	compare: "等于", //违规次数比较符号
	level: "", //违规级别
	lastindex: "0", //上次返回结果的最后一条数据索引
	pagecount: "50" //要查询的数据条数
};;

if(localStorage.state) {
	state = JSON.parse(localStorage.state);
} else {
	state = {
		state: "未处理", //状态
		membername: "", //会员名称
		membertype: "", //会员类型
		querybegindate: arr1.strold, //查询开始日期
		queryenddate: arr1.strnew, //查询截止日期
		province: "", //省
		city: "", //市
		county: "", //区
		brcount: "", //违规次数
		compare: "等于", //违规次数比较符号
		level: "", //违规级别
		lastindex: "0", //上次返回结果的最后一条数据索引
		pagecount: "50" //要查询的数据条数
	};
}
//渲染页面
function fnxuanran(data) {
	var odata = data.data;
	var otr = "",
		viplx = "",
		diqu = [];
	for(var k1 in odata) {
		otr += "<tr gu-id='" + odata[k1]["guid"] + "'>" +
			"<td class='cgl-td1'><input class='thechec' type='checkbox'></td>" +
			"<td class='cgl-td2'><span style='display: none'></span><p>" + odata[k1]["memberinfo"] + "</p></td>";
		if(odata[k1]["anticheatingobj_class"] == "tblretailer") {
			viplx = "门店"
		}
		otr += "<td class='cgl-td3'>" + viplx + "</td>";
		diqu = odata[k1]["locale"].split(",").reverse();
		var str = diqu.join("");
		otr += "<td class='cgl-td4'>" + str + "</td>" +
			"<td class='cgl-td41'>" + odata[k1]["issuetime"] + "</td>" +
			"<td class='cgl-td5'><span>" + odata[k1]["breakrulescount"] + "</span>次</td>" +
			"<td class='cgl-td6'>" + odata[k1]["breakruleslevel"] + "</td>" +
			"<td class='cgl-td7'>" + odata[k1]["breakrulescause"] + "</td>" +
			"<td class='cgl-td8'>" + odata[k1]["measures"] + "</td>" +
			"<td class='cgl-td9'><span>" + odata[k1]["starttime"] + "<br></span><span>" + odata[k1]["endtime"] + "</span></td>" +
			"<td class='cgl-td10'>" + odata[k1]["ordermoney"] + "</td>" +
			"<td class='cgl-td11'>" + odata[k1]["amount"] + "</td>" +
			"<td class='cgl-td12'>" + odata[k1]["dealtstate"] + "</td>" +
			"<td class='cgl-td13'></td>" +
			"</tr>";
	}
	$("#cgl-tbody").html(otr);
	if(data["shuadanjine"]) {
		$("#shua").text(data["shuadanjine"].toFixed(2));
	}
	if(data["shuadanjine"]) {
		$("#kou").text(data["koukuanjine"].toFixed(2));
	}
}

function fncreattab(data) {
	fnxuanran(data);
	//滚动
	$("#cgl-tablebox").scroll(function() {
		if($(this).scrollTop() > ($("#cgl-tablebox").find("table").height() - 500) && $("#cgl-tablebox").find("table").height() > 500) {
			$("#cgl-more").show();
		} else {
			$("#cgl-more").hide();
		}
	});
	allcont = data.allcount;
}
//加载更多
function fnmore() {
	$("#cgl-more").on("click", "span", function() {
		var cishu = Math.ceil(allcont / 50);
		state.lastindex = 50 * djcishu;
		djcishu++;
		if(djcishu > cishu) {
			$("#cgl-more").find("span").html("没有更多数据")
		} else {
			$(".cgl-jzz").html("加载中，请稍后···").show();
			$.ajax({
				type: "get",
				url: "/webapi/earlywarningmanage/anticheating/getlist",
				data: state,
				error: function() {
					$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
				},
				success: function(data) {
					$(".cgl-jzz").hide();
					//console.log(data)
					var odata = data.data;
					var otr = "",
						viplx = "";
					for(var k1 in odata) {
						otr += "<tr gu-id='" + odata[k1]["guid"] + "'>" +
							"<td class='cgl-td1'><input class='thechec' type='checkbox'></td>" +
							"<td class='cgl-td2'><span style='display: none'></span><p>" + odata[k1]["memberinfo"] + "</p></td>";
						if(odata[k1]["anticheatingobj_class"] == "tblretailer") {
							viplx = "门店";
						}
						otr += "<td class='cgl-td3'>" + viplx + "</td>" +
							"<td class='cgl-td4'>" + odata[k1]["locale"] + "</td>" +
							"<td class='cgl-td41'>" + odata[k1]["issuetime"] + "</td>" +
							"<td class='cgl-td5'><span>" + odata[k1]["breakrulescount"] + "</span>次</td>" +
							"<td class='cgl-td6'>" + odata[k1]["breakruleslevel"] + "</td>" +
							"<td class='cgl-td7'>" + odata[k1]["breakrulescause"] + "</td>" +
							"<td class='cgl-td8'>" + odata[k1]["measures"] + "</td>" +
							"<td class='cgl-td9'><span>" + odata[k1]["starttime"] + "<br></span><span>" + odata[k1]["endtime"] + "</span></td>" +
							"<td class='cgl-td10'>" + odata[k1]["ordermoney"] + "</td>" +
							"<td class='cgl-td11'>" + odata[k1]["amount"] + "</td>" +
							"<td class='cgl-td12'>" + odata[k1]["dealtstate"] + "</td>" +
							"<td class='cgl-td13'></td>" +
							"</tr>";
					}
					$("#cgl-tbody").append(otr);
					if(data["shuadanjine"]) {
						$("#shua").text(data["shuadanjine"].toFixed(2));
					}
					if(data["shuadanjine"]) {
						$("#kou").text(data["koukuanjine"].toFixed(2));
					}
				}
			});
		}
	});
}
//违规记录维度
function fndengji(data) {
	var odata = data[0];
	$("#cgl-weicl").html("<strong>未处理</strong>（<i>" + odata["weichuli"] + "</i>）条");
	$("#cgl-shensuz").html("<strong>申诉中</strong>（<i>" + odata["shensuzhong"] + "</i>）条");
	$("#cgl-qrwg").html("<strong>确认违规</strong>（<i>" + odata["querenweigui"] + "</i>）条");
	$("#cgl-chufaz").html("<strong>处罚中</strong>（<i>" + odata["chufazhong"] + "</i>）条");
	$("#cgl-yijies").html("<strong>已结束</strong>（<i>" + odata["yijieshu"] + "</i>）条");
	$("#cgl-jiechuwg").html("<strong>解除违规</strong>（<i>" + odata["jiechuweigui"] + "</i>）条");
	//$(".cgl-wgui>.cgl-con", ".ztai").html("<strong>未处理</strong>（<i>" + odata["weichuli"] + "</i>）条");
	fnjilu();
}
//查询条件改变事件
function fnshijian(state) {
	$("input:checked").prop("checked", false);
	$(".cgl-jzz").html("加载中，请稍后···").show();

	$.ajax({
		type: "get",
		url: "/webapi/earlywarningmanage/anticheating/getlist",
		data: state,
		error: function(data) {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			//console.log(data)
			$(".cgl-jzz").hide();
			if(data.allcount == 0) {
				$(".cgl-jzz").html("暂无数据").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				$("#cgl-tbody").html("");
				$("#shua").text(data["shuadanjine"].toFixed(2));
				$("#kou").text(data["koukuanjine"].toFixed(2));
				fndengji(data.statecount);
			} else {
				allcont = data.allcont;
				djcishu = 1;
				fndengji(data.statecount);
				fncreattab(data); //创建tbody
				$("#cgl-tablebox").animate({
					scrollTop: 0
				}, 0);
				$("#cgl-more").find("span").html("点击加载更多")
				$("#cgl-more").hide(function() {
					$("#cgl-more").css({
						"display": "none"
					});
				});
			}

		}
	});
}
//时间重置
function Fndate() {
	var d = new Date();
	if(d.getMonth() == 0) {
		this.strold = d.getFullYear() - 1 + "-" + 12 + "-" + d.getDate();
	} else {
		this.strold = d.getFullYear() + "-" + (d.getMonth().length > 1 ? d.getMonth() : "0" + d.getMonth()) + "-" + (d.getDate().length > 1 ? d.getDate() : "0" + d.getDate());
	}
	this.strnew = d.getFullYear() + "-" + ((d.getMonth() + 1).length > 1 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + (d.getDate().length > 1 ? d.getDate() : "0" + d.getDate());
}

//记录状态
function fnjilu() {
	if(state.state == "确认违规" || state.state == "解除违规" || state.state == "处罚中" || state.state == "已结束") {
		$("i", ".xze1>div:eq(0)").removeClass("cgl-on");
		$("i", ".xze1>div:eq(1)").addClass("cgl-on");
		$(".ztai>.cgl-wgui:eq(0)").css({
			"display": "none"
		});
		$(".ztai>.cgl-wgui:eq(1)").css({
			"display": "block"
		});
		$(".cgl-con1").each(function() {
			if($(">strong", this).text() == state.state) {
				$(".cgl-con").html($(this).html())
			}
		})
	} else if(state.state == "未处理" || state.state == "申诉中") {
		$("i", ".xze1>div:eq(1)").removeClass("cgl-on");
		$("i", ".xze1>div:eq(0)").addClass("cgl-on");
		$(".ztai>.cgl-wgui:eq(1)").css({
			"display": "none"
		});
		$(".ztai>.cgl-wgui:eq(0)").css({
			"display": "block"
		});
		$(".cgl-con1").each(function() {
			if($(">strong", this).text() == state.state) {
				$(".cgl-con").html($(this).html())
			}
		})
	}
	$("#cgl-cxdata").val(state.querybegindate);
	$("#cgl-cxdata1").val(state.queryenddate);

	state.province == "" ? $("#province>span>em").html("省") : $("#province>span>em").html(state.province);
	state.city == "" ? $("#city>span>em").html("市") : $("#city>span>em").html(state.city);
	state.county == "" ? $("#area>span>em").html("区") : $("#area>span>em").html(state.county);
	if(state.compare == "等于") {
		$("#cgl-xzf").val("等于");
	} else {
		for(var i = 0; i < $("#cgl-xzf option").length; i++) {
			if($("#cgl-xzf option").eq(i).html() == state.compare) {
				$("#cgl-xzf option").eq(i).attr("selected", true)
			}
		}
	}
	$("#cgl-wgcs").val(state.brcount);
	$("#cgl-vipname").val(state.membername);
	if(state.level == "") {
		$("#cgl-wgdj").css({
			"color": "#999"
		}).val("-请选择-");

	} else {
		$("#cgl-wgdj").css({
			"color": "#333"
		});
		for(var j = 1; j < $("#cgl-wgdj option").length; j++) {
			if($("#cgl-wgdj option").eq(j).html() == state.level) {
				$("#cgl-wgdj option").eq(j).attr("selected", true)
			}
		}
	}
}
//处理与待处理
function fnxze1() {
	$(".xze1>div").on("click", function() {
		$(".xze1 i").removeClass("cgl-on");
		$("i", this).addClass("cgl-on");
		$(".ztai>div").css({
			"display": "none"
		}).eq($(this).index()).css({
			"display": "block"
		});
		state["state"] = $(".ztai>.cgl-wgui:visible .cgl-con1:eq(0)>strong").html();
		state["lastindex"] = 0;
		fnshijian(state);
		localStorage.setItem("state", JSON.stringify(state));
	});
}

//模拟下拉菜单
function fnxiala() {
	$(".ztai").on("click", ".cgl-wgui", function() {
		$(">ul", this).toggle();
	}).find("li>.cgl-con1").click(function() {
		$(".cgl-con").html($(this).html());
		state["lastindex"] = 0;
		state["state"] = $(".cgl-wgui>.cgl-con>strong", ".ztai").html();
		fnshijian(state);
		localStorage.setItem("state", JSON.stringify(state));
	});
	$(document).click(function(e) {
		if(!$(e.target).closest(".cgl-wgui").length) {
			$(".cgl-wgui>ul").hide();
		}
	});

}
//选择日期
function fndate() {
	$('.time').click(function(e) {
		e.stopPropagation();
		// var id = $(this).attr('id');
		laydate({
			// elem: id,
			event: 'focus',
			format: 'YYYY-MM-DD',
			// format: 'YYYY-MM-DD',
			max: laydate.now(),
			istime: false,
			isclear: false, //是否显示清空
			istoday: false, //是否显示今天
			issure: false,
			choose: function(dates) {
				//layer.msg(dates);
				var isxy = $('#cgl-cxdata1').val().replace(/\-/g, "") - $('#cgl-cxdata').val().replace(/\-/g, "")
					//console.log(isxy)
				if($('#cgl-cxdata').val() == state["querybegindate"] && $('#cgl-cxdata1').val() == state["queryenddate"]) {
					return false;
				} else if(isxy < 0 && $('#cgl-cxdata').val() != "" && $('#cgl-cxdata1').val() != "") {
					$(".cgl-jzz").html("日期选择有误").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				} else {
					state["querybegindate"] = $('#cgl-cxdata').val();
					state["queryenddate"] = $('#cgl-cxdata1').val();
					state["lastindex"] = 0;
					fnshijian(state);
					localStorage.setItem("state", JSON.stringify(state));
				}
			}
		});
	});

}
$('#cgl-cxdata').change(function() {
	alert('123');
});

//发生地区
function fnfsdiqu() {
	$("#province>ul").on("click", "li", function() {
		var sheng = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(sheng != shengold) {
			if(sheng == "省份") {
				sheng = ""
			}
			if(shiold == "市" || shiold == "城市") {
				shiold = ""
			}
			if(quold == "区" || quold == "区县") {
				quold = ""
			}
			state["province"] = sheng;
			state["lastindex"] = 0;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		}
	});
	$("#city>ul").on("click", "li", function() {
		var shi = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(shi != shiold) {
			if(shi == "城市") {
				shi = ""
			}
			if(shengold == "省" || shengold == "省份") {
				shengold = ""
			}
			if(quold == "区" || quold == "区县") {
				quold = ""
			}
			state["city"] = shi;
			state["lastindex"] = 0;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		}
	});
	$("#area>ul").on("click", "li", function() {
		var qu = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(qu != quold) {
			if(qu == "区县") {
				qu = ""
			}
			if(shiold == "市" || shiold == "城市") {
				shiold = ""
			}
			if(shengold == "省" || shengold == "省份") {
				shengold = ""
			}
			state["county"] = qu;
			state["lastindex"] = 0;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		}
	});

}
//违规次数
function fnweignum() {
	$("#cgl-xzf").change(function() {
		state["compare"] = $(this).find("option:selected").text();
		localStorage.setItem("state", JSON.stringify(state));
		if($("#cgl-wgcs").val() != "") {
			state["brcount"] = Number($("#cgl-wgcs").val());
			state["lastindex"] = 0;
			fnshijian(state);
		}
	});
	$("#cgl-wgcs").on('input', function(e) {
		if(Number($(this).val()) < 0 || isNaN(Number($(this).val()))) {
			$(this).val("");
		} else if($(this).val() == "") {
			state["brcount"] = $(this).val();
			state["lastindex"] = 0;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		} else {
			if($(this).val() - 0 === state["brcount"]) {
				$(this).val($(this).val() - 0);
			} else {
				$(this).val($(this).val() - 0);
				state["brcount"] = $(this).val() - 0;
				state["lastindex"] = 0;
				fnshijian(state);
				//console.log(state)
				localStorage.setItem("state", JSON.stringify(state));
			}

		}

	});
}
//会员名称
function fnvipname() {
	var t = 0;
	$("#cgl-vipname").on('input', function(e) {
		clearTimeout(t);
		var that = this;
		t = setTimeout(function() {
			state["membername"] = $(that).val();
			state["membertype"] = $("#cgl-md").find("option:selected").val();
			state["lastindex"] = 0;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		}, 1000);
	});
}
//违规级别
function fnwgjb() {
	$(".cgl-jzz").html("加载中，请稍后···").show();
	var opt = "";
	$.ajax({
		type: "get",
		url: "/webapi/operation/1/breakruleslevels",
		data: "",
		success: function(data) {
			$(".cgl-jzz").hide();
			opt = "<option >-请选择-</option>";
			for(var k1 in data) {
				opt += "<option>" + data[k1]["level"] + "</option>";
			}
			$("#cgl-wgdj").html(opt);
		}
	});
	$("#cgl-wgdj").change(function() {
		var level = $(this).find("option:selected").text();
		if(level == "-请选择-") {
			level = "";
			$("#cgl-wgdj").css({
				"color": "#999"
			});
		} else {
			$("#cgl-wgdj").css({
				"color": "#333"
			});
		}
		state["level"] = level;
		state["lastindex"] = 0;
		fnshijian(state);
		localStorage.setItem("state", JSON.stringify(state));
	});
}
//重置按钮
function fnreset() {
	$("#cgl-reset").on("click", function() {
		var arr = new Fndate();
		var state1 = {
			state: "未处理", //状态
			membername: "", //会员名称
			membertype: "", //会员类型
			querybegindate: arr.strold, //查询开始日期
			queryenddate: arr.strnew, //查询截止日期
			province: "", //省
			city: "", //市
			county: "", //区
			brcount: "", //违规次数
			compare: "等于", //违规次数比较符号
			level: "", //违规级别
			lastindex: "0", //上次返回结果的最后一条数据索引
			pagecount: "50" //要查询的数据条数
		};
		if(JSON.stringify(state1) == JSON.stringify(state) && $("#cgl-cxdata").val()==state1.querybegindate&&
	$("#cgl-cxdata1").val()==state1.queryenddate) {
			$(".cgl-jzz").html("已经是最初始状态").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			state = state1;
			fnshijian(state);
			localStorage.setItem("state", JSON.stringify(state));
		}
		$("#province>span>em").html("省");
		$("#city>span>em").html("市");
		$("#area>span>em").html("区");
		$("#cgl-wgdj").css({
			"color": "#999"
		}).val("-请选择-");
	});
}

//操作
function fncaozuo() {
	var attr = "";
	$("tbody").on("click", ".cgl-td13", function() {
		$("#cgl-table").find("input:checkbox").prop("checked", false);
		var td12 = $(this).parents("tr").find(".cgl-td12").html();
		$(".cgl-td13").html("");
		attr = "";
		attr += "<div><ul>" +
			"<li class='xiangxi'>详细</li>" +
			"<li class='fasong'>发送通知</li>" +
			"<li class='tiaoz'>调整违规等级</li>";
		if(td12 == "确认违规") {
			attr += "<li class='vipshensu'>会员申诉</li>";
		}
		if(td12 == "解除违规" || td12 == "未处理" || td12 == "申诉中") {
			attr += "<li class='queren'>确认违规</li>";
		}
		if(td12 == "确认违规" || td12 == "申诉中") {
			attr += "<li class='jiechuwg'>解除违规</li>";
		}
		attr +=
			"</ul></div>";
		$(this).html(attr);
	}).on("click", ".cgl-td13 .xiangxi", function() {
		article_add(this);
	}).on("click", ".fasong", function() {
		fasong_add($(this).parents("tr"));
	}).on("click", ".vipshensu", function() {
		vipshensu_add($(this).parents("tr"));
	}).on("click", ".jiechuwg", function() {
		var putdata = {
			"dealtstate": "解除违规",
			"anticheatingids": $(this).parents("tr").attr("gu-id")

		};
		jiechuwg_add(putdata);
	}).on("click", ".tiaoz", function() {
		tiaoz_add("当前违规等级<span>（" + $(this).parents("tr").find(".cgl-td6").html() + "）</span>", $(this).parents("tr").attr("gu-id"));
	}).on("click", ".queren", function() {
		var putdata = {
			"dealtstate": "确认违规",
			"weiguidengji": $(this).parents("tr").find(".cgl-td6").text().replace(/[^0-9]/ig, ""),
			"anticheatingids": $(this).parents("tr").attr("gu-id")
		};
		querenwg_add(putdata);
	});
	$(document).click(function(e) {
		if(!$(e.target).closest(".cgl-td13").length) {
			$(".cgl-td13").html("");
		}
	});
}
//详细弹窗
function article_add(that) {
	var parents = $(that).parents("tr");
	var cont = "<ul>" +
		"<li class='cgl-li1'>" +
		"<h4>会员名称</h4>" +
		"<strong style='display: none'></strong>" +
		"<p>" + $(".cgl-td2", parents).find("p").text() + "</p>" +
		"</li>" +
		"<li class='cgl-li2'>" +
		"<h4>会员类型</h4>" +
		"<span>" + $(".cgl-td3", parents).text() + "</span>" +
		"<p>" + $(".cgl-td5", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li3'>" +
		"<h4>发生地区</h4>" +
		"<p>" + $(".cgl-td4", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li6'>" +
		"<h4>报警时间</h4>" +
		"<p>" + $(".cgl-td41", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li4'>" +
		"<ul id='cgl-li4ul'>" +
		"<li><h4>近半年</h4><p>" + $(".cgl-td5", parents).html() + "</p></li>" +
		"<li><h4>违规级别</h4><p>" + $(".cgl-td6", parents).text() + "</p></li>" +
		"<li><h4>违规原因</h4><p>" + $(".cgl-td7", parents).text() + "</p></li>" +
		"<li><h4>处罚措施</h4><p>" + $(".cgl-td8", parents).text() + "</p></li>" +
		"<li><h4>处罚周期</h4><p class='cgl-xxcfzq'>" + $(".cgl-td9", parents).html() + "</p></li>" +
		"<li><h4>刷单金额</h4><p>" + $(".cgl-td10", parents).text() + "</p></li>" +
		"<li><h4>扣款金额</h4><p>" + $(".cgl-td11", parents).text() + "</p></li>" +
		"</ul>" +
		"</li>" +
		"<li class='cgl-li5'>" +
		"<h4>操作记录</h4>" +
		"<ul class='cgl-czjl'>" +
		"</ul>" +
		"</li>" +
		"</ul>" +
		"<div class='cgl-antc'><span class='cgl-close cgl-ciyao'>关闭</span>";
	for(var i = 0; i < $(that).nextAll().length; i++) {
		cont += "<span class='cgl-import'>" + $(that).nextAll().eq(i).html() + "</span>";
	}
	cont += "</div>";
	var index = layer.open({
		type: 5,
		title: "详细",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	//操作记录
	var guid = parents.attr("gu-id");
	$.ajax({
		type: "get",
		url: "/webapi/earlywarningmanage/anticheating/stateopdetail/" + guid,
		data: "",
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			console.log(data)
			$(".cgl-jzz").hide();
			var oli = "";
			if(data.error) {
				oli += "<li>暂无记录</li>";
			}
			for(var i = 0; i <data.length; i++) {
				oli += "<li>" +
					"<span>" + data[i]["issuetime"] + "</span>" +
					"<span>" + data[i]["issueby_name"] + "</span>"+
				/*if(data[i]["dealtstate"] == "确认违规") {
					oli += "<div>" + data[i]["dealtstate"] + "；</div>";
				} else {
					oli += "<div>" + data[i]["dealtstate"] + "：<span>" + data[i]["description"] + "</span></div>";
				}*/
					"<div>" + data[i]["dealtstate"] + "：<span>" + data[i]["description"] + "</span></div>"+
				"</li>";
			}
			$(".cgl-czjl").html(oli);
		}
	});
	fnclose(index); //关闭按钮
	$(".cgl-antc").on("click", ".cgl-import", function() {
		var fstz = "";
		if($(this).text() == "发送通知") {
			fstz = {
				"anticheatingids": guid
			};
			fnfstz(fstz);
		}
		if($(this).text() == "调整违规等级") {
			tiaoz_add("当前违规等级<span>（" + parents.find(".cgl-td6").html() + "）</span>", guid)
		}
		if($(this).text() == "会员申诉") {
			vipshensu_add(parents);
		}
		if($(this).text() == "确认违规") {
			var putdata = {
				"dealtstate": "确认违规",
				"weiguidengji": $(".cgl-td6", parents).text().replace(/[^0-9]/ig, ""),
				"anticheatingids": guid
			};
			querenwg_add(putdata);
		}
		if($(this).text() == "解除违规") {
			var putdata = {
				"dealtstate": "解除违规",
				"anticheatingids": guid

			};
			jiechuwg_add(putdata);
		}
	})
}
//发送通知
function fnfstz(fstz) {
	$(".cgl-jzz").html("加载中，请稍后···").show();
	$.ajax({
		type: "post",
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		url: "/webapi/earlywarningmanage/anticheating/sendnotification",
		data: fstz,
		success: function(data) {
			$(".cgl-jzz").hide();
			if(data.succeed == "succeed") {
				//alert("发送成功");
				$(".cgl-jzz").html("发送成功").fadeIn(500).delay(1000).fadeOut(100);
				/*				var cont = "<div style='text-align:center;line-height:50px;'>发送成功</div>";
								var index = layer.open({
									type: 5,
									title: "状态",
									area: ['300px', 'auto'],
									content: cont
								});
								layer.full(index);
				*/
			} else if(data.error) {
				alert(data.error);
			}
		}
	});
}
//关闭按钮
function fnclose(index) {
	$(".cgl-close").click(function() {
		layer.close(index)
	});
}
//操作中的发送通知
function fasong_add(parents) {
	var fstz = {
		"anticheatingids": parents.attr("gu-id")
	};
	fnfstz(fstz);
}
//会员申诉
function vipshensu_add(parents) {
	var cont = "<div>" +
		"<div id='cgl-miaoshu'>" +
		"<h4>登记内容</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div id='cgl-kuaijie'>" +
		/*		    "<h4>快捷申诉</h4>" +
				    "<div>" +
				        "<label><input name='shensu' type='checkbox'>描述1 </label>" +
				        "<label><input name='shensu' type='checkbox'>描述2 </label>" +
				        "<label><input name='shensu' type='checkbox'>描述3 </label>" +
				        "<label><input name='shensu' type='checkbox'>描述4</label>" +
				    "</div>" +
		*/
		"</div>" +
		"<div class='cgl-anfs'><span class='cgl-close cgl-ciyao'>关闭</span><span class='cgl-import quedss'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "登记会员申诉",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	//关闭
	fnclose(index);
	//申述描述
	$(".quedss").click(function() {
		//var kuis = $("#cgl-kuaijie").find("input:checked").parent().text();
		var mshu = $("#cgl-miaoshu").find("textarea").val();
		var putdata = {
			"description": mshu,
			"dealtstate": "申诉中",
			"anticheatingids": parents.attr("gu-id")
		};
		//console.log(putdata)
		if(putdata.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			fnwgjlzt(putdata);
		}
	});
}
//解除违规
function jiechuwg_add(putdata) {
	var cont = "<div>" +
		"<div id='cgl-miaoshu'>" +
		"<h4>备注</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div id='cgl-kuaijie'>" +
		/*"<h4>快捷申诉</h4>" +
		"<div>" +
		    "<label><input name='shensu' type='checkbox'>描述1 </label>" +
		    "<label><input name='shensu' type='checkbox'>描述2 </label>" +
		    "<label><input name='shensu' type='checkbox'>描述3 </label>" +
		    "<label><input name='shensu' type='checkbox'>描述4</label>" +
		"</div>" +*/
		"</div>" +
		"<div class='cgl-anfs'><span class='cgl-close cgl-ciyao'>关闭</span><span id='qrjcweig' class='cgl-import'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "解除违规",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	//关闭
	fnclose(index);
	//确认解除
	$("#qrjcweig").on("click", function() {
		putdata.description = $("#cgl-miaoshu").find("textarea").val();
		if(putdata.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {

			fnqrjcwg(putdata);
		}
	});
}
//确认解除违规
function fnqrjcwg(putdata) {
	var cont = "<div>" +
		"<div class='jctext'>确认解除违规？" +
		"</div>" +
		"<div class='cgl-antz'><span class='layui-layer-close'>取消</span><span class='cgl-import querenjc'>确定</span></div>" +
		"</div>";
	var index = layer.open({
		type: 5,
		title: "解除违规",
		area: ['500px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".querenjc").click(function() {
		fnwgjlzt(putdata);
	});
}
//调整违规等级
function tiaoz_add(dangq, guid) {
	//console.log(dangq,guid);
	var cont = "<div>" +
		"<p class='cgl-dqdj'>" + dangq + "</p>" +
		"<div class='cgl-tiaoz'>调整违规等级" +
		"<select>" + $("#cgl-wgdj").html() + "</select></div>" +
		"<div id='cgl-tjbz'>" +
		"<h4>备注</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div class='cgl-antz'><span class='cgl-close cgl-ciyao'>关闭</span><span class='cgl-import' id='cgl-qrtz'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "调整违规等级",
		area: ['960px', 'auto'],
		content: cont
	});
	layer.full(index);
	fnclose(index);
	$(".cgl-tiaoz").find("option:first").remove();
	//等级调整确认事件
	$("#cgl-qrtz").click(function() {
		var djjson = {
			"level": $(".cgl-tiaoz").find("option:selected").html(),
			"description": $("#cgl-tjbz").find("textarea").val(),
			"anticheatingids": guid
		};
		if(djjson.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			//$(".cgl-jzz").html("加载中，请稍后···").show();
			$.ajax({
				type: "put",
				url: "/webapi/earlywarningmanage/anticheating/levelchanged",
				data: djjson,
				error: function() {
					$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				},
				success: function(data) {
					$(".cgl-jzz").hide();
					//console.log(data);
					if(data.error) {
						$(".layui-layer-shade").remove();
						$(".layui-layer").remove();
						alert(data.error);
					}
					if(data.succeed) {
						var guidarr = guid.split(",");
						for(var i = 0; i < guidarr.length; i++) {
							$("tr").each(function(n) {
								if($(this).attr("gu-id") == guidarr[i]) {
									$(this).find(".cgl-td6").html(djjson.level);
									$(".cgl-jzz").html("等级调整成功").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
								}
							});
						}
					}
				}
			});
		}

	});
}
//确认违规
function querenwg_add(putdata) {
	var cont = "<div>";
	if(putdata.weiguidengji) {
		cont += "<div class='cgl-jibie'><span class='left'>违规等级</span>" + putdata.weiguidengji + "级</div>";
	}
	cont += "<div class='cgl-tiaoz qrentext'><span class='left'>备注</span><textarea class='left'></textarea></div>" +
		"<div class='cgl-antz'><span class='cgl-qrwgqx'>取消</span><span class='cgl-import cgl-qrwgqr'>确定</span></div>" +
		"</div>";
	var index = layer.open({
		type: 5,
		title: "确认违规",
		area: ['962px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".cgl-qrwgqx").on("click", function() {
		layer.close(index);
	});
	$(".cgl-qrwgqr").on("click", function() {
		putdata.description = $(".qrentext").find("textarea").val();
		//console.log(putdata)
		if(putdata.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			fnwgjlzt(putdata);
		}
	});

}
//全选单选事件
function fnchec() {
	$("#cgl-table").on("click", "#checall", function() {
		if($(this).prop("checked") == true) {
			$(".thechec", "#cgl-table").prop("checked", true);
		} else {
			$(".thechec", "#cgl-table").prop("checked", false);
		}
	});
	$("#cgl-table").on("click", ".thechec", function() {
		if($(".thechec:checked", "#cgl-table").length == $(".thechec", "#cgl-table").length) {
			$("#checall").prop("checked", true);
		} else {
			$("#checall").prop("checked", false);
		}
	});
}
//获取选中的id
function fnguid() {
	var guid1 = "";
	var checlen = $(".thechec:checked");
	for(var i = 0; i < checlen.length; i++) {
		if(i == checlen.length - 1) {
			guid1 += checlen.eq(i).parents("tr").attr("gu-id")
		} else {
			guid1 += checlen.eq(i).parents("tr").attr("gu-id") + ",";
		}

	}
	return guid1;
}
//四个按钮事件
function fnanniu() {
	$("#cgl-qrwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else if($("#cgl-tbody").find(".cgl-td12").html() == "确认违规") {
			$(".cgl-jzz").html("已经是当前状态").fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			var guid = fnguid();
			var putdata = {
				"dealtstate": "确认违规",
				"anticheatingids": guid
			};
			querenwg_add(putdata);
		}
	});
	$("#cgl-jcwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else if($("#cgl-tbody").find(".cgl-td12").html() == "解除违规") {
			$(".cgl-jzz").html("已经是当前状态").fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else if($("#cgl-tbody").find(".cgl-td12").html() == "未处理") {
			$(".cgl-jzz").html("不可解除违规").fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			var guid = fnguid();
			var putdata = {
				"dealtstate": "解除违规",
				"anticheatingids": guid
			};
			jiechuwg_add(putdata);
		}

	});
	$("#cgl-tzwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid);
			tiaoz_add("", guid);
		}

	});
	$("#cgl-fstz1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid);
			var fstz = {
				"anticheatingids": guid
			};
			fnfstz(fstz);
			//fnwgjlzt(putdata);
		}

	});
}
//改变违规记录状态
function fnwgjlzt(putdata) {
	//console.log(putdata)
	$('.layui-layer-close').click();
	//$(".cgl-jzz").html("加载中，请稍后···").show();
	$.ajax({
		type: "put",
		url: "/webapi/earlywarningmanage/anticheating/dealtstatechange",
		data: putdata,
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			$(".cgl-jzz").hide();
			if(data.error) {
				$('.layui-layer-close').click();
				$(".cgl-jzz").html("操作失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			}
			if(data.succeed) {
				var guidarr = putdata.anticheatingids.split(",");
				for(var i = 0; i < guidarr.length; i++) {
					$("tr").each(function(n) {
						if($(this).attr("gu-id") == guidarr[i]) {
							$(this).find(".cgl-td12").html(putdata.dealtstate);
							$(this).remove();
						}
					});

				}
				state["lastindex"] = 0;
				//console.log(state)
				/*				$.ajax({
									type: "get",
									url: "/webapi/earlywarningmanage/anticheating/getlist",
									data: state,
									error: function() {
										$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
									},
									success: function(data) {
										fndengji(data.statecount);
										//fnxuanran(data);
										$("#cgl-table").find("#checall").prop("checked", false);
									}
								});
				*/
				fnshijian(state);
				$(".cgl-jzz").html("操作成功").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			}
		}
	});
}

$(function() {
	fnshijian(state);
	fnxze1();
	fnxiala(); //下拉菜单
	fndate(); //发送时间
	fnfsdiqu(); //发送地区
	fnweignum(); //违规次数
	fnvipname(); //会员名称
	fnwgjb();
	fnanniu();
	$("#cgl-tbody").on("click", "tr", function() {
		$(this).addClass("ckon").siblings().removeClass("ckon");
	});
	fncaozuo(); //操作按钮
	fnchec(); //单选复选
	fnreset(); //重置
	fnmore(); //点击加载更多

	comSelect();
	selectCity();

});