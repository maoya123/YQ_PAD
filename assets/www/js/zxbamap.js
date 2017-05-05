function mymap(){
	var gxwzUrl = "/ipad/pccustormer/selectBmRy.json?userId="+window.sessionStorage.getItem("userId");
	var tmp='';
    
		$.ajax({
			url:wsHost+gxwzUrl,
			dateType:'json',
			type:'GET',
			success:function (json){
				var obj = $.evalJSON(json);
				for(var i = 0;i<obj.size ; i++){
				tmp=tmp+"<option value = '"+obj.result[i].userid+"'>"+obj.result[i].name+"</option>"
				}
	window.scrollTo(0,0);//滚动条回到顶端
 	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='mywdsy()'/>位置信息</div>"+  
 			"</div>"+
 			"<div class='content' id='allmap' style='height:580px;margin:0 auto;'></div>"+
 			"<div class='content' style ='margin:0 auto;'><p  align='center'>" +
 			"<select id ='userid'>"+"<option value = '0'>请选择客户经理</option>"+
 			tmp+
 			"</select>"+
 			"<input type='button' id='ckkhjlwz' class='btn btn-primary btn-large' value='查看客户经理位置'/>"+  
 			"<input type='button' id='fswdwz' class='btn btn btn-primary btn-large' value='发送我的位置'/>"+  
 			"<input type='button' class='btn btn-large'  value='返回' onclick='mywdsy()'/>"+  
 			"</p></div>"
 	);
 	$(".right").hide();
 	$("#mainPage").show();

 		startGetLocation();
 	
 
	$("#ckkhjlwz").click(function(){
		var gxwzUrl1 = "/ipad/intopieces/selectLocation.json";
		var userId=$("#userid").val();
		if(userId!=null||userId!=''){
			$.ajax({
	 			url:wsHost+gxwzUrl1,
	 			dateType:'json',
	 			type:'GET',
	 			//是否异步		
	 //			async:false,
	 			data:{
	 				userId:userId,
	 			},
	 			success:function (json){
	 				var obj = $.evalJSON(json);
	 				var map = new BMap.Map("allmap"); 
						for(var i=0;i<obj.size;i++){
						 	var lon = obj.result[i].longitude; 
						 	var lat = obj.result[i].latitude; 
							var point = new BMap.Point(""+lon+"",""+lat+""); 
	 					 	map.centerAndZoom(point,15); 
	 					 		var marker  = new BMap.Marker(point); 
	 					 		map.addOverlay(marker); 
	 					 		map.setCenter(point);  
	 					 	showInformation(marker,obj.result[i].updateTime,point,map);
	 					}
	 				}
	 			})
		}else{
			alert('请选择客户经理!!');
		}
	})

	$("#fswdwz").click(function(){
 		var gxwzUrl = "/ipad/intopieces/updateLocation.json";
 		var userId = window.sessionStorage.getItem("userId");
 		if(lon!=""&&lat!=""){
 		$.ajax({
 			url:wsHost+gxwzUrl,
 			dateType:'json',
 			type:'GET',
 			//是否异步		
 //			async:false,
 			data:{
 				lat:lat,
 				lon:lon,
 				userId:userId,
 			},
 			success:function (json){
 				var obj = $.evalJSON(json);
 				alert(obj.message);
 			}
 
 		})}else{
 			
 			alert("位置信息为空，等待获取位置信息");
 		}
 	})}})
}
var lon="";
var lat="";

function startGetLocation(){

	if(supportsGeoLocation()){ 
		getLocation();
	}else{ 
		alert("不支持 GeoLocation.");
		mywdsy();
	} 

}

//检测浏览器是否支持HTML5 
function supportsGeoLocation(){ 
	return !!navigator.geolocation; 
}   
/**
 * 自动发送坐标
 */
function getLocations(){ 
	navigator.geolocation.getCurrentPosition(mapIts,locationError); 
} 
function mapIts(position){  
	lon = position.coords.longitude; 
	lat = position.coords.latitude; 
	var gxwzUrl = "/ipad/addusercoorinate.json";
	var userId = window.sessionStorage.getItem("userId");
	if(lon!=""&&lat!=""){
		$.ajax({
			url:wsHost+gxwzUrl,
			dateType:'json',
			type:'GET',
			//是否异步		
			//			async:false,
			data:{
				lat:lat,
				lon:lon,
				userId:userId,
			},
			success:function (json){
				var obj = $.evalJSON(json);
				alert(obj.message);
			}

		})

	}else{
		alert("无法获取当前位置，请检查网络连接和GPS权限"); 

	}
}

