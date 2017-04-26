

//客户管理
function mykhgl(){
window.scrollTo(0,0);//滚动条回到顶端
$("#mainPage").html("<div class='title'>客户管理</div>"+  
                    "<div class='content'>" +
                        "<div class='box khgl' onclick='newUser()'><img src='images/xjkh.jpg'/><span>新建客户</span></div>"+
                        "<div class='box khgl' onclick='editUser()'><img src='images/khwh.jpg'/><span>客户维护</span></div>"+
                        "<div class='box khgl' onclick='myzbgl()'><img src='images/wdzb.png'/><span>众包管理</span></div>"+
                        "<div class='box khgl' onclick='pclr()'><img src='images/pclr.jpg'/><span>普查录入</span></div>"+
                        //"<div class='box khgl' onclick='pushposition1()'><img src='images/pcdtgl.jpg'/><span>普查地图概览</span></div>"+
                        //"<div class='box khgl' onclick='khjlgjcx()'><img src='images/khjlgj.jpg'/><span>客户经理轨迹查询</span></div>"+
                    "</div>");
    $(".right").hide();
    $("#mainPage").show();
}
function testSuccess(){

};
function testError(){
	alert('读取失败!!!');
};
//新建客户
function newUser(){
window.scrollTo(0,0);//滚动条回到顶端
$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mykhgl()'/>客户管理-新建客户</div>"+  
                    "<div class='content' style='height:320px;padding-top:80px;background:url(images/book.jpg) no-repeat center center;'>" +
                        "<p>客户姓名:<input type='text' id ='khname'/></p>"+
                        "<p>证件类型:<select id ='cardType'>" +
                        "<option value='0'>身份证</option>" +
                        "<option value='1'>军官证</option>"+
                        "<option value='2'>护照</option>"+
                        "<option value='3'>香港身份证</option>"+
                        "<option value='4'>澳门身份证</option>"+
                        "<option value='5'>台湾身份证</option>"+
                        "</select></p>"+
                        "<p>证件号码:<input type='text' id = 'cardId'/></p>"+
                        "<p>手机号码:<input type='text' id = 'phone'/></p>"+
                        "<p>" +
                            "<input type='button' id ='sure' class='btn btn-large btn-primary' value='确定'/>"+  
                            "<input type='button' class='btn btn-large' value='返回' onclick='mykhgl()'/>"+
                            "</p>" +
                    "</div>");
    $(".right").hide();
    $("#mainPage").show();    
//点击确定插入
	$("#sure").click(function() {
		var chineseName = $("#khname").val();
		var cardId = $("#cardId").val();
		var cardType = $("#cardType").val();
		var tel = $("#phone").val();
		var userId = window.sessionStorage.getItem("userId");
		if(cardId==""||cardId==null||chineseName==""||chineseName==null){
//			alert("证件号码或姓名不能为空");
			window.wxc.xcConfirm("证件号码或姓名不能为空", "warning");
		}else{
			var wsLoginUrl = "/ipad/product/customerInsert.json"+"?cardId="+cardId+"&chineseName="+chineseName+"&cardType="+cardType+"&userId="+userId+"&phoneNumber="+tel;
			
			$.ajax({
		        url:wsHost + wsLoginUrl,
		        type: "GET",
		        dataType:'json',
		        success: function (json) {
		        	var objs = $.evalJSON(json);
//		        	alert(objs.message);
		        	window.wxc.xcConfirm(objs.message, "success");
		        	document.getElementById("khname").value = "";
		        	document.getElementById("cardId").value = "";
		        	document.getElementById("phone").value = "";
		        }
			})
		}
	})

}

//客户维护
function editUser(){
window.scrollTo(0,0);//滚动条回到顶端
$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mykhgl()'/>客户管理-客户维护</div>"+  
                    "<div class='content'>" +
                        "<div class='khwh1' onclick='khzlcx()'><img src='images/khzlcx.png'/><span>客 户 资 料 查 询</span></div>"+
                        "<div class='khwh2' onclick='khwhlb()'><img src='images/khwhjh2.png'/><span>客<br/>户<br/>维<br/>护<br/>计<br/>划</span></div>"+
                        "<div class='khwh3' onclick='khwhrz()'><img src='images/khwhrz.png'/><span>客<br/>户<br/>维<br/>护<br/>日<br/>志</div>"+
                        "<div class='khwh4' onclick='khcsrz()'><img src='images/khcsrz.png'/><span>客 户 催 收 日 志</span></div>"+
                    "</div>");
    $(".right").hide();
    $("#mainPage").show();
}



