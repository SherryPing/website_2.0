$(function(){
   	 //	各页面导入导航栏和底部
	$(".header-top").load("./header.html",function(){
		$('.menu>li').hover(function(e) {
		    $(this).find("ul").stop().slideToggle()
		});
	});
	$(".footer-bottom").load("./footer.html");
	
	//  数字滚动--要配合css里对应样式
    $.fn.numberAnimate = function(setting) {
        var defaults = {
            speed : 1000,//动画速度
            num : "", //初始化值
            iniAnimate : true, //是否要初始化动画效果
            symbol : '',//默认的分割符号，千，万，千万
            dot : 0 //保留几位小数点
        }
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting);

        //如果对象有多个，提示出错
        if($(this).length > 1){
            alert("just only one obj!");
            return;
        }

        //如果未设置初始化值。提示出错
        if(setting.num == ""){
            alert("must set a num!");
            return;
        }
        var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
        <span class="mt-number-animate-span">0</span>\
        <span class="mt-number-animate-span">1</span>\
        <span class="mt-number-animate-span">2</span>\
        <span class="mt-number-animate-span">3</span>\
        <span class="mt-number-animate-span">4</span>\
        <span class="mt-number-animate-span">5</span>\
        <span class="mt-number-animate-span">6</span>\
        <span class="mt-number-animate-span">7</span>\
        <span class="mt-number-animate-span">8</span>\
        <span class="mt-number-animate-span">9</span>\
        <span class="mt-number-animate-span">.</span>\
      </div>';

        //数字处理
        var numToArr = function(num){
            num = parseFloat(num).toFixed(setting.dot);
            if(typeof(num) == 'number'){
                var arrStr = num.toString().split("");
            }else{
                var arrStr = num.split("");
            }
            //console.log(arrStr);
            return arrStr;
        }

        //设置DOM symbol:分割符号
        var setNumDom = function(arrStr){
            var shtml = '<div class="mt-number-animate">';
            for(var i=0,len=arrStr.length; i<len; i++){
                if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
                    shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
                }else{
                    shtml += nHtml.replace("{{num}}",arrStr[i]);
                }
            }
            shtml += '</div>';
            return shtml;
        }

        //执行动画
        var runAnimate = function($parent){
            $parent.find(".mt-number-animate-dom").each(function() {
                var num = $(this).attr("data-num");
                num = (num=="."?10:num);
                var spanHei = $(this).height()/11; //11为元素个数
                var thisTop = -num*spanHei+"px";
                if(thisTop != $(this).css("top")){
                    if(setting.iniAnimate){
                        //HTML5不支持
                        if(!window.applicationCache){
                            $(this).animate({
                                top : thisTop
                            }, setting.speed);
                        }else{
                            $(this).css({
                                'transform':'translateY('+thisTop+')',
                                '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                                '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                                '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                                '-o-transform':'translateY('+thisTop+')',
                                '-ms-transition':setting.speed/1000+'s',
                                '-moz-transition':setting.speed/1000+'s',
                                '-webkit-transition':setting.speed/1000+'s',
                                '-o-transition':setting.speed/1000+'s',
                                'transition':setting.speed/1000+'s'
                            });
                        }
                    }else{
                        setting.iniAnimate = true;
                        $(this).css({
                            top : thisTop
                        });
                    }
                }
            });
        }

        //初始化
        var init = function($parent){
            //初始化
            $parent.html(setNumDom(numToArr(setting.num)));
            runAnimate($parent);
        };

        //重置参数
        this.resetData = function(num){
            var newArr = numToArr(num);
            var $dom = $(this).find(".mt-number-animate-dom");
            if($dom.length < newArr.length){
                $(this).html(setNumDom(numToArr(num)));
            }else{
                $dom.each(function(index, el) {
                    $(this).attr("data-num",newArr[index]);
                });
            }
            runAnimate($(this));
        }
        //init
        init($(this));
        return this;
    }	
  
	// 头部菜单滚动
   	var time=1; //fofpower页面数字滚动只滚动一次
	window.onscroll = function(){
		//菜单栏变换事件
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
	 	//fofeasy海量基金数据滚动效果
	    if(sTop>=900&&time==1){	    	
			$(".fofeasy #num1").numberAnimate({num:7980, speed:1000});
		    $(".fofeasy #num2").numberAnimate({num:175168, speed:1000});
		    time++;
	    }
	     
	    //首页动态效果
	    var div = $('.wePrc');
        if (sTop >= 500) $(div[0]).css("opacity","1");
        if (sTop >= 1000) $(div[1]).css("opacity","1");
        if (sTop >= 1500) $(div[2]).css("opacity","1");
        if (sTop >= 2000) {
            $(div[3]).css("opacity","1");
        };

	}

	//fofpower全面分析
	$('.fofpower .round').hover(function(e) {
		var index=$(this).index()-2;	
		var src="./img/pic-cen"+index+".png";
		if(index==3){
			index=5;
		}else if(index==5){
			index=3;
		}		
		$('.fofpower .analys .card').removeClass("active");
	    $('.fofpower .analys .card').eq(index).addClass("active");
	    $('.fofpower .analys #center-img').attr("src",src);
	    $('.fofpower .analys .round').removeClass("active");
	    $(this).addClass("active");
	});
	
