//客户经理日报
function khjlrbgl(){
	var aaa="";
	var th="";
	var khjirburl ="/ipad/dailyAccount/browse.json";
	var userId = window.sessionStorage.getItem("userId"); 
	$.get(wsHost+khjirburl,{userId:userId},callbackInfor);
	function callbackInfor(json){
		var obj = $.evalJSON(json);
		var tmp ="";
		var result={};
		var page=1;
		var j = 1;
		var head= "<tr>"+                             
		"<th></th>"+  
		"<th>客户经理</th>"+
		"<th>周几</th>"+
		"<th>周报名称</th>"+
		"<th>创建时间</th>"+
		"<th>修改时间</th>"+
		"</tr>";
		for(var i=0;i<obj.resultsize;i++){
			tmp+="<tr onclick='check(this)'>"+    
			"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+obj.result[i].displayName+"@"+
			obj.result[i].whatDay+"@"+obj.result[i].tomorrowplan+"@"+obj.result[i].todayplan+
			"@"+obj.result[i].modifiedTime+"'/>"+"</span></td>"+
			"<td>"+obj.result[i].displayName+"</td>"+
			"<td>"+obj.result[i].whatDay+"</td>"+
			"<td>"+obj.result[i].title+"</td>"+
			"<td>"+obj.result[i].createdTime+"</td>"+
			"<td>"+obj.result[i].modifiedTime+"</td>"+
			"</tr>";
			if((i+1)%5==0){
				result[j]=tmp;
				j++;
				tmp="";
			}

		}
		if(obj.resultModel!=null &&obj.resultModel!="" ){
			for(var i=0;i<obj.size;i++){
				aaa=aaa+"<option id='userId' value ='"+obj.resultModel[i].userId+"'>"+obj.resultModel[i].name+"</option>";
			}
			th="<select id ='qtkhjlrb'  onchange='qtkhjlrb(this)'><option value = '0'>其他客户经理</option>"+
			aaa+
			"</select>";
		}
		result[j]=tmp;
		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>客户经理日报" +
				th+
				"</div>"+  
				"<div class='content'>" +
				"<table class='cpTable' id='rblb' style='text-align:center;'>"+
				head+result[page]+ 
				"</table>"+
				"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
				"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='修改' id ='xgrb'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='查看' id ='ckrb'/>"+
				/*"<input type='button' class='btn btn-large' value='返回' onclick='mywdsy()'/></p>"+*/
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		  $("#back").click(function(){
			  $("#back").attr('disabled',"true");
			  mywdjh();
		  });
		$("#xyy").click(function(){
			page=page+1;
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
				alert("当前已经是最后一页");
				page=page-1;
			}
		})
		$("#syy").click(function(){
			page=page-1; 
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
				alert("当前已经是第一页");
				page = page+1;
			}
		})

		$("#xgrb").click(function(){
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var resu={};
			resu.rbId =values[0];
			resu.tomorrowplan =values[3];
			resu.todayplan =values[4];
			xgkhrb(resu);

		})
		$("#ckrb").click(function(){
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var resu={};
			resu.rbId =values[0];
			resu.tomorrowplan =values[3];
			resu.todayplan =values[4];
			xsrbxx(resu);

		})
	}
}
var ObjId="";
function qtkhjlrb(){
	if(ObjId==""){
		ObjId=	$("#qtkhjlrb").val();
	}
	var khjirburl ="/ipad/dailyAccount/browse.json";
	$.get(wsHost+khjirburl,{userId:ObjId},callbackInfor);
	function callbackInfor(json){
		var obj = $.evalJSON(json);
		var tmp ="";
		var result={};
		var page=1;
		var j = 1;
		var head= "<tr>"+                             
		"<th></th>"+  
		"<th>客户经理</th>"+
		"<th>周几</th>"+
		"<th>周报名称</th>"+
		"<th>创建时间</th>"+
		"<th>修改时间</th>"+
		"</tr>";
		for(var i=0;i<obj.resultsize;i++){
			tmp+="<tr onclick='check(this)'>"+    
			"<td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+obj.result[i].displayName+"@"+
			obj.result[i].whatDay+"@"+obj.result[i].tomorrowplan+"@"+obj.result[i].todayplan+
			"@"+obj.result[i].modifiedTime+"'/>"+"</span></td>"+
			"<td>"+obj.result[i].displayName+"</td>"+
			"<td>"+obj.result[i].whatDay+"</td>"+
			"<td>"+obj.result[i].title+"</td>"+
			"<td>"+obj.result[i].createdTime+"</td>"+
			"<td>"+obj.result[i].modifiedTime+"</td>"+
			"</tr>";

			if((i+1)%5==0){
				result[j]=tmp;
				j++;
				tmp="";
			}

		}
		result[j]=tmp;
		window.scrollTo(0,0);//滚动条回到顶端
		$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>"+obj.result[0].displayName+"日报" +
				"</div>"+  
				"<div class='content'>" +
				"<table class='cpTable' id='rblb' style='text-align:center;'>"+
				head+result[page]+ 
				"</table>"+
				"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' />"+
				"<input type='button' class='btn btn-large btn-primary' value='下一页' id = 'xyy'/>"+
				"<input type='button' class='btn btn-large btn-primary' value='查看' id ='ckrb'/>"+
				"<input type='button' class='btn btn-large' value='返回' onclick='khjlrbgl()'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		  $("#back").click(function(){
			  $("#back").attr('disabled',"true");
			  khjlrbgl();
		  });
		$("#xyy").click(function(){
			page=page+1;
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
				alert("当前已经是最后一页");
				page=page-1;
			}
		})
		$("#syy").click(function(){
			page=page-1; 
			if(result[page]){
				$("#rblb").html(head+result[page]);
			}else{
				alert("当前已经是第一页");
				page = page+1;
			}
		})

		$("#ckrb").click(function(){
			var values =$('input[name="checkbox"]:checked').attr("value").split("@");
			var resu={};
			resu.rbId =values[0];
			resu.tomorrowplan =values[3];
			resu.todayplan =values[4];
			xsrbxx1(resu,ObjId,obj.result[0].displayName);

		})
	}
}


