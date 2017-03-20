
var myApp = new Vue({
	el: ".myCon",
	data: {
		items: '',
		isShow: false,
		itemsVal:[]
	},
	mounted: function() {
		var s = new invitationfans("container");
    	s.render(wxjsshare);
		this.nameSearch(wxjsshare);
	},
	methods: {
		nameSearch: function(sharefunction) {
			common.loading.show();
			var _self = this;
			var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket" };
	        if (wxjsconfig.sharekey != null)
	            ajaxdata[wxjsconfig.sharekey] = "_";
	        var activity_id = common.getUrlParam('activity_id');

            $.ajax({
                type: 'GET',
                dataType: 'json',
                beforeSend: function () { common.loading.show(); },
                complete: function () { common.loading.hide(); },
                data: ajaxdata,
                url: "/webapi/distributor/weixin/activities/" + activity_id + "/ticket",
//				url: "/retailer/data/mdTickeDetails.json",
                success: function (json) {
                	console.log(json);
                    common.loading.hide();//隐藏转圈动画

                    json = json || {};   /* 统一加这句话 */
                    if (json.error) {
                        toasterextend.showtips(json.error, "error");
                        return;
                    }
                    if (json.user_notification) {
                        toasterextend.showtips(json.user_notification, "info");
                        return;
                    }

                    _self.isShow = json.data.length > 0
		            _self.items = json.data;
		            if ($.isFunction(sharefunction)) {
		                var share = json.share || {};
		                sharefunction($.extend(share, { activity_id: activity_id }));
		            }
                    $.each(json.data[0].items, function(i,o) {
                    	_self.itemsVal.push(o);
                    });
//                  if (json.data[0].activitystate != '已生效') {
//                      $("#title-right").css("background", " rgba(51,51,51,.9)");
//                      $(".div-list .div-top .li-img p").addClass("p_css1")
//                  }
//                  else {
//                      $("#title-right").css("background", " rgba(220,0,0,.8)");
//                      $(".div-list .div-top .li-img p").addClass("p_css2")
//                  }
//                  
//                  $("#div_qrcode").css("display", "block")
					
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    common.loading.hide();//隐藏转圈动画

                    var errormsg = "访问异常";
//					console.log(XMLHttpRequest.status,XMLHttpRequest.responseText);
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