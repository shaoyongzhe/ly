function loadingStart(){
	$(document.body).css({//禁用滚动条
	   "overflow-x":"hidden",
	   "overflow-y":"hidden"
	});
	$("body").prepend("<div class='loadingDiv'><img src='img/loading.gif' class='loadingImg'></div>");
//	$("body").prepend("<div class='loadingDiv'><img src='img/loading.png' class='loadingImg'></div>");
}

function loadintEnd(){
	$(document.body).css({//启用滚动条
		"overflow-x":"auto",
		"overflow-y":"auto"
	});			
	$(".loadingDiv").remove();
}

