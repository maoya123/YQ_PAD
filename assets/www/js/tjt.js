//个人统计图
function tjt(){
	var objs;
	var td;
	var th="";
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>客户经理月季统计图</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	var url=wsHost+"/ipad/addIntoPieces/userTj.json?userId="+window.sessionStorage.getItem("userId")+"&year=0";
	$.ajax({
		url:url,
		type: "GET",
		dataType:'json',
		success: function (json) {
			
			 objs = $.evalJSON(json);
			 for(var i=0;i<objs.yearsize;i++){
				 td=td+"<option value = '"+objs.year[i].customeryeah+"'>"+objs.year[i].customeryeah+"</option>";
			 }
			 if(objs.resultModel!=null && objs.resultModel!=""){
				 th="<input type='button' class='btn btn-large btn-primary' value='查看团队/小组成员月季统计图' id = 'team' />";
			 }
		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>"+objs.result[0].customeryeah+"月季统计图"+
				"<select id ='customeryeah'  onchange='qtnf(this)'><option value = '0'>其他年份</option>"+
				td+
				"</select>"+
				"</div>"+ 
				"<div class='content'>" +
				"<div class='zingchartt' id='container' ></div>"+
				"<p>"+
				th+
				//"<input type='button' class='btn btn-large btn-primary' value='月度用信额度状况统计' id = 'zedtj' />"+
				"<input type='button' class='btn btn-large' value='返回' onclick='mywdsy()'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		$("#team").click(function(){
			team(objs);
		});
		$("#zedtj").click(function(){
			 zingchart.render({ 
				            id: "container",    
				            height: 500,       
				            width: 700,        
				            data: chartData2
				        });
		});
		
		var chartData2 = {
				"type": "bar", 
				"series": [ 
				           {"text":"用信额度","values":[objs.result[0].customerJanuary/10000,objs.result[0].customerFebruary/10000,objs.result[0].customerMarch/10000,objs.result[0].customerApril/10000,objs.result[0].customerMay/10000,objs.result[0].customerJune/10000,objs.result[0].customerJuly/10000,objs.result[0].customerAugust/10000,objs.result[0].customerSeptember/10000,objs.result[0].customerOctober/10000,objs.result[0].customerNovember/10000,objs.result[0].customerDecember/10000,objs.result[0].totalAmount/10000,objs.money/10000]},
				           
				           
				           ],
				           "scale-x":{ 
				        	   "values":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""+objs.result[0].customeryeah+"总计","累计"],
				           },
				           "scale-y":{ 
				        	   "zooming":false,
//				        	   "zoom-to":[0,5]
				           },
				           "title": {
				        	   "text":"统计"+objs.result[0].customeryeah+"当前客户经理每月用信额度(单位：万元)"
				           },
				           "legend":{

				           }
		};
		
		 zingchart.render({ 
			            id: "container",    
			            height: 500,       
			            width: 700,        
			            data: chartData2
			        });
		}});
}
//选择年份进行统计
function qtnf(){
	var year1=$("#customeryeah").val();
	if(year1!=0 ){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+$("#customeryeah").val()+"客户经理月季统计图</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	var url=wsHost+"/ipad/addIntoPieces/userTj.json?userId="+window.sessionStorage.getItem("userId")+"&year="+year1;
		$.ajax({
			url:url,
			type: "GET",
			dataType:'json',
			success: function (json) {
				 objs = $.evalJSON(json);
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+year1+"月季统计图"+
					"</div>"+ 
					"<div class='content'>" +
					"<div class='zingchartt' id='container' ></div>"+
					"<p>"+
					//"<input type='button' class='btn btn-large btn-primary' value='月度用信额度状况统计' id = 'zedtj' />"+
					"<input type='button' class='btn btn-large' value='返回' onclick='tjt()'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			
			$("#zedtj").click(function(){
				 zingchart.render({ 
					            id: "container",    
					            height: 500,       
					            width: 700,        
					            data: chartData2
					        });
			});
			
			var chartData2 = {
					"type": "bar", 
					"series": [ 
					           {"text":"用信额度","values":[objs.result[0].customerJanuary/10000,objs.result[0].customerFebruary/10000,objs.result[0].customerMarch/10000,objs.result[0].customerApril/10000,objs.result[0].customerMay/10000,objs.result[0].customerJune/10000,objs.result[0].customerJuly/10000,objs.result[0].customerAugust/10000,objs.result[0].customerSeptember/10000,objs.result[0].customerOctober/10000,objs.result[0].customerNovember/10000,objs.result[0].customerDecember/10000,objs.result[0].totalAmount/10000,objs.money/10000]},
					           
					           
					           ],
					           "scale-x":{ 
					        	   "values":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月","总计","累计"],
					           },
					           "scale-y":{ 
					        	   "zooming":false,
//					        	   "zoom-to":[0,5]
					           },
					           "title": {
					        	   "text":"统计"+objs.result[0].customeryeah+"当前客户经理每月用信额度(单位:万元)"
					           },
					           "legend":{

					           }
			};
			
			 zingchart.render({ 
				            id: "container",    
				            height: 500,       
				            width: 700,        
				            data: chartData2
				        });
			}});
	}else{
		window.wxc.xcConfirm("请选择有效的年份", "warning");
	}
}




