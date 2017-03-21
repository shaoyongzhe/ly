
var myApp = new Vue({
	el: ".myCon",
	data: {
		items: '',
		isShow: false,
		itemsVal:[]
	},
	mounted: function() {
		this.nameSearch();
	},
	methods: {
		nameSearch: function(dropme) {
			var _self = this;
			var activity_id = "";
            var urlinfo = window.location.href; //获取当前页面的url

            var len = urlinfo.length;//获取url的长度
            var offset = urlinfo.indexOf("?");//设置参数字符串开始的位置
            if (offset != -1) {
                var newsidinfo = urlinfo.substr(offset, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
                var newsids = newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
                activity_id = newsids[1];//得到参数值
            }
//          if (activity_id != "") {
//              $("#hreffans").attr("href", $("#hreffans").attr("href") + "?activity_id=" + activity_id);
//          }

            var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket" };
            if (wxjsconfig.sharekey != null)
                ajaxdata[wxjsconfig.sharekey] = "_";

            $.ajax({
                type: 'GET',
                dataType: 'json',
                beforeSend: function () { common.loading.show(); },
                complete: function () { common.loading.hide(); },
                data: ajaxdata,
                url: '/webapi/retailer/weixin/activities/' + activity_id + "/ticket",
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

                    if ($.isFunction(wxjsshare)) {
                        wxjsshare(json.share || {});
                    }
                    
                    _self.items = json.data;
                    _self.isShow = true;
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