function spjlxy(id){
	var jjcxurl="/ipad/intopieces/findApproveHistoryById.page";
	var tmp ="";
	var head ="<tr>"+                             
	"<th>序号</th>"+  
	"<th>节点名称</th>"+
	"<th>审核结果</th>"+
	"<th>审核时间</th>"+
	"<th>审核金额</th>"+
	"<th>审核人</th>"+
	"</tr>";
	$.ajax({
		url:wsHost+jjcxurl,
		type: "GET",
		dataType:'json',
		data:{
			id:id,
		},
		success: function (json) {
			obj = $.evalJSON(json);
			for(var i=0;i<obj.size;i++){
				tmp=tmp+"<tr><td>"+i+1+"</td>"+
				"<td>"+obj.historyForms[i].statusName+"</td>"+
				"<td>"+obj.historyForms[i].examineResult+"</td>"+
				"<td>"+obj.historyForms[i].startExamineTime+"</td>"+
				"<td>"+obj.historyForms[i].examineAmount+"</td>"+
				"<td>"+obj.historyForms[i].displayName+"</td></tr>";
			}
			  $("#text").html("<div class='display-div' >"+
                      "<div class='dialog-head'>"+
                         "<h4>审批记录</h4>"+
                      "</div>"+
                      "<div class='dialog-content'>"+
  					"<table class='cpTable'  style='text-align:center;'>"+
  					"<colgroup>"+
  					" <col width='10%' />"+
  					" <col width='20%' />"+
  					" <col width='15%' />"+
  					" <col width='15%' />"+
  					" <col width='20%' />"+
  					" <col width='20%' />"+
  					"</colgroup>"+
  					head+
  					"<colgroup>"+
  					" <col width='10%' />"+
  					" <col width='20%' />"+
  					" <col width='15%' />"+
  					" <col width='15%' />"+
  					" <col width='20%' />"+
  					" <col width='20%' />"+
  					"</colgroup>"+
  					tmp+
  					"</table>"+
  			"</div>"+
                      "<div class='dialog-bottom'>"+
                         "<button type='button' class='btn btn-danger' onclick='hide_dcts()'>确定</button>"+
                      "</div>"+
                  "</div><!-- /display-div -->");
			  	$("#text").animate({top:"0px"},"500");
		}})
}



function sdhjy(id,pid,cid){
	var jjcxurl="/ipad/intopieces/findAuditConfigureFormById.page";
	var tmp ="";
	var th="";
	var td="";
	var th1="";
	var tmp1 ="";
	var td1="";
	$.ajax({
		url:wsHost+jjcxurl,
		type: "GET",
		dataType:'json',
		data:{
			id:id,
			pid:pid,
			cid:cid
		},
		success: function (json) {
			obj = $.evalJSON(json);
			if(obj.bss.status!="无数据"){
			for(var i=0;i<obj.bsssize;i++){
				if(obj.bss[i].zsw==1){
					th1="<td><input  type='text' value='主审委' disabled='isabled'/></td>";
				}else{
					th1="<td><input  type='text' value='副审委' disabled='isabled'/></td>";
				}
				if(obj.bss[i].status=="通过"){
					td1="<th>决审结论:</th>"+
					"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
					"<th>审贷额度(元):</th>"+
					"<td><input  type='text' value="+obj.bss[i].applyQuota+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.bss[i].spqx+" disabled='isabled'/></td>"+
					"<th>利率(%):</th>"+
					"<td><input  type='text' value="+obj.bss[i].splv+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.bss[i].dbfs+" disabled='isabled'/></td>"+
					"<th>意见:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.bss[i].beizhu+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>决审时间:</th>"+
					"<td><input  type='text' value='"+obj.bss[i].creatime+"' disabled='isabled'/></td>"+
					"</tr>";
				}else{
					td1="<th>决审结论:</th>"+
					"<td><input  type='text' value='"+obj.bss[i].status+"' disabled='isabled'/></td>"+
					"</tr>"+
					"<th>意见:</th>"+
					"<td><input  type='text' value="+obj.bss[i].beizhu+" disabled='isabled'/></td>"+
					"<th>原因:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.bss[i].jjyy+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>决审时间:</th>"+
					"<td><input  type='text' value='"+obj.bss[i].creatime+"' disabled='isabled'/></td>"+
					"</tr>";
				}
				tmp1=tmp1+"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
				"<tr>"+                        
				"<th colspan='4'>决审结论</th>"+  
				"</tr>"+
				"<tr>"+
				"<th>决审人:</th>"+
				"<td><input  type='text' value="+obj.bss[i].displayName+" disabled='isabled'/></td>"+
				"<th>决审级别:</th>"+
				th1+
				"</tr>"+
			td1+
				"</table>";
			}	
			}	
				
				
				
				
				
				
			for(var i=0;i<obj.resultsize;i++){
				
				if(obj.result[i].zsw==1){
					th="<td><input  type='text' value='主审委' disabled='isabled'/></td>";
				}else{
					th="<td><input  type='text' value='副审委' disabled='isabled'/></td>";
				}
				if(obj.result[i].status=="通过"){
					td="<th>审贷结论:</th>"+
					"<td><input  type='text' value='通过' disabled='isabled'/></td>"+
					"<th>审贷额度(元):</th>"+
					"<td><input  type='text' value="+obj.result[i].applyQuota+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>期限:</th>"+
					"<td><input  type='text' value="+obj.result[i].spqx+" disabled='isabled'/></td>"+
					"<th>利率(%):</th>"+
					"<td><input  type='text' value="+obj.result[i].splv+" disabled='isabled'/></td>"+
					"</tr>"+
					"<tr>"+
					"<th>担保方式:</th>"+
					"<td><input  type='text' value="+obj.result[i].dbfs+" disabled='isabled'/></td>"+
					"<th>意见:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.result[i].beizhu+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷时间:</th>"+
					"<td><input  type='text' value='"+obj.result[i].creatime+"' disabled='isabled'/></td>"+
					"</tr>"
					;
				}else{
					td="<th>审贷结论:</th>"+
					"<td><input  type='text' value='"+obj.result[i].status+"' disabled='isabled'/></td>"+
					"</tr>"+
					"<th>意见:</th>"+
					"<td><input  type='text' value="+obj.result[i].beizhu+" disabled='isabled'/></td>"+
					"<th>原因:</th>"+
					"<td> <textarea  disabled='disabled'>"+obj.result[i].jjyy+"</textarea></td>"+
					"</tr>"+
					"<tr>"+
					"<th>审贷时间:</th>"+
					"<td><input  type='text' value='"+obj.result[i].creatime+"' disabled='isabled'/></td>"+
					"</tr>"
					;
				}
				tmp=tmp+"<table class='cpTable khjbxx' style='margin-top:5px;'>"+
				"<tr>"+                        
				"<th colspan='4'>审贷结论</th>"+  
				"</tr>"+
				"<tr>"+
				"<th>审贷委:</th>"+
				"<td><input  type='text' value="+obj.result[i].displayName+" disabled='isabled'/></td>"+
				"<th>审贷级别:</th>"+
				th+
				"</tr>"+
			td+
				"</table>";
			}
		
			
			
			
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='jjxxlb()'/>审贷会纪要</div>"+  
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
					"</table>"
					+tmp+
					tmp1+
					"</div>");
			$(".right").hide();
			$("#mainPage").show();
			
			
			
			
			
			
			
			
			
			
			
			
		}})
}