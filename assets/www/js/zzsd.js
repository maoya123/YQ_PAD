function zsjy(){
	var sdrwurl= "/ipad/intopieces/selectZzSD.json";
	var userId = window.sessionStorage.getItem("userId");
	var name=window.sessionStorage.getItem("displayName");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var tb="";
	var head ="<tr>"+                         
	"<th></th>"+                 
	"<th>客户名称</th>"+  
	"<th>产品名称</th>"+
	"<th>申请金额(元)</th>"+
	"<th>证件号码</th>"+
	"<th>申请时间</th>"+
	"<th>审贷结束时间</th>"+
	"<th>客户经理</th>"+ 
	"<th>终审级别</th>"+ 
	"</tr>";
	$.ajax({
		url:wsHost+sdrwurl,
		type: "GET",
		dataType:'json',
		data:{
			userId:userId,
		},
		success: function (json){
			var obj = $.evalJSON(json);
			for(var i = 0;i<obj.size;i++){
				if(obj.result[i].zsw==1){
					tb="主审委";
				}else if(obj.result[i].zsw==0){
					tb="副审委";
				}
				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].productId+"@"+
				obj.result[i].applyQuota+"@"+obj.result[i].customerId+"@"+obj.result[i].id+
				"@"+obj.result[i].zsw+"@"+obj.result[i].chineseName+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].chineseName+"</td>"+
				"<td>"+obj.result[i].productName+"</td>"+
				"<td>"+obj.result[i].applyQuota+"</td>"+
				"<td>"+obj.result[i].cardId+"</td>"+
				"<td>"+obj.result[i].creatime+"</td>"+
				"<td>"+obj.result[i].creatime1+"</td>"+			
				"<td>"+obj.result[i].displayName+"</td>" +
				"<td>"+tb+"</td>" +
				"</tr>"

				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;

			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='myshsp()'/>终审</div>"+  
					"<div class='content' >"+ 
					"<table id='cslb' class='cpTable jjTable' style='text-align:center;'>"+
					
					head+result[page]+
					"</table>"+
					"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
					"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='调查模板' id ='xszlxx'/>"+
					"<input type='button' class='btn btn-large btn-primary' value='影像资料' id ='xsyxzl'/>"+
					"<input type='button' class='btn btn-primary btn-large' value='终审结论' id='csjl'/>"+
					"<input type='button' class='btn btn-large' value='返回' onclick='myshsp()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();   

			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是最后一页");
					window.wxc.xcConfirm("当前已经是最后一页", "info");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#cslb").html(head+result[page]);
				}else{
//					alert("当前已经是第一页");
					window.wxc.xcConfirm("当前已经是第一页", "info");
					page = page+1;
				}
			})

			$("#csjl").click(function() {
				if ($("input[type='radio']").is(':checked')) {

					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.appId = values[3];
					res.customerId = values[2];
					res.productId =values[0];
					res.applyQuota = values[1];
					res.zsw=values[4];
					res.name=window.sessionStorage.getItem("displayName");
					res.userId=window.sessionStorage.getItem("userId");
					xszsjy(res);
				}else{
//					alert("请选择一行");
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			$("#xsyxzl").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.customerId = values[2];
					res.productId =values[0];
					res.applicationId =values[3];
					res.currentLoc ="zsjy()";
					seeimage(res);
				}else{
//					alert("请选择一行");
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
			$("#xszlxx").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					$("#xszlxx").attr('disabled',"true");
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");

					var appId = values[3];
					var res={};
					res.appId = appId;
					res.currentLoc ="zsjy()";
					xszlxx(res);
				}else{
					window.wxc.xcConfirm("请选择一行", "warning");
				}
			})
		}
	})
}





