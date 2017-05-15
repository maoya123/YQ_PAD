function khysxx(){
	var userId=window.sessionStorage.getItem("userId");
	var userType=window.sessionStorage.getItem("userType");
	var head ="<tr>"+  
	"<th></th>"+  
	"<th>客户姓名</th>"+
	"<th>证件号码</th>"+
	"<th>产品名称</th>"+
	"<th>申请金额</th>"+
	"<th>进件状态</th>"+
	"<th>所属客户经理</th>"+
	"</tr>";
	var wsLoginUrl = "/ipad/custAppInfo/khysxxck.page?userId="+userId+"&userType="+userType;
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	$.ajax({
		type:"GET",
		url:wsHost+wsLoginUrl,
		dataType:"json",
		success:function(json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				tmp=tmp+"<tr id = 'cslb' onclick='check(this)'>"+ "<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result.items[i].id+"@"+obj.result.items[i].customerId+"@"+
				obj.result.items[i].tyCustomerId+"@"+obj.result.items[i].cardId+"@"+obj.result.items[i].chineseName+"'/>"+"</span></td>"+
				"<td>"+obj.result.items[i].chineseName+"</td>"+
				"<td>"+obj.result.items[i].cardId+"</td>"+
				"<td>"+obj.result.items[i].productName+"</td>"+
				"<td>"+obj.result.items[i].applyQuota+"</td>"+
				"<td>"+obj.result.items[i].statusName+"</td>"+
				"<td>"+obj.result.items[i].displayName+"</td>"+
				"</tr>"
				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='editUser()'/>客户原始信息</div>"+  
					"<div class='content'>"+
					"<table class='cpTable' id='cslb' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					"<p>"+
					"<input type='button' class='btn btn-large btn-primary' value='查看原始信息'  id = 'ysxx'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='查看影像资料' id = 'yxzl'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick = 'editUser()' id = 'fh'/>"+
					"</p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#ysxx").click(function(){
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res = {};
					 res.id = values[0];
					 res.customerId = values[1];
					 res.tyCustomerId = values[2];
					 res.name = values[4];
					 ckysxx(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			});
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			});
			$("#syy").click(function(){
				page=page-1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			});
			$("#yxzl").click(function(){
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res = {};
					 res.id = values[0];
					 res.customerId = values[1];
					 res.tyCustomerId = values[2];
					 res.cardId=values[3];
					 ysyxzl(res)
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
		}
	});
}
function ckysxx(res){
	if(res.tyCustomerId==null || res.tyCustomerId==""){
		window.wxc.xcConfirm("原始信息尚未同步,请等待!!!", "warning");
	}else{
		var wsLoginUrl="/ipad/custAppInfo/showInfoJn.page?id="+res.tyCustomerId;
		$.ajax({
			type:"GET",
			url:wsHost+wsLoginUrl,
			dataType:"json",
			success:function(json){
				var obj = $.evalJSON(json);
				if(obj.customerInfor.levelcal==null || obj.customerInfor.levelcal==""){
					obj.customerInfor.levelcal="无";
				}
				if(obj.customerInfor.sfhz==null || obj.customerInfor.sfhz==""){
					obj.customerInfor.sfhz="无";
				}
				
				if(obj.customerInfor.jtdh==null || obj.customerInfor.jtdh==""){
					obj.customerInfor.jtdh="无";
				}
				
				if(obj.customerInfor.sj==null || obj.customerInfor.sj==""){
					obj.customerInfor.sj="无";
				}
				
				if(obj.customerInfor.hjdz==null || obj.customerInfor.hjdz==""){
					obj.customerInfor.hjdz="无";
				}
				
				if(obj.customerInfor.gtspmc==null || obj.customerInfor.gtspmc==""){
					obj.customerInfor.gtspmc="无";
				}
				
				if(obj.customerInfor.dqrq==null || obj.customerInfor.dqrq==""){
					obj.customerInfor.dqrq="无";
				}
				
				if(obj.customerInfor.xxdz==null || obj.customerInfor.xxdz==""){
					obj.customerInfor.xxdz="无";
				}
				
				if(obj.customerInfor.hyzk==null || obj.customerInfor.hyzk==""){
					obj.customerInfor.hyzk="无";
				}else if(obj.customerInfor.hyzk=="0"){
					obj.customerInfor.hyzk="未婚";
				}else if(obj.customerInfor.hyzk=="1"){
					obj.customerInfor.hyzk="已婚";
				}else if(obj.customerInfor.hyzk=="2"){
					obj.customerInfor.hyzk="丧偶";
				}else if(obj.customerInfor.hyzk=="3"){
					obj.customerInfor.hyzk="离婚";
				}else{
					obj.customerInfor.hyzk="无";
				}
				
				 if(obj.customerInfor.xb=="1"){
					obj.customerInfor.xb="男";
				}else if(obj.customerInfor.xb=="2"){
					obj.customerInfor.xb="女";
				}
				$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khysxx()'/>客户原始信息</div>"+  
						"<div class='content'>"+
						"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
						"<tr>"+                        
						"<th colspan='4'>"+res.name+"基本信息</th>"+  
						"</tr>"+
						"<tr>"+
						"<th>客户初始ID:</th>"+
						"<td><input  type='text' value='"+obj.customerInfor.khh+"' disabled='isabled'/></td>"+
						"<th>客户名称:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.khmc+" disabled='isabled'/></td>"+
						"</tr>"+
						"<tr>"+
						"<th>证件类型:</th>"+
						"<td><input  type='text' value='身份证' disabled='isabled'/></td>"+
						"<th>证件号码:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.zjhm+" disabled='isabled'/></td>"+
						"</tr>"+
						"<tr>"+
						"<th>性别:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.xb+" disabled='isabled'/></td>"+
						"<th>民族:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.zjhm+" disabled='isabled'/></td>"+
						"</tr>"+
						"<tr>"+
						"<th>婚姻状况:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.hyzk+" disabled='isabled'/></td>"+
						"<th>出生日期:</th>"+
						"<td> <textarea  disabled='disabled'>"+obj.customerInfor.csrq+"</textarea></td>"+
						"</tr>"+
						"<tr>"+
						"<th>住址:</th>"+
						"<td> <textarea  disabled='disabled'>"+obj.customerInfor.xxdz+"</textarea></td>"+
						"<th>有效期限:</th>"+
						"<td><input  type='text' value="+obj.customerInfor.dqrq+" disabled='isabled'/></td>"+
						"</tr>"+
						"<tr>"+
						"<th>工作单位名称:</th>"+
						"<td> <textarea  disabled='disabled'>"+obj.customerInfor.gtspmc+"</textarea></td>"+
						"<th>户籍地址:</th>"+
						"<td> <textarea  disabled='disabled'>"+obj.customerInfor.hjdz+"</textarea></td>"+
						"</tr>"+
						"<tr>"+
						"<th>联系方式(手机):</th>"+
						"<td><input  type='text' value="+obj.customerInfor.sj+" disabled='isabled'/></td>"+
						"<th>联系方式(固话):</th>"+
						"<td><input  type='text' value="+obj.customerInfor.jtdh+" disabled='isabled'/></td>"+
						"</tr>"+
						"<tr>"+
						"<th>是否户主:</th>"+
						"<td><input  type='text' value='"+obj.customerInfor.sfhz+"' disabled='isabled'/></td>"+
						"<th>评级结果（对应评级的信用等级）:</th>"+
						"<td><input  type='text' value='"+obj.customerInfor.levelcal+"' disabled='isabled'/></td>"+
						"</tr>"+
						"</table>"+
				"</div>");
				$(".right").hide();
				$("#mainPage").show();
			}});
	}
}


function ysyxzl(obj){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khysxx()'/>图集预览</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	var url="/ipad/custAppInfo/selectBycardId.page?cardId="+obj.cardId;
	$.ajax({
		type:"GET",
		url:wsHost+url,
		dataType:"json",
		success:function(json){
			var obj = $.evalJSON(json);
			var td="";
			for(var i=0;i<obj.size;i++){
				td=td+  "<a href='data:image/png;base64,"+obj.result[i].uri+"'  data-type='image'>"+
		        "<img src='data:image/png;base64,"+obj.result[i].uri+"' style='width:400px;height:200px;padding-left:3px;' border='0'/>"+
		        "</a>";
			}
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khysxx()'/>图集预览</div>"+ 
					"<div class='plusview' style='margin-top:140px'>"+
		    "<ul>"+
		   " </li>"+
		    td+
		    "</li>"+   " </ul>"+
		"</div>");
			$(".right").hide();
			$("#mainPage").show(); 
			$(function(){
				$('.plusview').plusview();
			});
		}})
}