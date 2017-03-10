
$(function(){
	var addData;
	var activitiy_item_guid = common.getUrlParam("activitiy_item_guid");
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
			isShow: false,
			addressData:addData,
			activitiy_item_guid:activitiy_item_guid
		},
		mounted: function() {
			this.nameSearch(this.addressData.longitude,this.addressData.latitude);
		},
		methods: {
			nameSearch: function(longitude, latitude) {
				var _self = this;
				var ajaxdata = {};
//				console.log(wxjsconfig.sharekey);
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
//					url: '/webapi/consumer/weixin/activities/' + _self.activitiy_item_guid + '/ticket', 
					url: "/consumer/data/ticketDetails.json",
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
						_self.isShow = true;
						_self.items = jsondata.data;
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
			toDoorDetails:function(doorId){
				window.location.href = "/consumer/page/retaileritems.html?retailer_id="+ doorId +"&type=ticket"
			}
		}
	})
	
	$('.tip-w').click(function() {
		$('.tip-w').fadeOut(200);
	})

	$('.share').click(function() {
		$('.tip-w').fadeIn(200);
	})
	
})