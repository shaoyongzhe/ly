var isInit = true;
var pageIndex = 1;
var myApp = new Vue({
	el: ".myCon",
	data: {
		items: [],
		isShow: false
	},
	mounted: function() {
		this.nameSearch(null);
	},
	methods: {
		nameSearch: function(dropme) {
			var _self = this;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				beforeSend: function() { pageIndex == 1 ? common.loading.show() : "" },
				complete: function() { pageIndex == 1 ? common.loading.hide() : "" },
				data: { pageindex: pageIndex },
                url: '/webapi/distributor/weixin/verify/history/',
//				url: "/distributor/data/fxsVerifyRecord.json",
				success: function(json) {
					console.log(json);
					common.loading.hide(); //隐藏转圈动画

					json = json || {}; /* 统一加这句话 */
					if(jQuery.isEmptyObject(json)) {
						dealdropme(dropme);
						return;
					}
					if(json.error) {
						toasterextend.showtips(json.error, "error");
						if(dropme != null) {
							dropme.resetload();
						}
						return;
					}
					if(json.user_notification) {
						toasterextend.showtips(json.user_notification, "info");
						if(dropme != null) {
							dropme.resetload();
						}
						return;
					}

					if($.isFunction(wxjsshare)) {
						wxjsshare(json.share || {});
					}

					if(pageIndex != 1) {
						$.each(json.data[0], function(i, v) {
							_self.items.push(v);
						});
					} else{
						_self.items = json.data;
					}					

					_self.isShow = true

					if(pageIndex == 1 && isInit && !json.error && !json.user_notification) {
						isInit = false;
//						setTimeout(function() {
							$('#dropload').dropload({
								scrollArea: window,
								domDown: {
									domClass: 'dropload-down',
									domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
									domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
									domNoData: '<div class="dropload-noData">暂无数据</div>'
								},
								loadDownFn: function(me) {
									pageIndex++;
//									_self.nameSearch(me);
								}
							});
//						}, 500)
					}
					if(dropme != null) {
						dropme.resetload();
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$(".pin-spinner").hide(); //隐藏转圈动画

					var errormsg = "访问异常";

					if(XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
						var json = JSON.parse(XMLHttpRequest.responseText);
						console.log(XMLHttpRequest.responseText)
						errormsg = JSON.parse(json.Message).error;
						if(errormsg == undefined || errormsg == '')
							errormsg = "Http error: " + XMLHttpRequest.statusText;
					}

					toasterextend.showtips(errormsg, "error");
				}
			});
		},
		showMore: function(skipTo) {
			if(skipTo == 0) {
				//	 			location.href = "";
				alert('跳转到哪个页面?');
			}
		}
	}
})