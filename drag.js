//IE10之前的浏览器不支持document.getElementByClassName()
function getByClass(clsName,parent){//必须的写在前面，可选的写后面,必须的是类名
	var oParent = parent ? document.getElementById(parent) : document,
	    eles = [],
	    elements = oParent.getElementsByTagName('*');
	for(var i = 0,l = elements.length; i < l; i++)
	{
		if(elements[i].className == clsName){//此处可以用正则表达式
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload = drag;

function drag(){
	//在标题区域按下，在页面中可以移动，释放鼠标时停止移动
	var oTitle = getByClass('login_logo_webqq','loginPanel')[0];
	//alert(oTitle);
	//拖拽：鼠标按下
	oTitle.onmousedown = fnDown;
	//关闭点击右上角的叉号
	var oClose = document.getElementById("ui_boxyClose");
	oClose.onclick = function(){
		document.getElementById("loginPanel").style.display = "none";
	}
	//切换状态
	var loginState = document.getElementById("loginState"),
	stateList = document.getElementById("loginStatePanel"),
	lis = stateList.getElementsByTagName("li"),
	stateTxt = document.getElementById("login2qq_state_txt"),
	loginStateShow = document.getElementById("loginStateShow");

	loginState.onclick = function(e){
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancleBubble = true;
		}
		stateList.style.display = "block";
	}


	//鼠标滑过离开和点击状态列表时
	for(var i = 0,l=lis.length;i<l;i++){
		lis[i].onmouseover = function(){
			this.style.background = "#567";
		}
		lis[i].onmouseout = function(){
			this.style.background = "#fff";
		}
		lis[i].onclick=function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancleBubble = true;
			}
			var id = this.id;
			stateList.style.display = "none";
			stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
			loginStateShow.className = "";
			loginStateShow.className="login-state-show "+id;
		}
	} 
	//点击空白处隐藏列表
	document.onclick = function(){
		stateList.style.display = "none";
	}



}
//鼠标按下时，原理点下的位置，与光标的位置相同
function fnDown(event){
	event = event || window.event;
	var  oDrag = document.getElementById("loginPanel");
	     //光标按下时，光标和面板之间的距离
		 disX = event.clientX -oDrag.offsetLeft,
		 disY = event.clientY - oDrag.offsetTop;
	//移动
	document.onmousemove=function(event){
		event = event || window.event;
		fnMove(event,disX,disY);

	}
	//释放鼠标
	document.onmouseup = function(event){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}





function fnMove(e,posX,posY){
	var oDrag = document.getElementById("loginPanel"),
	 l = e.clientX-posX,
	 t = e.clientY-posY, 
	 winW=document.documentElement.clientWidth || document.body.clientWidth,
	 winH=document.documentElement.clientHeight || document.body.clientHeight,
	 maxW = winW - oDrag.offsetWidth,
	 maxH = winH - oDrag.offsetHeight;
	 if(l<0){
	 	l=0;
	 }else if(l>maxW){
	 	l = maxW-10;
	 }
	 if(t<0){
	 	t=10;
	 }else if(t>maxH){
	 	t=maxH;
	 }
	oDrag.style.left = l + "px";
	oDrag.style.top = t +"px";
}