//普查录入
function pclr(){
	var sdrwurl= "/ipad/pccustormer/selectPCustomer.json";
	var userId = window.sessionStorage.getItem("userId");
	var tmp ="";
	var result={};
	var page=1;
	var j = 1;
	var head="<tr>"+                         
	"<th></th>"+                 
    "<th>客户姓名</th>"+  
    "<th>客户身份证号码</th>"+
    "<th>店铺（家庭）地址</th>"+
    "<th>所属行业</th>"+
    "<th>所属客户经理</th>"+
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
				tmp=tmp+"<tr onclick='check(this)'><td><span class='radio'> <input type='radio' name='checkbox' value='"+obj.result[i].id+"@"+
				obj.result[i].cardid+"@"+
				obj.result[i].name+"@"+
				obj.result[i].csrq+"@"+
				obj.result[i].cjsj+"@"+
				obj.result[i].sfzdz+"@"+
				obj.result[i].hy+"@"+
				obj.result[i].dpdz+"'/>"+"</span></td>"+  
				"<td>"+obj.result[i].name+"</td>"+
				"<td>"+obj.result[i].cardid+"</td>"+
				"<td>"+obj.result[i].dpdz+"</td>"+
				"<td>"+obj.result[i].hy+"</td>"+
				"<td>"+obj.result[i].displayName+"</td>";
				if((i+1)%5==0){
					result[j]=tmp;
					j++;
					tmp="";
				}
			}
			result[j]=tmp;
			window.scrollTo(0,0);//滚动条回到顶端
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mykhgl()'/>客户管理-普查录入</div>"+  
					"<div class='content'>" +                        
					"<table id='sdlb' class='cpTable jjTable' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					  "<p>"+
					  "<input type='button' class='btn btn-primary btn-large' value='上一页' id='syy'/>"+
						"<input type='button' class='btn btn-primary btn-large' value='下一页' id='xyy'/>"+
                      "<input type='button' class='btn btn-primary btn-large' value='新增普查' onclick='smIdCard()'/>"+
						"<input type='button' class='btn btn-primary btn-large' value='查看详情' id='findpc'/>"+
                  "</p>"+  
			"</div>");
			$(".right").hide();
			$("#mainPage").show();   
			$("#xyy").click(function(){
				page=page+1;
				if(result[page]){
					$("#sdlb").html(head+result[page]);
				}else{
					alert("当前已经是最后一页");
					page=page-1;
				}
			})
			$("#syy").click(function(){
				page=page-1; 
				if(result[page]){
					$("#sdlb").html(head+result[page]);
				}else{
					alert("当前已经是第一页");
					page = page+1;
				}
			})
			$("#findpc").click(function() {
				if ($("input[type='radio']").is(':checked')) {
					var values =$('input[name="checkbox"]:checked').attr("value").split("@");
					var res ={};
					res.id = values[0];
					res.cardid = values[1];
					res.name = values[2];
					res.csrq = values[3];
					res.cjsj = values[4];
					res.sfzdz = values[5];
					res.hy = values[6];
					res.dpdz = values[7];
					pcxq1(res);
				}else{
					alert("请选择一行");
				}
			})
		}
	})
}
//扫描成功
function pushposition1(json){
	$("#mainPage").html("<div class='title'>正在定位.........</div>"+  
			"</div>"+
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	window.plugins.GetLocationOffline.startActivity(getsuccess,null,"","get");
	function getsuccess(position){
		pushlon=position.Longitude;
		pushlat=position.Latitude;
		var dt=position.Latitude+","+position.Longitude;
		var url="http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+dt+"&output=json&pois=0";
		$.ajax({ 
			type: "GET", 
			dataType: "jsonp", 
			url: url, 
			success: function (json) { 
			if(json.status==0){ 
			//alert("您所在地址为:"+json.result.formatted_address+json.result.sematic_description); 
				var dlzb=json.result.formatted_address+json.result.sematic_description;
				alert("您所在地址为:"+dlzb);
				//取扫描的值
				xzpc1(dlzb);
			} 
			}, 
			error: function (XMLHttpRequest, textStatus, errorThrown) { 
		}
			}); 
	}


	var obj = $.evalJSON(json);
	//赋值
	$("#khmc").val(obj["姓名"]);
	$("#csrq").val(obj["出生"]);
	$("#cardid").val(obj["公民身份证号"]);
	$("#sfzdz").val(obj["住址"]);
}
}
//扫描身份证
function smIdCard(){
	window.plugins.PluginIDCapture.crop("",pushposition1,testError);
}
function getIDInfo(json){
	alert(json)
	//console.log("Value in javascript " + json);
	var obj = $.evalJSON(json);
	//赋值
	$("#khmc").val(obj["姓名"]);
	$("#csrq").val(obj["出生"]);
	$("#cardid").val(obj["公民身份证号"]);
	$("#sfzdz").val(obj["住址"]);
}