var teams;
//团队统计图
function team(res){
	teams=res;
	var url=wsHost+"/ipad/addIntoPieces/selectTeamYear.json?team="+res.result[0].team+"&year=0";
	var objs;
	var td;
	var th;
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+res.result[0].team+"月季统计图</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	$.ajax({
		url:url,
		type: "GET",
		dataType:'json',
		success: function (json) {
			 objs = $.evalJSON(json);
			 for(var i=0;i<res.yearsize;i++){
				 td=td+"<option value = '"+res.year[i].customeryeah+"'>"+res.year[i].customeryeah+"</option>";
			 }
			 for(var i=0;i<res.size;i++){
				 th=th+"<option value = '"+res.resultModel[i].userId+"@"+res.resultModel[i].name+"'>"+res.resultModel[i].name+"</option>";
			 }
		$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+res.result[0].customeryeah+res.result[0].team+"月季统计图"+
				"<select id ='selectyear' onchange='tdtj(this)'><option value = '0'>选择团队年份统计</option>"+
				td+
				"</select>"+
				
				
				"<select id ='customeryeah' ><option value = '0'>选择团队成员年份</option>"+
				td+
				"</select>"+
				"<select id ='userId' ><option value = '0'>选择团队成员</option>"+
				th+
				"</select>"+
				"</div>"+ 
				"<div class='content'>" +
				"<div class='zingchartt' id='container' ></div>"+
				"<p>"+
				"<input type='button' class='btn btn-large btn-primary' value='查看选中成员月季统计' id='seeTj'/>"+
				"<input type='button' class='btn btn-large' value='返回' onclick='tjt()'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		$("#seeTj").click(function(){
			if($("#customeryeah").val() && $("#userId").val().split("@")[0]!=0){
				seeTeamUser($("#customeryeah").val(),$("#userId").val());
			}else{
				window.wxc.xcConfirm("请选择正确的年份以及客户经理", "warning");
			}
		});
		var chartData2 = {
				"type": "bar", 
				"series": [ 
				           {"text":"用信额度","values":[objs.resultModel[0].customerJanuary,objs.resultModel[0].customerFebruary,objs.resultModel[0].customerMarch,objs.resultModel[0].customerApril,objs.resultModel[0].customerMay,objs.resultModel[0].customerJune,objs.resultModel[0].customerJuly,objs.resultModel[0].customerAugust,objs.resultModel[0].customerSeptember,objs.resultModel[0].customerOctober,objs.resultModel[0].customerNovember,objs.resultModel[0].customerDecember,objs.resultModel[0].totalAmount,objs.money]},
				           
				           
				           ],
				           "scale-x":{ 
				        	   "values":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""+res.result[0].customeryeah+"总计","累计"],
				           },
				           "scale-y":{ 
				        	   "zooming":false,
//				        	   "zoom-to":[0,5]
				           },
				           "title": {
				        	   "text":"统计"+res.result[0].customeryeah+res.result[0].team+"每月用信额度(单位:万元)"
				           },
				           "legend":{

				           }
		};
		
		 zingchart.render({ 
			            id: "container",    
			            height: 500,       
			            width: 700,        
			            data: chartData2
			        });
		}});
}
//团队年份统计
function tdtj(){
	var year=$("#selectyear").val();
	if(year!=0&& year!="0"){
		
	var team=teams.result[0].team;
	var url=wsHost+"/ipad/addIntoPieces/selectTeamYear.json?team="+team+"&year="+year;
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+year+team+"月季统计图</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	$.ajax({
		url:url,
		type: "GET",
		dataType:'json',
		success: function (json) {
			 objs = $.evalJSON(json);
		$("#mainPage").html("<div class='title'><img src='images/back.png' id='backs'/>"+year+team+"月季统计图"+
				"</div>"+ 
				"<div class='content'>" +
				"<div class='zingchartt' id='container' ></div>"+
				"<p>"+
				//"<input type='button' class='btn btn-large btn-primary' value='查看选中成员月季统计' id='seeTj'/>"+
				"<input type='button' class='btn btn-large' value='返回' id='backs1'/></p>"+
		"</div>");
		$(".right").hide();
		$("#mainPage").show();
		$("#backs").click(function(){
			team(teams);
		});
		$("#backs1").click(function(){
			team(teams);
		});
		var chartData2 = {
				"type": "bar", 
				"series": [ 
				           {"text":"用信额度","values":[objs.resultModel[0].customerJanuary,objs.resultModel[0].customerFebruary,objs.resultModel[0].customerMarch,objs.resultModel[0].customerApril,objs.resultModel[0].customerMay,objs.resultModel[0].customerJune,objs.resultModel[0].customerJuly,objs.resultModel[0].customerAugust,objs.resultModel[0].customerSeptember,objs.resultModel[0].customerOctober,objs.resultModel[0].customerNovember,objs.resultModel[0].customerDecember,objs.resultModel[0].totalAmount,objs.money]},
				           
				           
				           ],
				           "scale-x":{ 
				        	   "values":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""+year+"总计","累计"],
				           },
				           "scale-y":{ 
				        	   "zooming":false,
//				        	   "zoom-to":[0,5]
				           },
				           "title": {
				        	   "text":"统计"+year+team+"每月用信额度(单位:万元)"
				           },
				           "legend":{

				           }
		};
		
		 zingchart.render({ 
			            id: "container",    
			            height: 500,       
			            width: 700,        
			            data: chartData2
			        });
		}})
	}
}




