//显示终审信息
function xszsjy(res){
	var sdjyurl="/ipad/intopieces/selecZzSSqxx.json";
	var userId = window.sessionStorage.getItem("userId");
	res.userId=userId;
	var tb1="";
	var tb2="";
	var tb3="";
	var td="";
	var thb="";
	$.ajax({
		url:wsHost+sdjyurl,
		type: "GET",
		dataType:'json',
		data:{
			appId:res.appId,
			pid:res.productId,
			cid:res.customerId,
			sdw:res.zsw,
			userId:userId,
			name:res.name
		},
		success: function (json){  
			var obj = $.evalJSON(json);
			if(obj.IntoPieces!=null){
				thb="1";
				td="<table class='cpTable khjbxx' style='margin-top:5px;'>"+
				"<tr>"+                        
				"<th colspan='4'>主审决审</th>"+  
				"</tr>"+
				/*"<tr>"+
				"<th>审贷委:</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.applyQuota+" disabled='isabled'/></td>"+
				"<th>审贷级别:</th>"+
				"<td><input  type='text' value="+tb1+" disabled='isabled'/></td>"+
				"</tr>"+*/
				"<tr>"+
				"<th>审贷结论:</th>"+
				"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
				"<th>审贷额度(元):</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.applyQuota+" disabled='isabled'/></td>"+
				"</tr>"+
				"<tr>"+
				"<th>期限:</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.customerId+" disabled='isabled'/></td>"+
				"<th>利率(%):</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.chineseName+" disabled='isabled'/></td>"+
				"</tr>"+
				"<tr>"+
				"<th>担保方式:</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.displayName+" disabled='isabled'/></td>"+
				"<th>意见:</th>"+
				"<td> <textarea  disabled='disabled'>"+obj.IntoPieces.cardId+"</textarea></td>"+
				"</tr>"+
				"<tr>"+
				"<th>审贷时间:</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.creatime+" disabled='isabled'/></td>"+
				"</tr>"+
				"</table>"+
				"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
				"<tr >"+                        
				"<th colspan='4' >终审结论</th>"+  
				"</tr>"+
				"<tr>"+
				"<th>审议结论:</th>"+
				"<td><select id ='auditresult' name = 'status'><option value = 'approved'>通过</option>" +
				"<option value = 'refuse'>拒绝</option>" +
				"<option value = 'returnedToFirst'>退回</option>" +
				"</select>"+
				"</td>"+
				
				"<th>审贷级别:</th>"+
				"<td><input type='text' id='zsw' value="+obj.CustomerInfor1.cardId+" disabled='disabled'/>"+
				"</tr>"+
				"<tr>"+
				"<th>授信额度：</th>"+
				"<td><input type='text' id ='decisionAmount' value="+obj.IntoPieces.applyQuota+" disabled='isabled' name='decisionAmount'/>"+
				"</td>"+
				"<th>利率</th>"+
				"<td><input id='decisionRate' type='text' value="+obj.IntoPieces.chineseName+" disabled='isabled' name='decisionRate'/>"+
				"</td>"+
				"</tr>"+
				
				"<tr>"+
				"<th>抵押方式：</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.displayName+" disabled='isabled'/></td>"+
				"<th>期限：</th>"+
				"<td><input  type='text' value="+obj.IntoPieces.customerId+" disabled='isabled'/></td>"+
				"</tr>"+
				"<tr>"+
				"<th>审贷委:</th>"+
				"<td><input  type='text' value='"+obj.CustomerInfor1.chineseName+"'/>"+
				"<th><label id ='reason' for=reason>意见:</label></th>"+
				"<td><textarea name='SDWUSER1YJ' id='SDWUSER1YJ' ></textarea>" +
				"</td>" +
				"</tr>"+
				"<tr style='display :none'>"+
				"<th><label id ='reason' for=reason>原因:</label></th>"+
				"<td><textarea name='decisionRefusereason' id='decisionRefusereason'></textarea>" +
				"</td>" +
				"</tr>"+
				"</table>";
			}else{
				td=	"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
				"<tr >"+                        
				"<th colspan='4' >终审结论</th>"+  
				"</tr>"+
				"<tr>"+
				"<th>审议结论:</th>"+
				"<td><select id ='auditresult' name = 'status'><option value = 'approved'>通过</option>" +
				"<option value = 'refuse'>拒绝</option>" +
				"<option value = 'returnedToFirst'>退回</option>" +
				"</select>"+
				"</td>"+
				
				"<th>审贷级别:</th>"+
				"<td><input type='text' id='zsw' value="+obj.CustomerInfor1.cardId+" disabled='disabled'/>"+
				"</tr>"+
				"<tr>"+
				"<th>授信额度：</th>"+
				"<td><input type='text' id ='decisionAmount' name='decisionAmount'/>"+
				"</td>"+
				"<th>利率</th>"+
				"<td><input id='decisionRate' type='text' name='decisionRate'/>"+
				"</td>"+
				"</tr>"+
				
				"<tr>"+
				"<th>抵押方式：</th>"+
				"<td><select id='dbfs'>" +
				"<option value = '抵押'>抵押</option>" +
				"<option value = '质押'>质押</option>" +
				"<option value = '保证'>保证</option>" +
				"<option value = '信用'>信用</option>" +
				"<option value = '组合(抵押+质押)'>组合(抵押+质押)</option>" +
				"<option value = '组合(抵押+保证)'>组合(抵押+保证)</option>" +
				"<option value = '组合(抵押+信用)'>组合(抵押+信用)</option>" +
				"<option value = '组合(质押+保证)'>组合(质押+保证)</option>" +
				"<option value = '组合(质押+信用)'>组合(质押+信用)</option>" +
				"<option value = '组合(保证+信用)'>组合(保证+信用)</option>" +
				"</select>"+
				"</td>"+
				"<th>期限：</th>"+
				"<td><select id='qx'>" +
				"<option value = '1'>1个月</option>" +
				"<option value = '2'>2个月</option>" +
				"<option value = '3'>3个月</option>" +
				"<option value = '4'>4个月</option>" +
				"<option value = '5'>5个月</option>" +
				"<option value = '6'>6个月</option>" +
				"<option value = '7'>7个月</option>" +
				"<option value = '8'>8个月</option>" +
				"<option value = '9'>9个月</option>" +
				"<option value = '10'>10个月</option>" +
				"<option value = '11'>11个月</option>" +
				"<option value = '12'>12个月</option>" +
				"<option value = '13'>13个月</option>" +
				"<option value = '14'>14个月</option>" +
				"<option value = '15'>15个月</option>" +
				"<option value = '16'>16个月</option>" +
				"<option value = '17'>17个月</option>" +
				"<option value = '18'>18个月</option>" +
				"<option value = '19'>19个月</option>" +
				"<option value = '20'>20个月</option>" +
				"<option value = '21'>21个月</option>" +
				"<option value = '22'>22个月</option>" +
				"<option value = '23'>23个月</option>" +
				"<option value = '24'>24个月</option>" +
				"<option value = '25'>25个月</option>" +
				"<option value = '26'>26个月</option>" +
				"<option value = '27'>27个月</option>" +
				"<option value = '28'>28个月</option>" +
				"<option value = '29'>29个月</option>" +
				"<option value = '30'>30个月</option>" +
				"<option value = '31'>31个月</option>" +
				"<option value = '32'>32个月</option>" +
				"<option value = '33'>33个月</option>" +
				"<option value = '34'>34个月</option>" +
				"<option value = '35'>35个月</option>" +
				"<option value = '36'>36个月</option>" +
				"</select>"+
				"</td>"+
				"</tr>"+
				"<tr>"+
				"<th>审贷委:</th>"+
				"<td><input  type='text' value='"+obj.CustomerInfor1.chineseName+"'/>"+
				"<th><label id ='reason' for=reason>意见:</label></th>"+
				"<td><textarea name='SDWUSER1YJ' id='SDWUSER1YJ' ></textarea>" +
				"</td>" +
				"</tr>"+
				"<tr style='display :none'>"+
				"<th><label id ='reason' for=reason>原因:</label></th>"+
				"<td><textarea name='decisionRefusereason' id='decisionRefusereason'></textarea>" +
				"</td>" +
				"</tr>"+
				"</table>";
			}
			if(obj.sdwinfo1.zsw==1){
				tb1="主审委";
			}else{
				tb1="副审委";
			}
			if(obj.sdwinfo2.zsw==1){
				tb2="主审委";
			}else{
				tb2="副审委";
			}
			if(obj.sdwinfo3.zsw==1){
				tb3="主审委";
			}else{
				tb3="副审委";
			}
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='zsjy()'/>终审结论</div>"+  
					"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+
					"<tr>"+                        
					"<th colspan='4'>客户申请信息</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>客户名称:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.name+" disabled='isabled'/></td>"+
					"<th>申请额度(元):</th>"+
					"<td><input  type='text' value="+obj.customerApplicationInfo.applyQuota+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>申请期限:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.sqqx+" disabled='isabled'/></td>"+
					"<th>贷款用途:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.dkyt+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+                        
					"<th colspan='4'>申请产品信息</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>产品名称:</th>"+
					"<td><input  type='text' value="+obj.producAttribute.productName+" disabled='isabled'/></td>"+
					"<th>产品授信区间:</th>"+
					"<td><input  type='text' value="+obj.producAttribute.prodCreditRange+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>产品基准利率:</th>"+
					"<td><input  type='text' value="+obj.producAttribute.rateRange+" disabled='isabled'/></td>"+
					"<th>产品用途:</th>"+
					"<td><input  type='text' value="+obj.producAttribute.purposeLoan+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+                        
					"<th colspan='4'>客户经理意见信息</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>建议金额:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jyje+" disabled='isabled'/></td>"+
					"<th>建议期限:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jyqx+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>建议产品:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jycp+" disabled='isabled'/></td>"+
					"<th>建议利率:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jylv+" disabled='isabled'/></td>"+
					"</tr>"+
					
					"<tr>"+
					"<th>建议担保人:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jydbr+" disabled='isabled'/></td>"+
					"<th>客户与担保人关系:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.gx+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>建议抵押物:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.jydyw+" disabled='isabled'/></td>"+
					"<th>抵押物物权人:</th>"+
					"<td><input  type='text' value="+obj.SqInfo.wqr+" disabled='isabled'/></td>"+
					"</tr>"+
					"</table>"+
					
					
					
					
					"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
					"<tr>"+                        
					"<th colspan='4'>初审信息</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>初审额度(元)</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.examineAmount+" disabled='isabled'/></td>"+
					"<th>利率:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.examineLv+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.qx+" disabled='isabled'/></td>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.dbfs+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>参与审批客户经理:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.userId_1+" disabled='isabled'/></td>"+
					"<th>参与审批客户经理:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.userId_2+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>辅助客户经理:</th>"+
					"<td><input  type='text' value="+obj.appManagerAuditLog.userId_3+" disabled='isabled'/></td>"+
					"</tr>"+
					"</table>"+
					
					
				"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
					"<tr>"+                        
					"<th colspan='4'>审贷结论一</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>审贷委:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.names+" disabled='isabled'/></td>"+
					"<th>审贷级别:</th>"+
					"<td><input  type='text' value="+tb1+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷结论:</th>"+
					"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
					"<th>审贷额度(元):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.SDJE+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.SDQX+" disabled='isabled'/></td>"+
					"<th>利率(%):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.SDLV+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.dbfs+" disabled='isabled'/></td>"+
					"<th>意见:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.sdwinfo1.SDWUSER1YJ+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷时间:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo1.time+" disabled='isabled'/></td>"+
					"</tr>"+
					
					
					"<tr>"+                        
					"<th colspan='4'>审贷结论二</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>审贷委:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.names+" disabled='isabled'/></td>"+
					"<th>审贷级别:</th>"+
					"<td><input  type='text' value="+tb2+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷结论:</th>"+
					"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
					"<th>审贷额度(元):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.SDJE+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.SDQX+" disabled='isabled'/></td>"+
					"<th>利率(%):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.SDLV+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.dbfs+" disabled='isabled'/></td>"+
					"<th>意见:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.sdwinfo2.SDWUSER1YJ+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷时间:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo2.time+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+                        
					"<th colspan='4'>审贷结论三</th>"+  
					"</tr>"+
					"<tr>"+
					"<th>审贷委:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.names+" disabled='isabled'/></td>"+
					"<th>审贷级别:</th>"+
					"<td><input  type='text' value="+tb3+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷结论:</th>"+
					"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
					"<th>审贷额度(元):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.SDJE+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.SDQX+" disabled='isabled'/></td>"+
					"<th>利率(%):</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.SDLV+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.dbfs+" disabled='isabled'/></td>"+
					"<th>意见:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.sdwinfo3.SDWUSER1YJ+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷时间:</th>"+
					"<td><input  type='text' value="+obj.sdwinfo3.time+" disabled='isabled'/></td>"+
					"</tr>"+
					"</table>"+
					
					td+
					
					
					
				
					"<p>" +
					"<input type='button' class='btn btn-primary btn-large' value='保存' id='save' />" +
					"<input type='button' class='btn btn-large' value='返回' onclick='sdjy()'/>" +
					"</p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#save").click(function(){
				var zsw=$("#zsw").val();
				if(zsw=='主审'){
					zsw="1";
				}else{
					zsw="0";
				}
				var status1=$("#auditresult").val();
		    	var id=res.appId;
		    	var decisionAmount=$("#decisionAmount").val();
		    	var qx=$("#qx").val();
		    	var SDWUSER1YJ=$("#SDWUSER1YJ").val();
		    	var decisionRate=$("#decisionRate").val();
		    	var decisionRefusereason=$("#decisionRefusereason").val();
		    	var cid=res.customerId;
		    	var pid=res.productId;
		    	var userId=res.userId;
		    	var dbfs=$("#dbfs").val();
				
		    	 $.ajax({
		    		 url : wsHost+"/ipad/intopieces/insertsdjy.json?decisionRate="+decisionRate+"&&decisionAmount="+decisionAmount
						+"&&qx="+qx+"&&id="+id+"&&SDWUSER1YJ="+SDWUSER1YJ+"&&decisionRefusereason="+decisionRefusereason
						+"&&status="+status1+"&&dbfs="+dbfs+"&&zsw="+zsw+"&&pid="+pid+"&&cid="+cid+"&&userId="+userId,
						dataType : 'json',
						type : "get",
						success : function(json) {
							var obj = $.evalJSON(json);
							if(obj.message=="提交成功"){
								alert("提交成功");
								zsjy();
							}else{
								alert("提交失败");
							}
						}}); 
			});
			

			$("#auditresult").change(function (){
				var status = $("select[name=status]").val();
				if( status == "approved"){
					
					
					if(thb=="" || thb==null){
						$("tr:eq(36)").show();
						$("tr:eq(37)").show();
						$("tr:eq(39)").hide();
					}else{
						$("tr:eq(41)").show();
						$("tr:eq(42)").show();
						$("tr:eq(44)").hide();
					}
					/*if($("input[name=decision_amount]").val() == ""){
						$("input[name='decision_amount']").after("<label class='error myerror' generated='true' >金额不能为空</label>");   
					}
					if($("input[name=decision_rate]").val() == ""){
						$("input[name='decision_rate']").after("<label class='error myerror'generated='true' >利率不能为空</label>");   
					}*/
				}

				if( status == "refuse"){
					
					
					if(thb=="" || thb==null){
					$("tr:eq(36)").hide();
					$("tr:eq(37)").hide();
					$("tr:eq(39)").show();
					}else{
						$("tr:eq(41)").hide();
						$("tr:eq(42)").hide();
						$("tr:eq(44)").show();
					}
				/*	if($("textarea[name=decision_refusereason]").val() == ""){
						$("textarea[name='decision_refusereason']").after("<label class='error myerror' generated='true' >拒绝原因不能为空</label>");   
					}*/
				}

				if( status == "returnedToFirst"){
					if(thb=="" || thb==null){
						$("tr:eq(36)").hide();
						$("tr:eq(37)").hide();
						$("tr:eq(39)").show();
						}else{
							$("tr:eq(41)").hide();
							$("tr:eq(42)").hide();
							$("tr:eq(44)").show();
						}
				}

				if(status =='returnedToFirst'){
					$("#decisionRefusereason").text("退回原因");	
				}else{
					$("#decisionRefusereason").text("拒绝原因");	
				} 
			});

		},
		error: function(){
//			alert("请求超时");
			window.wxc.xcConfirm("请求超时", "error");
		}
	})
}