function xzpc1(dlzb){
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='pclr()'/>客户管理-普查录入-新增普查</div>"+  
						"<div class='content'>" +
						    "<div class='jjstep'>" +
	    					    "<div class='step2'>录入基本信息</div>"+
	                            //"<div class='step2'>影像上传</div>"+
	                            "<input type='button' class='btn btn-primary btn-large next' value='保存' id='next'/>"+
						    "</div><div class='myline'></div>"+
							"<div class='bottom-content'>"+
								"<table class='cpTable' style='margin-top:20px;'>"+
									"<tr>"+                             
										"<th colspan='4'>客户基本信息</th>"+
									"</tr>"+
									"<tr>"+    
										"<th style='width:15%'>客户名称</th>"+
										"<td style='width:35%'><input type='text' id='khmc' value=''/></td>"+
										"<th style='width:15%'>出生日期</th>"+
										"<td style='width:35%'><input type='text' id='csrq' value=''/></td>"+
									"</tr>"+
									"<tr>"+    
										"<th>身份证号码</th>"+
										"<td colspan='3'><input type='text' class='long' id='cardid' value=''/></td>"+
									"</tr>"+
									"<tr>"+    
										"<th>身份证地址</th>"+
										"<td colspan='3'><input type='text' class='long' id='sfzdz' value=''/></td>"+
									"</tr>"+
									"<tr>"+    
										"<th>店铺（家庭）地址</th>"+
										"<td colspan='3'><input type='text' class='long' id='dpdz' value='"+dlzb+"'/></td>"+
									"</tr>"+
									"<tr>"+    
										"<th>所属行业</th>"+
										"<td colspan='3'><input type='text' class='long' id='hy' value=''/></td>"+
									"</tr>"+
								"</table>"+
								"<p><img src='images/ugc_icon_type_photo.png' onclick='capture(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\",\""+name+ "\");'/>"+
								"<input type='hidden' id='sure'>"+
								"<input type='hidden' id='qtyxzl_sheet1' name='imageuri' uri='' class='readonly' readonly='readonly'/><input type='hidden' class='btn' onclick='getMedia(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\");' value='选择文件'/></p>"+
							"</div>"+          
						"</div>");
	    $(".right").hide();
	    $("#mainPage").show();
		$("#sure").click(function(){
			window.wxc.xcConfirm("是否开始上传影像资料","confirm",{onOk:scks});
			function scks(){
				var applicationId = null;
				show_upload(0);
					var j=1;
					var fileName = $("#qtyxzl_sheet"+j).val();
					var fileURI = document.getElementsByName("imageuri")[0].getAttribute("uri");
					if(fileName!=""&&fileURI!=""){
						var options = new FileUploadOptions();  
						options.fileKey = "file";  
						options.fileName = fileName; 
						options.mimeType = "multipart/form-data";  
						options.chunkedMode = false;  
						ft = new FileTransfer(); 
						var uploadUrl=encodeURI(wsHost+"/ipad/pccustormer/imagepcImport.json?cardid="+$("#cardid").val()+"&userId="+window.sessionStorage.getItem("userId")+"&fileName="+options.fileName);  
						$("#uploadInfo").html("正在上传"+(1)+"张照片，请稍后...");
						ft.upload(fileURI,uploadUrl,uploadSuccess, uploadFailed, options); 
						uploadlock=false;
					}
			}
		});
		$("#next").click(function() {
			var sdrwurl= "/ipad/pccustormer/insertPCustomer.json";
			var userId = window.sessionStorage.getItem("userId");
			var name=$("#khmc").val();
			var cardid=$("#cardid").val();
			var sfzdz=$("#sfzdz").val();
			var dpdz=$("#dpdz").val();
			var hy=$("#hy").val();
			var csrq=$("#csrq").val();
			$.ajax({
		        url:wsHost + sdrwurl,
		        type: "GET",
		    	data:{
					userId:userId,
					name:name,
					cardid:cardid,
					sfzdz:sfzdz,
					dpdz:dpdz,
					hy:hy,
					csrq:csrq,
				},
		        dataType:'json',
		        success: function (json) {
		        	var objs = $.evalJSON(json);
		        	if(objs.result=="1"){
		        		pclr();
		        	}else if(objs.result=="0"){
		        		alert("添加失败");
		        	}else{
		        		alert(objs.result);
		        	}
		        }
			})
		});
	}


