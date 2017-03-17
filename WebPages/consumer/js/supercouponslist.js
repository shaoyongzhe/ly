var consumer_id = getUrlParam("consumer_id");
var pageIndex = 1;
var pageCount = 1;
var tmdropme;
var isInit = true;
$(function() {
	var myApp = new Vue({
		el: ".valBox",
		data: {
			items: [],
			isShow: false
		},
		mounted:function(){
			waitloadaddress(function() {
				//      loaddata(wxlocation.longitude, wxlocation.latitude, null);
				loaddata(116.357, 39.94978, null);
			});
		},
		methods: {
			useticket: function(hxGuid) { // 码上用
				if(this.items.verifylimit > 0) { //可用状态，跳转到码上用核销界面
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
				}
			},
			telCall: function(pNumber) {
				window.location.href = 'tel://' + pNumber + '';
			},
			toTicketDetails: function(doorId) {
				window.location.href = "/consumer/page/superticketitem.html?activitiy_item_guid=" + doorId;
				
			}
			/*
			topicClick: function(el) {
				var topicid = "";
				$.each(el.topiclist, function(index, item, array) {
					if(index <= 20) {
						topicid += "," + item.topicid
					}
				});

				location.href = "../page/participate1.html?topicid=" + topicid.substring(1)
			}*/
		}
	})

	$('.tip-w').click(function() {
		$('.tip-w').fadeOut(200);
	})

	$('.share').click(function() {
		$('.tip-w').fadeIn(200);
	})
	

	function loaddata(longitude, latitude, dropme) {

		var ajaxdata = { consumer_id: consumer_id, "activitykind": "distributor_to_consumer", "activitytype": "ticket", pageindex: pageIndex };
		if(wxjsconfig.sharekey != null)
			ajaxdata[wxjsconfig.sharekey] = "_";

		var search = window.location.search;
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
			ajaxdata["latitude"] = latitude
		}

		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/webapi/consumer/weixin/nearby/tickets', 
//			url:'/consumer/data/ticketList.json',
			// webapi/consumer/weixin/nearby/tickets
			data: ajaxdata,
			beforeSend: function() { 
				if(pageIndex == 1) { 
					common.loading.show(); 
				} 
			},
			complete: function() { 
				if(pageIndex == 1) { 
					common.loading.hide(); 
				}
			},
			success: function(jsondata) {
				common.loading.hide(); //数据请求成功即隐藏转圈动画
				jsondata = jsondata || {};

				if(jQuery.isEmptyObject(jsondata)) {
					dealdropme(dropme);
					return;
				}

				if(jsondata.error) {
					toasterextend.showtips(jsondata.error, "error", false);
					qrcode.href();
					dealdropme(dropme);
					return;
				}

				if (jsondata.user_notification) {
					toasterextend.showtips(jsondata.user_notification, "info");
//					alert(2)
					if(pageIndex == 1)
						$("#list").html(' <img class="lazy" src="/consumer/image/no-ticket.png"  style="width:60%;margin:120px 0 0 20%;" />');
					qrcode.href();
					dealdropme(dropme);
					return;
				}

				if(jsondata.data == undefined || jsondata.data.length == 0) {
					if(pageIndex == 1)
						$("#list").html(' <img class="lazy" src="/consumer/image/no-ticket.png"  style="width:60%;margin:120px 0 0 20%;" />');
					qrcode.href();
					dealdropme(dropme);
					return;
				}
				if(pageIndex != 1) {

					$.each(jsondata.data, function(i, v) {
						myApp.items.push(v);
					});
				} else{
					myApp.items = jsondata.data;
				}
				myApp.isShow = true
				$("img.lazy").lazyload();

				setTimeout(function() {
					$('#ad_title').fadeOut(200);
				}, 2000)
				if(pageIndex == 1 && isInit && !jsondata.error && !jsondata.user_notification) {
					isInit = false;
					if($.isFunction(wxjsshare)) {
						wxjsshare(jsondata.share || {});
					}
					qrcode.show()
					setTimeout(function() {

						$('#list').dropload({
							scrollArea: window,
							domDown: {
								domClass: 'dropload-down',
								domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
								domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
								domNoData: '<div class="dropload-noData">暂无数据</div>'
							},
							loadDownFn: function(me) {
								pageIndex++;
								tmdropme = me;
								loaddata(longitude, latitude, me);
							}
						});
					}, 500)
				}
				
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
				dealdropme(dropme);
			}
		});
	};

})