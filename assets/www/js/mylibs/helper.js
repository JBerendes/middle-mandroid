function reFresh(){document.location.reload(!0)}(function(e){navigator.userAgent.indexOf("Chrome")==-1&&setInterval("reFresh()",2e4),window.MBP=window.MBP||{},$(".btn").click(function(){AutoFugue.TestMethod()}),MBP.updateContent=function(e){$(".content").text(e)},MBP.viewportmeta=e.querySelector&&e.querySelector('meta[name="viewport"]'),MBP.ua=navigator.userAgent,MBP.scaleFix=function(){MBP.viewportmeta&&/iPhone|iPad/.test(MBP.ua)&&!/Opera Mini/.test(MBP.ua)&&(MBP.viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0",e.addEventListener("gesturestart",MBP.gestureStart,!1))},MBP.gestureStart=function(){MBP.viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6"},MBP.hideUrlBar=function(){var e=window,t=e.document;if(!location.hash||!e.addEventListener){window.scrollTo(0,1);var n=1,r=setInterval(function(){t.body&&(clearInterval(r),n="scrollTop"in t.body?t.body.scrollTop:1,e.scrollTo(0,n===1?0:1))},15);e.addEventListener("load",function(){setTimeout(function(){e.scrollTo(0,n===1?0:1)},0)},!1)}},MBP.fastButton=function(e,t){this.element=e,this.handler=t,e.addEventListener&&(e.addEventListener("touchstart",this,!1),e.addEventListener("click",this,!1))},MBP.fastButton.prototype.handleEvent=function(e){switch(e.type){case"touchstart":this.onTouchStart(e);break;case"touchmove":this.onTouchMove(e);break;case"touchend":this.onClick(e);break;case"click":this.onClick(e)}},MBP.fastButton.prototype.onTouchStart=function(t){t.stopPropagation(),this.element.addEventListener("touchend",this,!1),e.body.addEventListener("touchmove",this,!1),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY,this.element.style.backgroundColor="rgba(0,0,0,.7)"},MBP.fastButton.prototype.onTouchMove=function(e){(Math.abs(e.touches[0].clientX-this.startX)>10||Math.abs(e.touches[0].clientY-this.startY)>10)&&this.reset()},MBP.fastButton.prototype.onClick=function(e){e.stopPropagation(),this.reset(),this.handler(e),e.type=="touchend"&&MBP.preventGhostClick(this.startX,this.startY),this.element.style.backgroundColor=""},MBP.fastButton.prototype.reset=function(){this.element.removeEventListener("touchend",this,!1),e.body.removeEventListener("touchmove",this,!1),this.element.style.backgroundColor=""},MBP.preventGhostClick=function(e,t){MBP.coords.push(e,t),window.setTimeout(function(){MBP.coords.splice(0,2)},2500)},MBP.ghostClickHandler=function(e){for(var t=0,n=MBP.coords.length;t<n;t+=2){var r=MBP.coords[t],i=MBP.coords[t+1];Math.abs(e.clientX-r)<25&&Math.abs(e.clientY-i)<25&&(e.stopPropagation(),e.preventDefault())}},e.addEventListener&&e.addEventListener("click",MBP.ghostClickHandler,!0),MBP.coords=[],MBP.splash=function(){var t=navigator.platform==="iPad"?"h/":"l/";e.write('<link rel="apple-touch-startup-image" href="/img/'+t+'splash.png" />')},MBP.autogrow=function(e,t){function n(e){var t=this.scrollHeight,n=this.clientHeight;t>n&&(this.style.height=t+3*i+"px")}var r=t?t:12,i=e.currentStyle?e.currentStyle.lineHeight:getComputedStyle(e,null).lineHeight;i=i.indexOf("px")==-1?r:parseInt(i,10),e.style.overflow="hidden",e.addEventListener?e.addEventListener("keyup",n,!1):e.attachEvent("onkeyup",n)}})(document);