//普查录入-影像上传
function xzpc2(cardid,name){
window.scrollTo(0,0);//滚动条回到顶端
$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='xzpc1()'/>客户管理-普查录入-新增普查</div>"+  
					"<div class='content'>" +
					    "<div class='jjstep'>" +
    					    "<div class='step1'>录入基本信息</div>"+
                            "<div class='step3'>影像上传</div>"+
                            "<input type='button' class='btn btn-primary btn-large next' value='保存' id='sure'/>"+
					    "</div><div class='myline'></div>"+
						"<div class='bottom-content'>"+
						"<table id='qtyxzl' class='cpTable' style='text-align:center;margin-top:20px;'>"+
						"<tr>"+    
						"<th style='width:40px;'>序号</th>"+ 
						"<th>经营场所照片</th>"+
						"<th>操作</th>"+
						"</tr>"+
						"<tr>"+  
						"<td>1</td>"+
						"<td><input type='text' id='qtyxzl_sheet1' name='imageuri' uri='' class='readonly' readonly='readonly'/><input type='button' class='btn' onclick='getMedia(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\");' value='选择文件'/></td>"+
//						"<td><img src='images/ugc_icon_type_photo.png' id ='takepucture'/></td>"+
						"<td><img src='images/ugc_icon_type_photo.png' onclick='capture(\"qtyxzl_sheet1\",\"img\",\"imageuri\",\"1\",\""+name+ "\");'/></td>"+
						"</tr>"+
						"</table>"+
							
						"</div>"+         
					"</div>");
    $(".right").hide();
    $("#mainPage").show();
	$("#sure").click(function(){
		window.wxc.xcConfirm("是否开始上传影像资料","confirm",{onOk:scks});
		function scks(){
			var applicationId = null;
			var num= $('#qtyxzl tr').length;
			show_upload(0);
			for(var i=0;i<num;i++){
				var j=i+1;
				var fileName = $("#qtyxzl_sheet"+j).val();
				var fileURI = document.getElementsByName("imageuri")[i].getAttribute("uri");
				if(fileName!=""&&fileURI!=""){
					var options = new FileUploadOptions();  
					options.fileKey = "file";  
					options.fileName = fileName; 
					options.mimeType = "multipart/form-data";  
					options.chunkedMode = false;  
					ft = new FileTransfer(); 
//					ft.onprogress = showUploadingProgress;
//			        navigator.notification.progressStart("", "当前上传进度");
					var uploadUrl=encodeURI(wsHost+"/ipad/pccustormer/imagepcImport.json?cardid="+cardId+"&userId="+window.sessionStorage.getItem("userId")+"&fileName="+options.fileName);  
					$("#uploadInfo").html("正在上传第"+(i+1)+"张，请稍后...");
					ft.upload(fileURI,uploadUrl,uploadSuccess, uploadFailed, options); 
					uploadlock=false;
				}
			}
		}
	});
}


