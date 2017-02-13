// debugger
var topicId = parent.$('#guid').val();
if(topicId != ""){
	$.ajax({
	    type: "get",
	    url: '/webapi/ipaloma/topic/detail/' + topicId,
	    dataType: "json",
	    beforeSend: function (){ $('.loading').fadeIn() },
	    complete: function (){ $('.loading').fadeOut() },
	    success: function (detailData){
	    	console.log(JSON.stringify(detailData, null, 4));
	    	render(detailData);
	    },
	    error: function (xhr) {
	    	parent.layer.alert('获取详情数据失败: 错误'+ xhr.status, {icon: 5});
	    }
	});

}


function render(detailData){

	// 1.活动基础信息
	var first = $('.item.first');
	var activity = detailData.activity;
	// first.find('.guid').text(activity.activitycode);   ?
	first.find('.guid').text(activity.guid);
	first.find('.description').text(activity.description);
	first.find('.begintime').text(activity.begintime);
	first.find('.endtime').text(activity.endtime);
	first.find('.earliestjointime').text(activity.earliestjointime);
	first.find('.latestjointime').text(activity.latestjointime);
	first.find('.state').text(activity.state);
	first.find('.activitytitle').text(activity.activitytitle);
	first.find('.servicephone').text(activity.servicephone);
	first.find('.choice').text(activity.singleselection == 1 ? "是" : "否");

	
	// 2.参与活动条件
	var second = $('.item.second');
	var area = detailData.area_condition;  // 活动地区
	for(var i=0; i<area.length; i++){
		$('.province-wrap').append("<div class='province-item'><label class='sheng'>"+ area[i].name +"</label><div class='region-info'><div shengfzr='"+ JSON.stringify(area[i].charge, null, 4) +"'>负责人 "+ area[i].charge.name +"</div><div class='city'></div><div class='district-wrap'></div></div></div>");

		for(var j=0; j<area[i].city.length; j++){
			$('.city').last().append("<i shifzr='"+ JSON.stringify(area[i].city[j].charge, null, 4) +"'>"+ area[i].city[j].name +"</i>");

			for(var k=0; k<area[i].city[j].country.length; k++){
				// console.log(area[i].city[j].country[k].name);
				$('.district-wrap:last').append("<i quxian='"+ JSON.stringify(area[i].city[j].country[k], null, 4) +"'>"+ area[i].city[j].country[k].name +"</i>");
			}
		}
	}

	// 会员活动条件
	var actCond = detailData.activity_condition;
	for(var i=0; i<actCond.length; i++){

		// debugger;
		/*var type = "";
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
		}*/

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

		$('table.activity-condition tbody').append("<tr><td width='80'>"+ actCond[i].activitytype +"</td>"+ str +"<td>"+ actCond[i].retailer_count.min +"-"+ actCond[i].retailer_count.max +"</td></tr>");
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
		// debugger
		if(type.number_range){
			// alert(2)
			$('table.canyu').append("<tr singleselection="+ type.singleselection +"><td width='80'>"+ txt +"</td><td width='80'>"+ type.number_range.min +" - "+ type.number_range.max +"</td><td></td></tr>");
		} else {
			// alert(1)
		}

		// debugger
		if(type.核销次数){
			condType(type.核销次数, "核销次数");
		}
		if(type.核销人数){
			condType(type.核销人数, '核销人数');
		}
		if(type.惠粉数){
			condType(type.惠粉数, '惠粉数');
		}
		if(type.粉丝留存率){
			condType(type.粉丝留存率, '粉丝留存率');
		}
		if(type.会员时长){
			condType(type.会员时长, '会员时长');
		}
		if(type.会员等级){
			condType(type.会员等级, '会员等级');
		}
	}

	function condType(ctype, typeTxt){
		var bgt1 = new Date(activity.begintime) * 1;
		var bgt2 = new Date(ctype.begintime) * 1;
		var prevDays = (bgt1 - bgt2) / 86400000;
		var range = ctype.max ? ctype.max : ctype.min;

		var str = "";
		if(ctype.operator == "between"){
			ctype.operator = "介于";
			str = "&nbsp;"+ ctype.operator +" <i>"+ ctype.min +"</i> - <i>"+ ctype.max +"</i>";
		} else if(ctype.operator == ">="){
			ctype.operator = "不低于";
			var str = "&nbsp;"+ ctype.operator +"<i>"+ range +"</i>";
		}
		var timeunit = isNaN(prevDays) ? "" : ctype.timeunit;
		prevDays = isNaN(prevDays) ? "" : prevDays;
		// debugger;
		$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +"><span class='typeTxt'>"+ typeTxt +"</span> "+ ctype.statisticrange +" "+ prevDays +" <i>"+ timeunit +"</i>"+ str +" 次</p>");
		// $('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +"><span class='typeTxt'>"+ typeTxt +"</span>"+ prevDays +" "+ str +" 次</p>");
		
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

			case "distributor_employee":
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

		/*var btCond = "";
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

		}*/
	
		/*var btType = "";
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

		}*/

		// debugger
		var danwei = "";
		if(butie[i].refund_content.indexOf('积分') != -1){
			danwei = "分";
		} else if(butie[i].refund_content.indexOf('金额') != -1 || butie[i].refund_content.indexOf('红包') != -1){
			danwei = "元";
		}

		var rangeStr = "<span class='fl'>"+ butie[i].min +"-"+ butie[i].max +"</span><span class='fr dw'><i>"+ danwei +"</i>/次</span></span></td><td>"+ butie[i].ceiling +"</td><td class='btfz'><i class='valTxt'>"+ butie[i].max * butie[i].ceiling +"</i><i>"+ danwei +"</i></td>";
		
		// debugger;
		if(!butie[i].max || butie[i].max == ""){
			rangeStr = "<span class='fl'>"+ butie[i].min +"</span><span class='fr dw'><i>"+ danwei +"</i>/次</span></span></td><td>"+ butie[i].ceiling +"</td><td class='btfz'><i class='valTxt'>"+ butie[i].min * butie[i].ceiling +"</i><i>"+ danwei +"</i></td>";
		}

		// debugger;
		$('table.butie').append("<tr limit='"+ JSON.stringify(butie[i].limit, null, 4) +"' probability='"+ JSON.stringify(butie[i].probability, null, 4) +"'><td>"+ btduixiang +"</td><td><span class='ell fxs' title='"+ butie[i].event +"'>"+ butie[i].event +"</span></td><td>"+ butie[i].refund_content +"</td><td><span class='clr jifen'>"+ rangeStr +"<td class='sbys'><i class='valTxt'>"+ butie[i].applycount +"</i><i>"+ danwei +"</i></td></tr>");
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

	AddButon(detailData);

}

