$(function () {
	$("#loginBtn").click(function () {
		$.ajax({
			type: 'POST',
			url: '/webapi/auditplatform/audit/login',
			data: {
				username: $("#username").val(),
				password: $("#password").val()
			},
			success: function (msg) {
				console.log(msg);
				if (msg.error != undefined) {
					alert(msg.error);
				} else {

					window.location.href = "/html/hd-shenhe.html";
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 4)
					alert("网络异常");
			}
		});
	});
});