function deleteIma1(id){//显示登出提示
    $("#text").html("<div class='display-div' id='xdyss'>"+
                        "<div class='dialog-head'>"+
                           "<h4>删除图片</h4>"+
                        "</div>"+
                        "<div class='dialog-content'>"+
                           " 你确定要删除图片吗？"+
                        "</div>"+
                        "<div class='dialog-bottom'>"+
                           "<button type='button' class='btn btn-default' onclick='hide_dcts()'>取消</button>"+
                           "<button type='button' class='btn btn-danger' id='sure'>确定</button>"+
                        "</div>"+
                    "</div><!-- /display-div -->");
    $("#text").animate({top:"0px"},"500");
    $("#sure").click(function(){
    	var url=wsHost+"/ipad/pccustormer/deleteImage.json?id="+id;
    	$.ajax({
    	    url:url,
    	    type: "GET",
    	    dataType:'json',
    	    success: function (json) {
    	    	var objs = $.evalJSON(json);
    	    	alert(objs.result);
    	    	pcxq1(ress);
    	    	hide_dcts();
    	    }});
    });
}
var ress;
//普查录入-普查详情
function pcxq1(res){
	ress=res;
	
window.scrollTo(0,0);//滚动条回到顶端
var findpcImage="/ipad/pccustormer/ckpcImage.json?cardid="+res.cardid;
var findpcImage1="http://192.168.191.1:8080/PCCredit/ipad/pccustormer/ckpcImageById.json?id=0";
var th="";
var id="";
var lltpurl="";
var page = 0;
$.ajax({
    url:wsHost + findpcImage,
    type: "GET",
    dataType:'json',
    success: function (json) {
    	var objs = $.evalJSON(json);
    		  /*for(var i=0;i<objs.size;i++){
    	    		th=th+"<img class='images' id='ima"+i+"' src='http://192.168.191.1:8080/PCCredit/ipad/pccustormer/ckpcImageById.json?uri="+objs.result[0].uri+"&attment="+objs.result[0].attachment+"&i="+i+"'/>";         
    	    	}*/
    	 id=objs.result[0].id;
		lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
$("#mainPage").html("<div class='title' '><img src='images/back.png' onclick='pclr()'/>客户管理-普查录入-王军忠</div>"+  
                "<div class='content' >" +                       
                    "<table class='cpTable'>"+
                        "<tr>"+                             
                            "<th colspan='6'>客户基本信息</th>"+
                        "</tr>"+
                        "<tr>"+    
                            "<th style='width:15%'>客户名称</th>"+
                            "<td><input type='text' value='"+res.name+"'/></td>"+
                            "<th style='width:15%'>出生日期</th>"+
                            "<td><input type='text' value='"+res.csrq+"'/></td>"+
                            "<th style='width:15%'>采集时间</th>"+
                            "<td><input type='text' value='"+res.cjsj+"'/></td>"+
                        "</tr>"+
                        "<tr>"+    
                            "<th>身份证号码</th>"+
                            "<td><input type='text' value='"+res.cardid+"'/></td>"+
                            "<th>身份证地址</th>"+
                            "<td colspan='3'><input type='text' class='long' value='"+res.sfzdz+"'/></td>"+
                        "</tr>"+
                        "<tr>"+ 
                            "<th>所属行业</th>"+
                            "<td><input type='text' value='"+res.hy+"'/></td>"+
                            "<th>店铺地址</th>"+
                            "<td colspan='3'><input type='text' class='long' value='"+res.dpdz+"' /></td>"+
                        "</tr>"+
                    "</table>"+ 
                    "<table class='cpTable'>"+
                    "<tr>"+                             
                    "<th>编辑经营场所照片 </th>"+
                    //"<th>编辑经营场所照片 <input type='button' class='btn' value='显示图集' id='bj' style='margin:0;'></th>"+
                    "</tr>"+
            "</table>"+ 
    		"<div class='content' id='imageBrowse' style='text-align:center;margin-top:0px;'>图片加载中..." +
    		"</div>"+
            
            
           /* "<div id='list'>"+
                "<div id='shishi' >" +
                   "<div class='slt' id='imgList'>"+
                   th+
                   "</div>"+
                "</div>"+
            "</div>"+*/
                "</div>");
$(".right").hide();
$("#mainPage").show();
$("#imageBrowse").html(
		"<img id='Ima"+page+"' width='80%' height='75%' style='text-align:center margin-top:1px' src='"+wsHost+lltpurl+"' alt='' />"
);
    $(".right").hide();
    $("#mainPage").show(); 
    $("#Ima"+page).click(function(){
    	deleteIma1(objs.result[page].id);
    });
    $("#bj").click(function(){
    	pctj(objs);
    	/*	var imas=[];
        	for(var aa=0;aa<objs.size;aa++){
    			imas+=objs.result[aa].id+",";
    		}
    		var target=imas;
    		var size="0";
    		window.plugins.ImaList.send(testSuccess,testError, target,size);*/
    });
  /*  $(".images").on({ 
        touchstart: function(e){
            timeOutEvent = setTimeout("longPress('"+$(this).attr("id")+"')",500);
            e.preventDefault();
        },
        touchmove: function(){
                    clearTimeout(timeOutEvent); 
                timeOutEvent = 0; 
        },
        touchend: function(){
        	var imageurl;
            clearTimeout(timeOutEvent);
            if(timeOutEvent!=0){ 
            var chart=$(this).attr("id");
            imageurl=objs.result[chart[3]].id;
            ImageId=imageurl;
            var size="1";
            window.plugins.ImaList.send(backsuccess,testError, imageurl,size);
            
            } 
            show_big(imageurl)
            return false; 
        }
    }); */
    var nStartx, nStarty, nEndx, nEndy;
    var dist = 100;
    document.getElementById("imageBrowse").addEventListener("touchstart",
               function (e) {
                     nStartx = e.targetTouches[0].pageX;
                     nStarty = e.targetTouches[0].pageY;
                     console.log("touch start:" + nStartx + "," + nStarty);
               });
    document.getElementById("imageBrowse").addEventListener("touchend",
              function (e) {
                     nEndx = e.changedTouches[0].pageX;
                     nEndy = e.changedTouches[0].pageY;
                     console.log("touch end:" + nEndx + "," + nEndy);
                     if(nEndx-nStartx>dist)   //向右滑动
                     {
                        //执行逻辑
                   	  page=page-1; 
                 		if(page>=0){
                 			id=objs.result[page].id
                 			lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
                 			$("#imageBrowse").html(
                 					"<img id='Ima"+page+"' style='text-align:center' width='80%' height='75%' src='"+wsHost+lltpurl+"' alt=''/>"
                 			);
                 			  $("#Ima"+page).click(function(){
                 					deleteIma1(objs.result[page].id);
                 			    });
                 		}else{
                 			window.wxc.xcConfirm("当前已经是第一页", "info");
                 			page = page+1;
                 		}
                     }
                     else if(nStartx-nEndx>dist) //向左滑动
                     {
                        //执行逻辑
                   	  page=page+1; 
                 		if(page<objs.size){
                 			id=objs.result[page].id
                 			lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
                 			$("#imageBrowse").html(
                 					"<img id='Ima"+page+"' width='80%' height='75%'  src='"+wsHost+lltpurl+"' alt=''/>"
                 			);
                 			  $("#Ima"+page).click(function(){
                 					deleteIma1(objs.result[page].id);
                 			    })
                 		}else{
                 			window.wxc.xcConfirm("当前已经是最后一页", "info");
                 			page = page-1;
                 		}
                     }
    });
}});



}
var ImageId="";
function backsuccess(data){
	if(data.target=="1"){
		var url=wsHost+"/ipad/pccustormer/deleteImage.json?id="+ImageId;
		$.ajax({
		    url:url,
		    type: "GET",
		    dataType:'json',
		    success: function (json) {
		    	var objs = $.evalJSON(json);
		    	alert(objs.result);
		    	pcxq1(ress);
		    	ImageId="";	
		    }})
	}
}