var buttonDictionary = {
	"上架,正在进行中,待活动开始": '<span class="btn close">关闭</span><span class="btn warn xiajia">下架</span>',
	"草稿,审核中,审核失败,待发布": '<span class="btn close">关闭</span><span class="btn warn xiugai">修改</span>',
	"已过期,已结束,已下架": '<span class="btn close">关闭</span>' 
};


function AddButon(detailData){

	var currentState = detailData.activity.state; $('.currentState').val(currentState);
	var appendKey = $.Enumerable.From(Object.keys(buttonDictionary)).First(function (x) {
	    return x.match(currentState) != null;
	});

	if (null != appendKey){
		$(".footer.btn-group").append(buttonDictionary[appendKey]);
	}
	
}

function closeLayer(){
	var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

$(document).on('click','.xiugai',function(){
	parent.window.location.href = "activityModify.html?guid=" + topicId;

}).on('click','.close',function(){
    closeLayer();

}).on('click','.xiajia',function(){

	$.ajax({

        type: "put",
        url: "/webapi/ipaloma/topic/operation/" + topicId,
        async: true,
        data: {
            ["currentstate"]: $('.currentState').val(),
            ["optype"]: "下架"
        },

        success: function (data) {

            if (data.error){
                parent.layer.alert("出错了^_^");
            }

            // console.log(parent.$('.query'));
            parent.$('.query').click();
            parent.layer.alert("下架成功");
            closeLayer();
            // debugger

        },

        error: function (xhr, textStatus) {
            parent.layer.alert("出错了^_^");
            console.log(textStatus);
        }

    });

});