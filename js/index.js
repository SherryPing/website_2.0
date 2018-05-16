$(function(){	
//头部菜单滚动
	window.onscroll = function(){
	    var sTop = $(window).scrollTop();
	    if(sTop>=410){
	    	$(".z-header").css("background","#fff");
	    	$(".z-header_content .menu>li>a").css("color","#333");
	    	$(".z-header_content .menu>li>span").css("color","#333");
	    	$(".z-header").addClass("bg-blue");
	    }else{
	    	$(".z-header").css("background","transparent");
	    	$(".z-header_content .menu>li>a").css("color","#fff");
	    	$(".z-header_content .menu>li>span").css("color","#fff");
	    	$(".z-header").removeClass("bg-blue").addClass("bg-white");
	    	$(".z-header").addClass("bg-white");
	    }

	}
	$('.menu>li').hover(function(e) {
	        $(this).find("ul").stop().slideToggle()
	});
})