//影像资料
function pctj(obj){
	var page = 0;
	var lltpurl;
	var id;
			 id=obj.result[0].id;
			lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
			
		
	$("#mainPage").html("<div class='title'><img src='images/back.png' id='back'/>普查图集</div>"+
			"<div class='content'>" +
			"<div class='tabplace' id='imageBrowse' style='text-align:center;margin:0 auto;'>图片加载中..." +
			"</div>"+
	"</div>");
	$(".right").hide();
	$("#mainPage").show();
	$("#imageBrowse").html(
			"<img id ='images' width='80%' height='75%' style='text-align:center' src='"+wsHost+lltpurl+"' alt='' />"
	);
	  $("#back").click(function(){
			pcxq1(ress);
	  });

	 var nStartx, nStarty, nEndx, nEndy;
	 var dist = 100;
	 document.getElementById("imageBrowse").addEventListener("touchstart",
	            function (e) {
	                  nStartx = e.targetTouches[0].pageX;
	                  nStarty = e.targetTouches[0].pageY;
	                  console.log("touch start:" + nStartx + "," + nStarty);
	            });
	 document.getElementById("imageBrowse").addEventListener("touchend",
	           function (e) {
	                  nEndx = e.changedTouches[0].pageX;
	                  nEndy = e.changedTouches[0].pageY;
	                  console.log("touch end:" + nEndx + "," + nEndy);
	                  if(nEndx-nStartx>dist)   //向右滑动
	                  {
	                     //执行逻辑
	                	  page=page-1; 
	              		if(page>=0){
	              			id=obj.result[page].id
	              			lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
	              			$("#imageBrowse").html(
	              					"<img id ='images' style='text-align:center' width='80%' height='75%' src='"+wsHost+lltpurl+"' alt=''/>"
	              			);
	              		}else{
	              			window.wxc.xcConfirm("当前已经是第一页", "info");
	              			page = page+1;
	              		}
	                  }
	                  else if(nStartx-nEndx>dist) //向左滑动
	                  {
	                     //执行逻辑
	                	  page=page+1; 
	              		if(page<obj.size){
	              			id=obj.result[page].id
	              			lltpurl="/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
	              			$("#imageBrowse").html(
	              					"<img id ='images' width='80%' height='75%'  src='"+wsHost+lltpurl+"' alt=''/>"
	              			);
	              		}else{
	              			window.wxc.xcConfirm("当前已经是最后一页", "info");
	              			page = page-1;
	              		}
	                  }
	 });
		}