//	首页
 	$(function() {
        $("#manUl .ourPartners").hover(function() {
            $(this).addClass("on")
                .siblings().addClass("off")
        }, function() {
            $(this).parent().children().removeClass("off");
            $(this).parent().children().addClass("on");
        })
    });
    //公募数据库
    $(".mutual #num1").numberAnimate({num:7892, speed:1000});
    $(".mutual #num2").numberAnimate({num:133, speed:1000});
    $(".mutual #num3").numberAnimate({num:3025, speed:1000});
    //私募数据库
    $(".mutual #num4").numberAnimate({num:17364, speed:1000});
    $(".mutual #num5").numberAnimate({num:34066, speed:1000});
    $(".mutual #num6").numberAnimate({num:6025, speed:1000});
	//主页照片滚动
	if(document.getElementById('movediv')){
		 var odiv = document.getElementById('movediv');
	    var oul = odiv.getElementsByTagName('ul')[0];
	    var ali = oul.getElementsByTagName('li');
	    var spa = -2;
	    oul.innerHTML = oul.innerHTML + oul.innerHTML;
	    oul.style.width = ali[0].offsetWidth * ali.length + 'px';
	    function move() {
	        if (oul.offsetLeft < -oul.offsetWidth / 2) {
	            oul.style.left = '0';
	        }
	        if (oul.offsetLeft > 0) {
	            oul.style.left = -oul.offsetWidth / 2 + 'px'
	        }
	        oul.style.left = oul.offsetLeft + spa + 'px';
	    }
	    var timer = setInterval(move, 30)
	
	    odiv.onmousemove = function() {
	        clearInterval(timer);
	    }
	    odiv.onmouseout = function() {
	        timer = setInterval(move, 30)
	    };
	}
//	关于我们图片滚动
	var arr=[1,2,3,4,0];
	$(".page-content .btn-right").click(function(){		
		arr.unshift(arr.pop());
		var imgs=$(".picture-box img");
		for(var i=0;i<imgs.length;i++){
			var ind="img-index"+arr[i];
			$(".picture-box img").eq(i).removeClass();
			$(".picture-box img").eq(i).addClass(ind);
		}
	})
	$(".page-content .btn-left").click(function(){		
		arr.push(arr.shift());
		var imgs=$(".picture-box img");
		for(var i=0;i<imgs.length;i++){
			var ind="img-index"+arr[i];
			$(".picture-box img").eq(i).removeClass();
			$(".picture-box img").eq(i).addClass(ind);
		}
	})
	
//	评价服务CMVR原则悬浮切换
	$(".assess .aeesee-con1 .card").hover(function(){
		$(this).find(".ori").css("display","none");
		$(this).find(".act").fadeIn(1000);
	},function(){
		$(this).find(".act").css("display","none");
		$(this).find(".ori").fadeIn(1000);
	})
//	跳转申请试用页面
	$(".s-btn").click(function(){
		window.location.href="applyFor.html";
	})
	
   



	
})