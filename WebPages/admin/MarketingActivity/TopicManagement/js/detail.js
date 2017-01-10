/*var detailData = {
	"activity": {
		"guid": "4b108a2261284dbb930f481b29426cff",
		"description": "申报说明申报说明申报说明申报说明申报说明申报说明申报说明申报说明申报说明申报说明申报说明申报说明",
		"state": "上架",
		"begintime": "2016-12-04 09:00:00",
		"endtime": "2017-04-03 23:59:59",
		"earliestjointime": "2016-09-15 02:00:00",
		"latestjointime": "2016-12-30 00:00:00",
		"activitytitle": "活动主题111111111111111111111111111",
		"servicephone": "13423232333",
		"singleselection": 1
	},
	"area_condition": [
        {
            "charge": {
                "state": "unactivated",
                "name": "shaoyongzhe",
                "guid": "4654269886BC4FD7B5914ED324208FB0",
                "oid": "2800992"
            },
            "name": "河北省",
            "city": [
                {
                    "charge": {
                        "state": "active",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "秦皇岛市",
                    "country": []
                },
                {
                    "charge": {
                        "state": "unactivated",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "邯郸市",
                    "country": []
                }
            ]
        },
        {
            "charge": {
                "state": "active",
                "name": "shaoyongzhe",
                "guid": "4654269886BC4FD7B5914ED324208FB0",
                "oid": "2800992"
            },
            "name": "山西省",
            "city": [
                {
                    "charge": {
                        "state": "unactivated",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "长治市",
                    "country": []
                },
                {
                    "charge": {
                        "state": "active",
                        "name": "shaoyongzhe",
                        "guid": "4654269886BC4FD7B5914ED324208FB0",
                        "oid": "2800992"
                    },
                    "name": "晋城市",
                    "country": []
                }
            ]
        }
    ],
	"supplier_condition": {},

	"distributor_condition": {
		"number_range": {
			"min": 0,
			"max": 124,
			"state": "active"
		},
		"member_time": {
			"min": 0,
			"operator": "between",
			"max": 1234,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始时",
			"timeunit": "月",
			"state": "active",
			"guid": "14cc1bc4023f4d1e86ffe2d47a56d6b7"
		},
		"fans_range": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "7692256ecd5948469f117b4c5fb00376"
		},
		"activityfanspercentage": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "月",
			"state": "active",
			"guid": "be105de5e855448dbd5fe4eeb2737a43"
		},
		"ticket_verify": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "14d42b12c9634fcea62038a67f74d5ad"
		},
		"verify_person_count": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "a7437f9893a14a9b99fa065eaaeb8328"
		},
		"singleselection": 0
	},
	"consumer_condition": {},
	"retailer_condition": {
		"number_range": {
			"min": 0,
			"max": 124,
			"state": "active"
		},
		"member_time": {
			"min": 0,
			"operator": "between",
			"max": 1234,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始时",
			"timeunit": "天",
			"state": "active",
			"guid": "38259d5c03a54208a71570d9bf872e7f"
		},
		"fans_range": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始时",
			"timeunit": "月",
			"state": "active",
			"guid": "61082b5e112746f4a899ba8036317952"
		},
		"activityfanspercentage": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "eb8a34efaf9f4f30807cda0dfd8ae0d8"
		},
		"ticket_verify": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "266f9ccbc49c42f28b64f20a69da392f"
		},
		"verify_person_count": {
			"min": 0,
			"operator": ">=",
			"max": 0,
			"begintime": "2016-09-12",
			"statisticrange" : "活动开始前",
			"timeunit": "天",
			"state": "active",
			"guid": "fc3408903c254feb88847da78b0a3f50"
		},
		"singleselection": 0
	},

	"activity_condition": [
		{
			"state": "active",
			"guid": "40895d6629af4d11b2853b25d824ddae",
			"activitytype": "buycount",
			"retailer_count": {
				"min": 0,
				"max": 25
			},
			"discount": {
				"min": 0,
				"operator": "between",
				"max": 25
			},
		},
		{
	        "state": "active",
			"guid": "40895d6629af4d11b2853b25d824ddae",
	        "activitytype": "discount",
	        "retailer_count": {
	            "min": "6",
	            "max": "8"
	        },
	        "discount": {
	            "min": "8",
	            "operator": ">"
	        }
	    }
    ],
	"event_handler_list": [
		{
			"state": "active",
			"refund_to": "consumer",
			"event": "verify",
			"refund_content": "randommoney",
			"min": 12,
			"max": 25,
			"ceiling": 1544,
			"applycount": 12233,
			"limit": {
				"count_on": "ticket",
				"perday": {
					"sum": 1222,
					"time": 122
				},
				"totalbudget": {
					"sum": 122,
					"time": 12
				}
			},
			"probability": {
				"range": "fda",
				"time_curve": [{
					"value": 0,
					"percentage": 12
				}],
				"value_curve": [{
					"value": 0,
					"percentage": 12
				}]
			},
			"guid": "51a9f00bba63496c8eb30a4b020fd4f6"
		},
		{
			"state": "active",
			"refund_to": "retailer",
			"event": "shareticket",
			"refund_content": "fixedpoints",
			"min": 33,
			// "max": 22,
			"ceiling": 16,
			"applycount": 321,
			"limit": {
				"count_on": "ticket",
				"perday": {
					"sum": 1222,
					"time": 122
				},
				"totalbudget": {
					"sum": 122,
					"time": 12
				}
			},
			"probability": {
				"range": "fda",
				"time_curve": [{
					"value": 0,
					"percentage": 12
				}],
				"value_curve": [{
					"value": 0,
					"percentage": 12
				}]
			},
			"guid": "51a9f00bba63496c8eb30a4b020fwqf6"
		},
		{
			"state": "active",
			"refund_to": "distributoremployee",
			"event": "shareretailer",
			"refund_content": "fixedmoney",
			"min": 11,
			// "max": 22,
			"ceiling": 156,
			"applycount": 123,
			"limit": {
				"count_on": "ticket",
				"perday": {
					"sum": 1222,
					"time": 122
				},
				"totalbudget": {
					"sum": 122,
					"time": 12
				}
			},
			"probability": {
				"range": "fda",
				"time_curve": [{
					"value": 0,
					"percentage": 12
				}],
				"value_curve": [{
					"value": 0,
					"percentage": 12
				}]
			},
			"guid": "51a9f00bba63496c8eb30a4b020fw4f6"
		},
		{
			"state": "active",
			"refund_to": "retaileremployee",
			"event": "verify_normal",
			"refund_content": "randompoints",
			"min": 36,
			"max": 22,
			"ceiling": 26,
			"applycount": 381,
			"limit": {
				"count_on": "ticket",
				"perday": {
					"sum": 1222,
					"time": 122
				},
				"totalbudget": {
					"sum": 122,
					"time": 12
				}
			},
			"probability": {
				"range": "fda",
				"time_curve": [{
					"value": 0,
					"percentage": 12
				}],
				"value_curve": [{
					"value": 0,
					"percentage": 12
				}]
			},
			"guid": "51a9f00bba63496c8eb30a4b020fwqf6"
		}
	],

	"sponsor": "distributor",
	"propagation": [
		{
			"activitytitle": "活动标语distributor",
			"wechattitle": "微信图文消息标题distributor",
			"propagation": "宣传文案distributor宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案",
			"poster_url": "http://ipa-oss-hz-01.oss-cn-hangzhou.aliyuncs.com/images/membership/2016duanwuhaibao3.png",
			"object": "distributor"
		},
		{
			"activitytitle": "活动标语retailer",
			"wechattitle": "微信图文消息标题retailer",
			"propagation": "宣传文案retailer宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案",
			"poster_url": "http://ipa-oss-hz-01.oss-cn-hangzhou.aliyuncs.com/images/membership/2016duanwuhaibao2.png",
			"object": "retailer"
		},
		{
			"activitytitle": "活动标语consumer",
			"wechattitle": "微信图文消息标题consumer",
			"propagation": "宣传文案consumer宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案宣传文案",
			"poster_url": "http://ipa-oss-hz-01.oss-cn-hangzhou.aliyuncs.com/images/membership/2016duanwuhaibao1.png",
			"object": "consumer"
		}
	]
}
render(detailData);*/