//团队成员统计
function seeTeamUser(customeryeah,userId){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='tjt()'/>"+customeryeah.split("@")[0]+userId.split("@")[1]+"贷款月季统计图</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	var url=wsHost+"/ipad/addIntoPieces/userTj.json?userId="+userId.split("@")[0]+"&year="+customeryeah;
		$.ajax({
			url:url,
			type: "GET",
			dataType:'json',
			success: function (json) {
				 objs = $.evalJSON(json);
			$("#mainPage").html("<div class='title'><img src='images/back.png' id='back1'/>"+customeryeah.split("@")[0]+userId.split("@")[1]+"贷款月季统计图"+
					"</div>"+ 
					"<div class='content'>" +
					"<div class='zingchartt' id='container' ></div>"+
					"<p>"+
					//"<input type='button' class='btn btn-large btn-primary' value='月度用信额度状况统计' id = 'zedtj' />"+
					"<input type='button' class='btn btn-large' value='返回' id='back'/></p>"+
			"</div>");
			$(".right").hide();
			$("#mainPage").show();
			$("#back").click(function(){
				team(teams);
			});
			$("#back1").click(function(){
				team(teams);
			});
			var chartData2 = {
					"type": "bar", 
					"series": [ 
					           {"text":"用信额度","values":[objs.result[0].customerJanuary/10000,objs.result[0].customerFebruary/10000,objs.result[0].customerMarch/10000,objs.result[0].customerApril/10000,objs.result[0].customerMay/10000,objs.result[0].customerJune/10000,objs.result[0].customerJuly/10000,objs.result[0].customerAugust/10000,objs.result[0].customerSeptember/10000,objs.result[0].customerOctober/10000,objs.result[0].customerNovember/10000,objs.result[0].customerDecember/10000,objs.result[0].totalAmount/10000,objs.money/10000]},
					           
					           
					           ],
					           "scale-x":{ 
					        	   "values":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月","总计","累计"],
					           },
					           "scale-y":{ 
					        	   "zooming":false,
//					        	   "zoom-to":[0,5]
					           },
					           "title": {
					        	   "text":"统计"+customeryeah+userId.split("@")[1]+"每月用信额度(单位:万元)"
					           },
					           "legend":{

					           }
			};
			
			 zingchart.render({ 
				            id: "container",    
				            height: 500,       
				            width: 700,        
				            data: chartData2
				        });
			}});
}