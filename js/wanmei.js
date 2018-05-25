function startMove(obj, json,fn) {
	//obj表示运动的对象
	//json传入的运动值{width:200,height:200}
	//fn表示需要执行的多级运动
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		//处理透明度
		var Bstop = true; // 假设所有东西都到达了
		for (attr in json) {
			//1取当前值
			var Icurrent = 0;
		if(attr == 'opacity') {
			Icurrent = parseInt(parseFloat(getStyle(obj, attr)) * 100); //干掉小数
			//透明度参数处理
		} else {
			Icurrent = parseInt(getStyle(obj, attr));
			//getStyle(obj,'width')获取传入元素的值
		}
			//2算速度	
		var speed = (json[attr] - Icurrent) / 4;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//3检测停止
		if(Icurrent != json[attr]) {
			Bstop = false;  //检测如果某一个值没到 就为Fasle
			
		} 
		if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (Icurrent + speed) + ')';
				obj.style.opacity = (Icurrent + speed) / 100;
			} else {
				obj.style[attr] = Icurrent + speed + 'px';
			}
		};
		if(Bstop){ //如果都到了 则关闭定时器
			clearInterval(obj.timer);	
			if(fn){
				
				fn();
			}
		}
	}, 50);
};
//取当前传入属性的属性值
function getStyle(obj, attr) {
	// attr 表示属性 比如width height;offsetWidth相关问题的决绝方法;
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};
//====================================================
//取元素的class属性
function getClass(nParent,nClass){
	var aEle = document.getElementsByTagName("*");//去当前父元素的所有属性
	var resent = [];
	for (var i = 0;i < aEle.length;i ++) {
		if(aEle[i].className == nClass){
			resent.push(aEle[i]);
		}
	};
	return resent;
};