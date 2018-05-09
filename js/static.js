$(function(){

	// /* requestAnimationFrame回退代码，避免浏览器不兼容 */
	// var lastTime = 0;
 //    var vendors = ['ms', 'moz', 'webkit', 'o'];
 //    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
 //        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
 //        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
 //    }
 //    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
 //        var currTime = new Date().getTime();
 //        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
 //        var id = window.setTimeout(function() {
 //            callback(currTime + timeToCall);
 //        }, timeToCall);
 //        lastTime = currTime + timeToCall;
 //        return id;
 //    };
 //    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
 //        clearTimeout(id);
 //    };
 //    /* Polyfill代码结束 */

	var count = $('.bannerPic>li').length;
	var picWidth = $('.bannerPic>li').eq(0).width();
	var circle = "";
	var picNum = 1;
	var index;
	
	$(window).resize(function(){
		picWidth = $('.bannerPic>li').eq(0).width();
	});
	$(window).scroll(function(){
		if($(window).scrollTop() > 50){
			$('.topCon').fadeIn(300);
		}else{
			$('.topCon').fadeOut(300);
		}
	});
	$('.bannerControl ul').on('click','li',function(e){
		clearInterval(t);
		index = $(e.target).index();
		$('.bannerPic>li').eq(0).animate({marginLeft: -(index*picWidth)},500);
		$('.bannerControl ul li').removeClass('focus');
		$(e.target).addClass('focus');
	});
	$('.bannerControl').on('mouseleave','ul',function(){
		picNum = index;
		t = setInterval(function(){
			if(picNum > count -1) picNum = 0;
				bannerMove(picNum,picWidth);
				picNum++;
			},6000);
	});
	if($('.bannerPic').length > 0){
		for (var i = count - 1; i >= 0; i--) {
			circle += "<li></li>"
		}
		var t = setInterval(function(){
			if(picNum > count -1) picNum = 0;
			bannerMove(picNum,picWidth);
			picNum++;
		},6000);
		$('.bannerControl ul').html(circle);
		$('.bannerControl ul li').eq(0).addClass('focus');
	}
	
	$('.topCon').click(function(){
		topCon();
	});
	$('.video').click(function(){
		$('.video-box').css('display','block');
		$('.video-box video').attr('src','assest/test.mp4');
	});
	$('.pCreate').click(function(){
		$('.pc').css('display','block');
	});
	$('.close').click(function(){
		if($('.video-box').length > 0){
			$('.video-box').css('display','none');
			$('.video-box video').attr('src','');
		}
		if($('.pc').length > 0){
			$('.pc').css('display','none');
		}
		
	});

});

function bannerMove(picNum,picWidth){
	$('.bannerPic>li').eq(0).animate({marginLeft: -(picNum*picWidth)},500);
	$('.bannerControl ul li').removeClass('focus');
	$('.bannerControl ul li').eq(picNum).addClass('focus');
};
function topCon(){
	$('document,html,body').animate({scrollTop: 0},500);
}