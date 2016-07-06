
    function employee(containerstat, contaninemployees) {
        this.containerstat = $(containerstat);
        this.contaninemployees = $(contaninemployees);
        this.stattemplate = [
        '<div class="m-self-top">',
            '<div class="userimg"><img src="{@if employeepic ==""}../image/cs04.jpg {@else}${employeepic}{@/if}" /></div>',
            '<div class="userinfo">',
                '<span>${employeename}{@if employeerolename != "" && employeerolename != null}(${employeerolename}){@/if}</span><br />',
                '${distributorname}',
            '</div>',
        '</div>',
        '<ul class="m-self-listbox">',
            '<li>',
                '<span>${invitedretailercount}</span><br />',
                '邀请店铺',
            '</li>',
            '<li>',
                '<span aa="aa" num="${sharecount}">${sharecount}</span><br />',
                '分享',
            '</li>',
            '<li>',
                '<span dd="dd" num="${activefanscount}">${activefanscount}</span><br />',
                '留存惠粉',
            '</li>',
            '<li>',
                '<span bb="bb" num="${fansinhistorycount}">${fansinhistorycount}</span><br />',
                '累计惠粉',
            '</li>',
            '<li>',
                '<span cc="cc">${percentageretained}</span><br />',
                '留存',
            '</li>',
        '</ul>'
        ].join('\n');
        this.employeestemplate = [
            '<div class="title">同事(${employeecount})</div>',
			'<ul class="ts-list-w">',
				'{@each employees as item}',
				'<li><img src="{@if item.employeepic !=""}../image/cs04.jpg {@else}${item.employeepic}{@/if}" />${item.username}（${item.rolename}）</li>',
				'{@/each}',
			'</ul>'
        ].join('\n');
    }

employee.prototype.render = function () {
        var stattemplate = this.stattemplate;
        var employeestemplate = this.employeestemplate;
        var containerstat = this.containerstat;
        var contaninemployees = this.contaninemployees;
    $.getJSON2("/webapi/distributor/weixin/employeestat", function (data) {
            var html = juicer(stattemplate, data);
            containerstat.html(html);
            var aa = $('[aa=aa]').attr('num');
            var ab = $('[bb=bb]').attr('num');
		    var dd = $('[dd=dd]').attr('num');
            $('[aa=aa]').text(common.str_pep_num(aa));
            $('[bb=bb]').text(common.str_pep_num(ab));
		    $('[dd=dd]').text(common.str_pep_num(dd));
        });
    $.getJSON2("/webapi/distributor/weixin/employees", function (data) {
            var html = juicer(employeestemplate, data);
            contaninemployees.html(html);
        });
    }
$(function () {
    var s = new invitationfans("container");
    s.render();
    var myself = new employee("#employeestat", "#employees");
    myself.render();
});