var topicId = '4b108a2261284dbb930f481b29426cff';

$.ajax({
    type: "get",
    url: '/webapi/ipaloma/topic/detail/' + topicId,
    dataType: "json",
    beforeSend: function (){ $('.loading').fadeIn() },
    complete: function (){ $('.loading').fadeOut() },
    success: function (detailData){ render(detailData) },
    error: function (){ console.warn("详情 error") }
});



function render(detailData){

	// 1.活动基础信息
	var first = $('.item.first');
	var activity = detailData.activity;
	first.find('.guid').text(activity.guid);
	first.find('.description').text(activity.description);
	first.find('.begintime').text(activity.begintime);
	first.find('.endtime').text(activity.endtime);
	first.find('.earliestjointime').text(activity.earliestjointime);
	first.find('.latestjointime').text(activity.latestjointime);
	first.find('.activitytitle').text(activity.activitytitle);
	first.find('.servicephone').text(activity.servicephone);
	first.find('.choice').text(activity.singleselection == 1 ? "是" : "否");

	
	// 2.参与活动条件
	var second = $('.item.second');
	var area = detailData.area_condition;  // 活动地区
	for(var i=0; i<area.length; i++){
		$('.province-wrap').append("<div class='province-item'><label class='sheng'>"+ area[i].name +"</label><span class='region-info'><span shengfzr='"+ JSON.stringify(area[i].charge, null, 4) +"'>负责人 "+ area[i].charge.name +"</span><br><span class='city'></span></span></div>");

		for(var j=0; j<area[i].city.length; j++){
			$('.city').last().append("<i shifzr='"+ JSON.stringify(area[i].city[j].charge, null, 4) +"'>"+ area[i].city[j].name +"</i>");
		}
	}

	// 会员活动条件
	var actCond = detailData.activity_condition;
	for(var i=0; i<actCond.length; i++){

		// debugger;
		var type = "";
		switch (actCond[i].activitytype) {
			case "buycount":
				type = "买赠";
				break;
			case "package":
				type = "套餐";
				break;
			case "discount":
				type = "降价";
				break;
		}

		var operator = "";
		switch (actCond[i].discount.operator) {
			case "between":
				operator = "介于";
				break;
			case ">=":
				operator = "不低于";
				break;
			case ">":
				operator = "高于";
				break;
		}

		var str = "";
		if(actCond[i].discount.max){
			// alert(1);
			str = "<td width='180' class='mz'>赠品比例 <span class='operator'>"+ operator +"</span> <i>买</i> "+ actCond[i].discount.max +" <i>赠</i> "+ actCond[i].discount.min +"</td>";
		} else{
			// alert(0);
			str = "<td width='180' class='mz'>赠品比例 <span class='operator'>"+ operator +"</span> <span>"+ actCond[i].discount.min +" <i style='color:#999'>%</i></span></td>";
		}

		$('table.activity-condition tbody').append("<tr><td width='80'>"+ type +"</td>"+ str +"<td>"+ actCond[i].retailer_count.min +"-"+ actCond[i].retailer_count.max +"</td></tr>");
	}

	// 主办方
	// debugger
	var sponsor = detailData.sponsor;
	var zbf = $('span.zbf');
	switch(sponsor){

		case "distributor":
			zbf.text('分销商');
			break;

		case "supplier":
			zbf.text('厂商');
			break;

		case "retailer":
			zbf.text('门店');
			break;

	}

	/*<ul class="select" style="display: none;">
	<li class="option" name="ticket_verify" type="ticket_verify">核销次数</li>
	<li class="option" name="verify_person_count" type="verify_person_count">核销人数</li>
	<li class="option" name="fans_range" type="fans_range">惠粉数</li>
	<li class="option" name="activityfanspercentage" type="activityfanspercentage">粉丝留存率</li>
	<li class="option" name="member_time" type="member_time">会员时长</li>
	<li class="option" name="level" type="level">会员等级</li></ul>*/

	// 参与会员
	// debugger
	var distributor = detailData.distributor_condition;
	if(distributor){
		canyuHy(distributor, "分销商");
	}

	// debugger
	var consumer = detailData.consumer_condition;
	if(consumer){
		if(!$.isEmptyObject(consumer)){
			canyuHy(consumer, "消费者");
		}
	}

	var retailer = detailData.retailer_condition;
	if(retailer){
		canyuHy(retailer, "门店");
	}



	function canyuHy(type, txt){
		$('table.canyu').append("<tr singleselection="+ type.singleselection +"><td width='80'>"+ txt +"</td><td width='80'>"+ type.number_range.min +" - "+ type.number_range.max +"</td><td></td></tr>");

		// debugger
		if(type.ticket_verify){
			condType(type.ticket_verify, "核销次数");
		}
		if(type.verify_person_count){
			condType(type.verify_person_count, '核销人数');
		}
		if(type.fans_range){
			condType(type.fans_range, '惠粉数');
		}
		if(type.activityfanspercentage){
			condType(type.activityfanspercentage, '粉丝留存率');
		}
		if(type.member_time){
			condType(type.member_time, '会员时长');
		}
		if(type.level){
			condType(type.level, '会员等级');
		}
	}

	function condType(ctype, typeTxt){
		var bgt1 = new Date(activity.begintime.substring(0,10)) * 1;
		var bgt2 = new Date(ctype.begintime) * 1;
		var preDays = (bgt1 - bgt2) / 86400000;
		var range = ctype.max ? ctype.max : ctype.min;

		var str = "&nbsp;"+ ctype.operator +"<i>"+ range +"</i>";
		if(ctype.operator == "between"){
			ctype.operator = "介于";
			str = "&nbsp;"+ ctype.operator +" <i>"+ ctype.min +"</i> - <i>"+ ctype.max +"</i>";
		}

		// debugger
		$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +"><span class='typeTxt'>"+ typeTxt +"</span> "+ ctype.statisticrange +" "+ preDays +" <i>"+ ctype.timeunit +"</i>"+ str +" 次</p>");
	}


	// 3.活动补贴规则
	var fourth = $('.item.fourth');
	var butie = detailData.event_handler_list;
	for(var i=0; i<butie.length; i++){

		var btduixiang = "";
		switch(butie[i].refund_to){

			case "distributor":
				btduixiang = '分销商'
				break;

			case "distributoremployee":
				btduixiang = '分销商业务员'
				break;

			case "retailer":
				btduixiang = '门店'
				break;

			case "retaileremployee":
				btduixiang = '门店店员'
				break;

			case "consumer":
				btduixiang = '消费者'
				break;

		}

		var btCond = "";
		switch(butie[i].event){

			case "distributorinviteretailer":
				btCond = '门店签约分销商';
				break;

			case "register":
				btCond = '注册';
				break;

			case "invitefan":
				btCond = '成功邀请朋友关注';
				break;

			case "verify":
				btCond = '首次核销?';
				break;

			case "verify_first":
				btCond = '首次核销';
				break;

			case "verify_normal":
				btCond = '非首次核销';
				break;

			case "shareverify":
				btCond = '分享核销结果';
				break;

			case "shareticket":
				btCond = '分享超惠券';
				break;

			case "shareretailer":
				btCond = '分享门店';
				break;

			case "openretailer":
				btCond = '自主开店';
				break;

			case "openmemsys":
				btCond = '开通会员系统';
				break;

		}
	
		var btType = "";
		switch(butie[i].refund_content){

			case "randompoints":
				btType = '随机积分';
				break;

			case "fixedpoints":
				btType = '固定积分';
				break;

			case "fixedmoney":
				btType = '固定金额';
				break;

			case "randommoney":
				btType = '随机金额';
				break;

			case "randommoney":
				btType = '随机金额';
				break;

			case "randomredpacket":
				btType = '随机微信红包';
				break;

			case "fixedredpacket":
				btType = '固定微信红包';
				break;

			case "randommoneyticket":
				btType = '随机金额返现券';
				break;

		}

		// debugger
		var danwei = "";
		if(btType.indexOf('积分') != -1){
			danwei = "分";
		} else if(btType.indexOf('金额') != -1 || btType.indexOf('红包') != -1){
			danwei = "元";
		}

		var rangeStr = "<span class='fl'>"+ butie[i].min +"-"+ butie[i].max +"</span><span class='fr dw'><i>"+ danwei +"</i>/次</span></span></td><td>"+ butie[i].ceiling +"</td><td class='btfz'><i class='valTxt'>"+ butie[i].max * butie[i].ceiling +"</i><i>"+ danwei +"</i></td>";
		if(!butie[i].max){
			rangeStr = "<span class='fl'>"+ butie[i].min +"</span><span class='fr dw'><i>"+ danwei +"</i>/次</span></span></td><td>"+ butie[i].ceiling +"</td><td class='btfz'><i class='valTxt'>"+ butie[i].min * butie[i].ceiling +"</i><i>"+ danwei +"</i></td>";
		}

		// debugger;
		$('table.butie').append("<tr limit='"+ JSON.stringify(butie[i].limit, null, 4) +"' probability='"+ JSON.stringify(butie[i].probability, null, 4) +"'><td>"+ btduixiang +"</td><td><span class='ell fxs' title='"+ btCond +"'>"+ btCond +"</span></td><td>"+ btType +"</td><td><span class='clr jifen'>"+ rangeStr +"<td class='sbys'><i class='valTxt'>"+ butie[i].applycount +"</i><i>"+ danwei +"</i></td></tr>");
	}

	// debugger
	var yuan = 0;
	$('td.btfz:contains(元) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		yuan += parseInt($(this).text());
	});

	$('.totalYuan').text(yuan);

	var fen = 0;
	$('td.btfz:contains(分) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		fen += parseInt($(this).text());
	});

	$('.totalFen').text(fen);


	var sbysYuan = 0;
	$('td.sbys:contains(元) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		sbysYuan += parseInt($(this).text());
	});

	$('.totalSbysYuan').text(sbysYuan);


	var sbysFen = 0;
	$('td.sbys:contains(分) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		sbysFen += parseInt($(this).text());
	});

	$('.totalSbysFen').text(sbysFen);


	// 4.宣传图文资料
	var propagation = detailData.propagation;
	for(var i=0; i<propagation.length; i++){
		switch (propagation[i].object) {
			case "distributor":
				prop($('.area.fenxiaoshang'), i);
				break;
			case "retailer":
				prop($('.area.mendian'), i);
				break;
			case "consumer":
				prop($('.area.xiaofeizhe'), i);
				break;
		}
	}

	function prop(area, i){
		area.show();
		area.find('.activitytitle').text(propagation[i].activitytitle);
		area.find('.wechattitle').text(propagation[i].wechattitle);
		area.find('.propagation').text(propagation[i].propagation);
		area.find('.posterurl').attr("src",propagation[i].poster_url);
	}

}