function xsrbxx1(resu,ObjId,name){

	$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>"+name+"日报</div>"+  
			"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+//审核审批任务信息
			"<tr>"+                        
			"<th colspan='4'>今日工作内容</th></tr>"+ 
			"<tr>"+
			"<td><textarea name='todayplan' id='todayplan' style='height:200px' disabled='disabled'>"+resu.todayplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>今日工作内容：</b>（工作地点、工作内容明细、工作总结与感悟等）。</h3></td></tr>"+

			"<tr>"+                        
			"<th colspan='4'>明日工作安排</th></tr>"+ 
			"</tr>"+
			"<td><textarea name='tomorrowplan' id='tomorrowplan' style='height:200px' disabled='disabled'>"+resu.tomorrowplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>明日工作计划：</b>（工作计划区域、计划工作事项、业务目标等）。</h3></td></tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-large' value='返回' onclick='qtkhjlrb()'/>" +
			"</p>"+
	"</div>");
	$("#back").click(function(){
		qtkhjlrb();
	})



}







//显示日报信息

function xsrbxx(resu){

	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjlrbgl()'/>客户经理日报</div>"+  
			"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+//审核审批任务信息
			"<tr>"+                        
			"<th colspan='4'>今日工作内容</th></tr>"+ 
			"<tr>"+
			"<td><textarea name='todayplan' id='todayplan' style='height:200px' disabled='disabled'>"+resu.todayplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>今日工作内容：</b>（工作地点、工作内容明细、工作总结与感悟等）。</h3></td></tr>"+

			"<tr>"+                        
			"<th colspan='4'>明日工作安排</th></tr>"+ 
			"</tr>"+
			"<td><textarea name='tomorrowplan' id='tomorrowplan' style='height:200px' disabled='disabled'>"+resu.tomorrowplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>明日工作计划：</b>（工作计划区域、计划工作事项、业务目标等）。</h3></td></tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-large' value='返回' onclick='khjlrbgl()'/>" +
			"</p>"+
	"</div>");
}

function xgkhrb(resu){
	var rbxgurl="/ipad/dailyAccount/update.json";
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khjlrbgl()'/>客户经理日报</div>"+  
			"<div class='content'>" +
			"<table class='cpTable khjbxx' style='margin-top:20px;'>"+//审核审批任务信息
			"<tr>"+                        
			"<th colspan='4'>今日工作内容</th></tr>"+ 
			"<tr>"+
			"<td><textarea name='todayplan' id='todayplan' style='height:200px'>"+resu.todayplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>今日工作内容：</b>（工作地点、工作内容明细、工作总结与感悟等）。</h3></td></tr>"+

			"<tr>"+                        
			"<th colspan='4'>明日工作安排</th></tr>"+ 
			"</tr>"+
			"<td><textarea name='tomorrowplan' id='tomorrowplan' style='height:200px'>"+resu.tomorrowplan+"</textarea>"+
			"</tr>"+
			"<tr><td colspan='4'><h3><b>明日工作计划：</b>（工作计划区域、计划工作事项、业务目标等）。</h3></td></tr>"+

			"</table>"+
			"<p>" +
			"<input type='button' class='btn btn-primary btn-large' value='保存' id='save' />" +
			"<input type='button' class='btn btn-large' value='返回' onclick='khjlrbgl()'/>" +
			"</p>"+
	"</div>");

	$("#save").click(function(){
		$.ajax({
			url:wsHost+rbxgurl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				userId:window.sessionStorage.getItem("userId"),
				todayplan:$("#todayplan").val(),
				tomorrowplan:$("#tomorrowplan").val(),
				id:resu.rbId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
				alert(obj.message);
				if(obj.success=="true"){
					khjlrbgl();
				}
			}
		})
	})


}
