$(function(){
//	导航栏点击
//	$(".header-top").on("click",'.lic',function(){
//		console.log("888")
//		$(this).addClass("active")
//	})
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
//          alert("just only one obj!");
            return;
        }

        //如果未设置初始化值。提示出错
        if(setting.num == ""){
//          alert("must set a num!");
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
    
    //获取头部url参数
	var geturlParams = function(url) {
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest
	}
	var url = location.search; //获取url中"?"符后的字串   
	var name = geturlParams(url).name;
	// 头部菜单滚动
	var mutualNum=8037;
	var mutualOrgNum=133;
	var mutualManageNum=3024;
	var hedgeNum=176083;	
	var hedgeOrgNum=34046;	
	var hedgeManageNum=5567;	
	function pData(time){
//		var params = {
//      	'chose':chose
//      }
		$.ajax({
            url: "https://wxapi.fofeasy.com/base/fund/home/fund_about_count",
//			url: "http://192.168.11.135:8000/base/fund/home/fund_about_count",
            type: 'get',
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (resp) {
                if(resp.success){
                	var hedgeAll=resp.records.hedge;
                	var mutualAll=resp.records.mutual;
                	var staticdate=resp.records.hedge.date;
                	hedgeNum=hedgeAll.fund;
            		hedgeOrgNum=hedgeAll.org;
            		hedgeManageNum=hedgeAll.person;
            		mutualNum=mutualAll.fund;
            		mutualOrgNum=mutualAll.org;
            		mutualManageNum=mutualAll.person;           		           		
                	if(name=="hedge"){       
                		$(".mutual #static-hedge-date").text(staticdate);
            			$(".mutual #num4-1").text(hedgeNum);
            			$(".mutual #num5-1").text(hedgeOrgNum);
            			$(".mutual #num6-1").text(hedgeManageNum);
                		$(".mutual #num4").numberAnimate({num:hedgeNum, speed:1000});
					    $(".mutual #num5").numberAnimate({num:hedgeOrgNum, speed:1000});
					    $(".mutual #num6").numberAnimate({num:hedgeManageNum, speed:1000});					    
                	}else if(name=="mutual"){
                		$(".mutual #static-mutual-date").text(staticdate);
            			$(".mutual #num1-1").text(mutualNum);
            			$(".mutual #num2-1").text(mutualOrgNum);
            			$(".mutual #num3-1").text(mutualManageNum);
                		$(".mutual #num1").numberAnimate({num:mutualNum, speed:1000});
					    $(".mutual #num2").numberAnimate({num:mutualOrgNum, speed:1000});
					    $(".mutual #num3").numberAnimate({num:mutualManageNum, speed:1000});
                	}else if(name=="fofeasy"){
                		if(time==1){
                			$(".fofeasy #num1").numberAnimate({num:mutualNum, speed:1000});
	    					$(".fofeasy #num2").numberAnimate({num:hedgeNum, speed:1000});
                		}
            			$(".fofeasy .static-fofeasy-date").text(staticdate);
            			var hedgeDiv="";
            			var mutualDiv="";
            			for(var i=0;i<hedgeAll.fund_type.length;i++){
            				hedgeDiv += "<div>"+hedgeAll.fund_type[i].type_name+":"+hedgeAll.fund_type[i].num+"</div>";
            			}
            			for(var i=0;i<mutualAll.fund_type.length;i++){
            				mutualDiv += "<div>"+mutualAll.fund_type[i].type_name+":"+mutualAll.fund_type[i].num+"</div>";
            			}
            			$(".fofeasy #mutual-con").html(mutualDiv);
	    				$(".fofeasy #hedge-con").html(hedgeDiv);
               		
                	}
                }
            }
        });
	}
	if(name=="fofeasy"||name=="mutual"||name=="hedge"){
		pData();
	}
	
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
	    	if($(".header-top").hasClass("darkRed")){
	    		$(".z-header").css("background","#bc222b");
	    	}else{
	    		$(".z-header").css("background","transparent");
	    	}
	    	
	    	$(".z-header_content .menu>li>a").css("color","#fff");
	    	$(".z-header_content .menu>li>span").css("color","#fff");
	    	$(".z-header").removeClass("bg-blue").addClass("bg-white");
	    	$(".z-header").addClass("bg-white");
	    }
	 	//fofeasy海量基金数据滚动效果
		
	    if(name=="fofeasy"&&sTop>=900&&time==1){
	    	setTimeout(function(){
	    		console.log(mutualNum,hedgeNum)
	    		if(mutualNum==0){
	    			pData(1);
	    		}else{
	    			$(".fofeasy #num1").numberAnimate({num:mutualNum, speed:1000});
	    			$(".fofeasy #num2").numberAnimate({num:hedgeNum, speed:1000});
	    		}
	    		
	    	},2000)	    	
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
	    var timer = setInterval(move, 50)
	
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
	//pernum:每页展示的子div的数量;pageNum:第几页
	function page(perNum,pageNum){
		var start=(pageNum-1)*perNum;
		var end=start+perNum;
		console.log(start,end)
		$(".pagination-div>div").css("display","none")
		$(".pagination-div>div").slice(start,end).css("display","block")
	}
//	指数分页
	$(".exponential .pagination li").click(function(){
			
		var pageNum=$(this).data("id");
		if(pageNum=="prev"){
			var tempNum=$(".exponential .pagination li.active").data("id")-1;
			if(tempNum>0){
				pageNum=tempNum;
			}else{
				pageNum=1;
			}
		}else if(pageNum=="next"){
			var tempNum2=Number($(".exponential .pagination li.active").data("id"))+1;
			var amount=$(this).prev().data("id")
			if(tempNum2<amount){
				pageNum=tempNum2;
			}else{
				pageNum=amount;			
			}
		}
		$(".exponential .pagination li").removeClass("active");	
		$(".exponential .pagination li[data-id="+pageNum+"]").addClass("active");
		page(3,pageNum)
	})
	
   



	
})