function seeimage(res){
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='"+res.currentLoc+"'/>图集预览</div>"+  
			"<div class='contents' id='allmap'  style='text-align:center;height:580px;margin:auto auto;'>" +
			"<div class='spinner'>"+
			"<div class='bounce1'></div>"+
			"<div class='bounce2'></div>"+
			"<div class='bounce3'></div>"+
			"</div>"+
			"</div>"+
			"</div>");
	var yxzlurl="/ipad/intopieces/selectAllImage.json";
	$.get(wsHost+yxzlurl,{cid:res.customerId,pid:res.productId},callbackfunction);
	function  callbackfunction (json){
	
	var obj = $.evalJSON(json);
	var td="";
	for(var i=0;i<obj.size;i++){
		td=td+  "<a href='data:image/png;base64,"+obj.result[i].uri+"'  data-type='image'>"+
        "<img src='data:image/png;base64,"+obj.result[i].uri+"' style='width:400px;height:200px;padding-left:3px;' border='0'/>"+
        "</a>";
	}
	window.scrollTo(0,0);//滚动条回到顶端
	$("#mainPage").html("<div class='title'><img src='images/back.png' onclick='"+res.currentLoc+"'/>图集预览</div>"+ 
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
	}
			
			
			
			
/*			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			"<div class='gallery' style='margin-top:50px'>"+
			"<a href='images/1.jpg' data-size='600x500' data-med='images/1.jpg' data-med-size='1920x1200'>"+
			"<img src='images/1.jpg' alt='' style='width:500px;'></a>"+
		"</div>"+
		"<p><input type='button' class='btn btn-large btn-primary' value='上一页' id = 'syy' /></p>"+
		"<div class='pswp' tabindex='-1' role='dialog' aria-hidden='true'>"+
			"<div class=''pswp__b'></div>"+
			"<div class='pswp__scroll-wrap'>"+
				"<div class='pswp__container'>"+
					"<div class='pswp__item'></div>"+
					"<div class='swp__item'></div>"+
					"<div class='pswp__item'></div>"+
				"</div>"+
				"<div class='pswp__ui pswp__ui--hidden'>"+
					"<div class='pswp__top-bar' style='opacity:0;'>"+
						"<div class='pswp__counter'></div>"+
						"<button class='pswp__button pswp__button--close' title='Close()'></button>"+
						"<button class='pswp__button pswp__button--share' title='Share'></button>"+
						"<button class='pswp__button pswp__button--fs' title='Toggle fullscreen'></button>"+
						"<button class='pswp__button pswp__button--zoom' title='Zoom in/out'></button>"+
						"<div class='pswp__preloader'>"+
							"<div class='pswp__preloader__icn'>"+
								"<div class='pswp__preloader__cut'>"+
									"<div class='pswp__preloader__donut'></div>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<div class='pswp__loading-indicator'>"+
						"<div class='pswp__loading-indicator__line'></div>"+
					"</div>"+
					"<div class='pswp__share-modal pswp__share-modal--hidden pswp__single-tap'>"+
						"<div class='pswp__share-tooltip'>"+
							"<a href='#' class='pswp__share--facebook'></a>"+
							"<a href='#' class='pswp__share--twitter'></a>"+
							"<a href='#' class='pswp__share--pinterest'></a>"+
							"<a href='#' download class='pswp__share--download'></a>"+
						"</div>"+
					"</div>"+
					"<button class='pswp__button pswp__button--arrow--left' title='Previous (arrow left)'></button>"+
					"<button class='pswp__button pswp__button--arrow--right' title='Next (arrow right)'></button>"+
					"<div class='pswp__caption'>"+
						"<div class='pswp__caption__center'></div>"+
					"</div>"+
				"</div>"+
			"</div>"+
			"</div>"+
		"</div>");
	$(".right").hide();
	$("#mainPage").show(); 
	$(function(){
		$('.gallery').initPhotoSwipeFromDOM();
		initPhotoSwipeFromDOM('.gallery');
	});*/
}	
			
	  