function show_big(id){//点击放大
	lltpurl=wsHost+"/ipad/pccustormer/ckpcImageById.json?userId=0&id="+id;
	 $("#text").html("<div class='display-div sdhtz' style='width:80%;margin-top:20px;left:10%;'>"+
             "<div class='dialog-head'>"+
                "<h4>查看大图</h4>"+
             "</div>"+
             "<div class='dialog-content' width='80%' height='50%'><img src='"+lltpurl+"' style='width='80%' height='50%''/></div>"+
             "<div class='dialog-content'>"+
                "您确定删除这张照片吗？"+
             "</div>"+
             "<div class='dialog-bottom'>"+
                "<button type='button' class='btn btn-default' onclick='hide_dcts()'>取消</button>"+
                "<button type='button' class='btn btn-danger' id='sure'>确定</button>"+
             "</div>"+
         "</div>");
$("#text").animate({top:"0px"},"500");
$("#sure").click(function(){
	var url=wsHost+"/ipad/pccustormer/deleteImage.json?id="+id;
	$.ajax({
	    url:url,
	    type: "GET",
	    dataType:'json',
	    success: function (json) {
	    	var objs = $.evalJSON(json);
	    	alert(objs.result);
	    	pcxq1(ress);
	    	hide_dcts();
	    }});
});
	
	
	
	
	
	
	
/*    $("#text").html("<div class='display-div sdhtz' style='width:80%;margin-top:50px;left:10%;'>"+
                        "<div class='dialog-head'>"+
                           "<h4>查看大图</h4>"+
                           "<img src='images/sdhClose.jpg' onclick='hide_dcts()'/>"+
                        "</div>"+
                        "<div class='dialog-content' style='max-height:580px'><img src='"+imgSRC+"' style='width:100%;'/></div>"+
                    "</div><!-- /display-div -->");
    $("#text").animate({top:"0px"},"500");*/
}
