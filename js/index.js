$(function(){	
//头部菜单滚动
	window.onscroll = function(){
	    var sTop = $(window).scrollTop();
	    if(sTop>=410){
	    	$(".z-header").css("background","#092852");
	    }else{
	    	$(".z-header").css("background","transparent");
	    }
	    console.log(sTop)
	}
	$('.menu>li').hover(function(e) {
	        $(this).find("ul").stop().slideToggle()
	});
})