//单次位置请求执行的函数              
function getLocation(){ 
	window.plugins.GetLocationOffline.startActivity(getsuccess,null,"","get");
} 
//定位成功时，执行的函数 
/*function mapIt(position){  
	lon = position.coords.longitude; 
	lat = position.coords.latitude; 
	var map = new BMap.Map("allmap"); 
	var point = new BMap.Point(""+lon+"",""+lat+""); 
	map.centerAndZoom(point,19); 
	var gc = new BMap.Geocoder(); 
	translateCallback = function (point){ 
		var marker = new BMap.Marker(point);
		var infoWindow;
		map.addOverlay(marker); 
		map.setCenter(point); 
		gc.getLocation(point, function(rs){ 
			alert("1111");
			var addComp = rs.addressComponents; 
			if(addComp.province!==addComp.city){ 
				var sContent = 
					"<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>你当前的位置是：</h4>" +  
					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
					"</div>";} 
			else{ 
				var sContent = 
					"<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>你当前的位置是：</h4>" +  
					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+ addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
					"</div>"; 
			} 
			infoWindow = new BMap.InfoWindow(sContent); 
			map.openInfoWindow(infoWindow,point); 
		});  
		 marker.addEventListener("click", function () {  
			
	         map.openInfoWindow(infoWindow,point);  
	         
	     }); 
	}                     
	BMap.Convertor.translate(point,0,translateCallback); 
   
} */

function getsuccess(position){  
	lon=position.Longitude;
	lat=position.Latitude;
    var map = new BMap.Map("allmap"); 
    var point = new BMap.Point(""+lon+"",""+lat+""); 
    map.centerAndZoom(point,19); 
    var gc = new BMap.Geocoder(); 
          translateCallback = function (point){ 
              var marker = new BMap.Marker(point); 
              map.addOverlay(marker); 
              map.setCenter(point); 
              gc.getLocation(point, function(rs){ 
                    var addComp = rs.addressComponents; 
                    if(addComp.province!==addComp.city){ 
                      var sContent = 
                      "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>你当前的位置是：</h4>" +  
                      "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
                      "</div>";} 
                    else{ 
                      var sContent = 
                      "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>你当前的位置是：</h4>" +  
                      "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+ addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
                      "</div>"; 
                    } 
                    var infoWindow = new BMap.InfoWindow(sContent); 
                    map.openInfoWindow(infoWindow,point); 
              });  
              marker.addEventListener("click", function () {  
      			
     	         map.openInfoWindow(infoWindow,point);  
     	         
     	     }); 
          }                     
      BMap.Convertor.translate(point,0,translateCallback);  
} 
//定位失败时，执行的函数 
function locationError(error) 
{ 
	switch(error.code) 
	{ 
	case error.PERMISSION_DENIED: 
		alert("无法完成定位请求"); 
		break; 
	case error.POSITION_UNAVAILABLE: 
		alert("位置信息不可用"); 
		break; 
	case error.TIMEOUT: 
		alert("请求超时"); 
		break; 
	case error.UNKNOWN_ERROR: 
		alert("位置错误发生了"); 
		break; 
	} 
} 
function showInformation(marker,updatetime,point,map){
	 var gc = new BMap.Geocoder(); 
	 marker.addEventListener("click", function(){
			 gc.getLocation(point, function(rs){ 
	 			var addComp = rs.addressComponents; 
	 			if(addComp.province!==addComp.city){ 
	 				var sContent = 
	 					"<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>该项目经理在:"+updatetime+"的位置是：</h4>" +  
	 					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
	 					"</div>";} 
	 			else{ 
	 				var sContent = 
	 					"<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+"位置是：</h4>" +  
	 					"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+ addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber+"</p>" +  
	 					"</div>"; 
	 			} 
	 			var infoWindow = new BMap.InfoWindow(sContent); 
	 			map.openInfoWindow(infoWindow,point);
	 		});
	 })}
