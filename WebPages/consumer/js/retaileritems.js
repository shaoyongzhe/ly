
$(function(){
	var addData;
	var retailerId = common.getUrlParam("retailer_id");
	var consumer_id = common.getUrlParam("consumer_id");
	waitloadaddress(function() {
//		var longitude = wxlocation.longitude;
		var longitude = 116.357;
//		var latitude = wxlocation.latitude;
		var latitude = 39.94978;
		addData = {
			'longitude':longitude,
			'latitude':latitude
		}
		return addData;
	});
//	console.log(addData);
	var myApp = new Vue({
		el: ".valBox",
		data: {
			items: '',
			isShowbox: false,
			isShow:false,
			addressData:addData,
			consumerId:consumer_id,
			retailerId:retailerId,
			_share: {},
			noDateMsg: [
				{ imgurl: "/consumer/image/msg_1.png", title: "您的店里竟然没有超惠活动惠粉都要跑光了，快去催催您的分销商吧！" },
				{ imgurl: "/consumer/image/msg_2.png", title: "该门店暂无超惠券哦，去看看超惠活动吧~" }
			],
			activity:[],
			ticket:[]
		},
		mounted: function() {
			this.nameSearch(this.addressData.longitude,this.addressData.latitude);			
		},
		methods: {
			nameSearch: function(longitude, latitude) {
				var _self = this;
				var search = window.location.search;
				if(search.length > 0)
					search = search.substr(1);
				var ajaxdata = {activitykind: "distributor_to_consumer", consumer_id: _self.consumerId }; //activitytype: "activity",
				if(wxjsconfig.sharekey != null)				
					ajaxdata[wxjsconfig.sharekey] = "_";
				var search = window.location.search;
//				console.log(search);
				if(search.length > 0) {
					var keyvalue = [];
					var key = "",
						value = "";
					var paraString = search.substring(search.indexOf("?") + 1, search.length).split("&");
					for(var i in paraString) {
						keyvalue = paraString[i].split("=");
						key = keyvalue[0];
						value = keyvalue[1];
						ajaxdata[key] = value;
					}
				}
				if(longitude != undefined && longitude != '' && latitude != undefined && latitude != '') {
					ajaxdata["longitude"] = longitude;
					ajaxdata["latitude"] = latitude;
				}
				$.ajax({
					type: 'GET',
					dataType: 'json',
//					url: '/webapi/consumer/weixin/retailers/' + _self.retailerId,
					url: "/consumer/data/xfzStoreDetails.json",
//					data: ajaxdata,
					beforeSend: function() {
						common.loading.show();
					},
					complete: function() {
						common.loading.hide();
					},
					success: function(jsondata) {
						common.loading.hide(); //数据请求成功即隐藏转圈动画
//						console.log(jsondata);
						_self.isShowbox = true;
						jsondata = jsondata || {};
						if(jsondata.error) {
							toasterextend.showtips(jsondata.error, "error", false);
							qrcode.href();
							return;
						};
	
						if(jsondata.user_notification) {
							toasterextend.showtips(jsondata.user_notification, "info");
							qrcode.href();
							return;
						};
						if(jsondata.data[0].activitydata == undefined) {
							toasterextend.showtips("活动已下架", "info");
							qrcode.href();
							return;
						}
						_self.items = jsondata.data;
						
						///筛选出活动列表
						_self.activity = $.grep(jsondata.data[0].activitydata, function(item) {
							return item.activitytype == "activity"; //筛选出大于5的
						});
						///筛选出超惠券列表
						_self.ticket = $.grep(jsondata.data[0].activitydata, function(item) {
							return item.activitytype == "ticket"; //筛选出大于5的
						});
						
						setTimeout(function() {
							$('#ad_2').fadeOut(200);
						}, 1500)
						if($.isFunction(wxjsshare)) {
							wxjsshare(jsondata.share || {});
						}
						qrcode.show();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						common.loading.hide(); //隐藏转圈动画
		
						var errormsg = "访问异常";
		
						if(XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
							var json = JSON.parse(XMLHttpRequest.responseText);
							errormsg = JSON.parse(json.Message).error;
							if(errormsg == undefined || errormsg == '')
								errormsg = "Http error: " + XMLHttpRequest.statusText;
						}
						qrcode.href();
						toasterextend.showtips(errormsg, "error");
					}
				})
			},
			useticket: function(hxGuid) { // 码上用
//				if(vm.jsondata.verifylimit > 0) { //可用状态，跳转到码上用核销界面
//					console.log(hxGuid);
					var originalurl = "/consumer/page/superticket_hx.html?activityitem_id=" + hxGuid;
		
					var search = window.location.search;
					var isshare = common.getUrlParam(wxjsconfig.sharekey);
					if(isshare != null && isshare != '' && search.length > 0) {
						var qrtype = common.getUrlParam("qrtype");
						var qrtypeNumber;
						if(qrtype != null && qrtype != '')
							qrtypeNumber = new Number(qrtype);
						var category = 'consumer';
						var qrurl = 'register_generate_code'
						if(qrtypeNumber == 4000) {
							category = 'consumer';
							qrurl = 'share_generate_code';
						} else if(qrtypeNumber >= 34 && qrtypeNumber <= 41) {
							category = 'consumer';
							qrurl = 'share_generate_code';
						} else if(qrtypeNumber >= 30) {
							category = 'consumer';
							qrurl = 'activity_generate_code';
						} else if(qrtypeNumber >= 20) {
							category = 'consumer';
		
						} else if(qrtypeNumber >= 10) {
							category = 'retailer';
						} else {
							category = 'distributor';
						}
						var share_id = common.getUrlParam("share_id");
		
						var qrcode_url = "/webapi/" + category + "/weixin/" + qrurl + search;
		
						var updatecounturl = "/webapi/" + category + "/weixin/shareupdateopencount" + search;
						if(share_id != undefined) {
							$.getJSON(updatecounturl);
						}
		
						var shareRegisterPage = "/" + category + "/page/shareqrcode.html?" + encodeURIComponent(qrcode_url);
						location.href = wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + encodeURIComponent(originalurl)))
					} else {
						location.href = originalurl;
					}
//				}
			},
			telCall:function(pNumber){
				window.location.href = 'tel://'+pNumber+'';
			},
			toTicketDetails:function(topicid){
			window.location.href = "/consumer/page/participate1.html?topicid=" + topicid;
				return false;
			},
			chgleft:function(){
				this.isShow = false;
				$('#ad_1').fadeIn(100).delay(1000).fadeOut(500);
			},
			chgright:function(){
				this.isShow = true;
				$('#ad_2').fadeIn(100).delay(1000).fadeOut(500);
			}
		}
	})
	
	$('.tip-w').click(function() {
		$('.tip-w').fadeOut(200);
	})

	$('.share').click(function() {
		$('.tip-w').fadeIn(200);
	})
	var type = common.getUrlParam("type")
	if(type == undefined || type == null || type == "") {
		type = common.getUrlParam("sharetype")
	}
	if(type == "ticket") {
		myApp.isShow = true;
	}
})