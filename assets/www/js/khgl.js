

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
			$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='khgl()'/>客户管理-普查录入</div>"+  
					"<div class='content'>" +                        
					"<table id='sdlb' class='cpTable jjTable' style='text-align:center;'>"+
					head+result[page]+
					"</table>"+
					  "<p>"+
					  "<input type='button' class='btn btn-primary btn-large' value='上一页' id='syy'/>"+
						"<input type='button' class='btn btn-primary btn-large' value='下一页' id='xyy'/>"+
                      "<input type='button' class='btn btn-primary btn-large' value='新增普查' onclick='xzpc1()'/>"+
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

var cardId="";
function xzpc1(){
	pushposition1();
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='pclr()'/>客户管理-普查录入-新增普查</div>"+  
						"<div class='content'>" +
						    "<div class='jjstep'>" +
	    					    "<div class='step1'>录入基本信息</div>"+
	                            "<div class='step2'>影像上传</div>"+
	                            "<input type='button' class='btn btn-primary btn-large next' value='下一步' id='next'/>"+
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
								"<p><img src='images/ugc_icon_type_photo.png' onclick='capture(\"fcz_sheet1\",\"img\");'/></p>"+
							"</div>"+          
						"</div>");
	    $(".right").hide();
	    $("#mainPage").show();
		$("#next").click(function() {
			alert("123");
			var sdrwurl= "/ipad/pccustormer/insertPCustomer.json";
			var userId = window.sessionStorage.getItem("userId");
			var name=$("#khmc").val();
			alert(name);
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
		        		dlzb="";
		        		cardId=cardid;
		        		 xzpc2(cardid,name);
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
							"<p class='Left'>" +
								"<button class='add-button' onclick='addTd(\"fcz\")'><img src='images/add.png'/></button>" +
								"<button class='add-button' onclick='removeTd(\"fcz\")'><img src='images/del.png'/></button>" +
							"</p>"+
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



var ress;
//普查录入-普查详情
function pcxq1(res){
	ress=res;
	
window.scrollTo(0,0);//滚动条回到顶端
var findpcImage="/ipad/pccustormer/ckpcImage.json?cardid="+res.cardid;
var findpcImage1="http://192.168.191.1:8080/PCCredit/ipad/pccustormer/ckpcImageById.json?id=";
var th="";
var id="";
$.ajax({
    url:wsHost + findpcImage,
    type: "GET",
    dataType:'json',
    success: function (json) {
    	var objs = $.evalJSON(json);
    		  for(var i=0;i<objs.size;i++){
    	    		th=th+"<img class='images' id='ima"+i+"' src='http://192.168.191.1:8080/PCCredit/ipad/pccustormer/ckpcImageById.json?id="+objs.result[i].id+"'/>";         
    	    	}
      
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
                    "<th>编辑经营场所照片 <input type='button' class='btn' value='显示图集' id='bj' style='margin:0;'></th>"+
                "</tr>"+
            "</table>"+ 
            "<div id='list'>"+
                "<div id='shishi' >" +
                   "<div class='slt' id='imgList'>"+
                   th+
                   "</div>"+
                "</div>"+
            "</div>"+
                "</div>");
    $(".right").hide();
    $("#mainPage").show(); 
    $("#bj").click(function(){
    		var imas=[];
        	for(var aa=0;aa<objs.size;aa++){
    			imas+=objs.result[aa].id+",";
    		}
    		var target=imas;
    		var size="0";
    		window.plugins.ImaList.send(testSuccess,testError, target,size);
    });
    $(".images").on({ 
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
            return false; 
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
