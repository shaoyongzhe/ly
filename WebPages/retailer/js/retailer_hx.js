var isInit = true;
var myApp = new Vue({
	el: ".doorBox",
	data: {
		items: [],
		isShow: false,
		pageIndex: 1
	},
	mounted: function() {
		this.nameSearch();
	},
	methods: {
		nameSearch: function(dropme) {
			var _self = this;
			$.ajax({
				type: 'GET',
				dataType: 'json',
				data: { pageindex: _self.pageIndex },
				beforeSend: function () { _self.pageIndex == 1 ? common.loading.show() : "" },
            	complete: function () { _self.pageIndex == 1 ? common.loading.hide() : "" },
//				url: "/retailer/data/mdVerifyRecord.json",
				url: '/webapi/retailer/weixin/verify/history/',
				success: function(json) {
					common.loading.hide();//隐藏转圈动画

	                json = json || {};   /* 统一加这句话 */
	
	                if (jQuery.isEmptyObject(json)) {
	                    dealdropme(dropme);
	                    return;
	                }
	
	                if (json.error) {
	                    toasterextend.showtips(json.error, "error");
	                    return;
	                }
	                if (json.user_notification) {
	                    toasterextend.showtips(json.user_notification, "info");
	                    return;
	                }
	
	                if ($.isFunction(wxjsshare)) {
	                    wxjsshare(json.share || {});
	                }
	                if (_self.pageIndex != 1) {
	                    $.each(json.data, function (i, v) {
	                        _self.items.push(v);
//	                        _self.items = data;
	                    });
	                } else{
	                	 _self.items = json.data;
	                }
	                
					_self.isShow = true;
					
					if (_self.pageIndex == 1 && isInit && !json.error && !json.user_notification) {
	                    isInit = false;
	                    setTimeout(function () {
	                        $('#list').dropload({
	                            scrollArea: window,
	                            domDown: {
	                                domClass: 'dropload-down',
	                                domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
	                                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
	                                domNoData: '<div class="dropload-noData">暂无数据</div>'
	                            },
	                            loadDownFn: function (me) {
	                                _self.pageIndex++;
	                                _self.nameSearch(me);
	                            }
	                        });
	                    }, 500)
	                }
	                if (dropme != null) {
	                    dropme.resetload();
	                }
	
	                $("#div_qrcode").css("display", "block")
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
	                $(".pin-spinner").hide();//隐藏转圈动画
	
	                var errormsg = "访问异常";
	
	                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
	                    var json = JSON.parse(XMLHttpRequest.responseText);
	                    errormsg = JSON.parse(json.Message).error;
	                    if (errormsg == undefined || errormsg == '')
	                        errormsg = "Http error: " + XMLHttpRequest.statusText;
	                }
	
	                toasterextend.showtips(errormsg, "error");
	            }
			});
	 	},
	 	showMore:function(skipTo){
	 		if(skipTo == 0){
//	 			location.href = "";
	 			alert('跳转到哪个页面?');
	 		}
	 	}
	}
})