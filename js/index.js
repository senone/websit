/*
* @Author: senon
* @Date:   2017-02-04 16:08:47
* @Last Modified by:   senon
* @Last Modified time: 2017-02-06 15:36:46
*/

'use strict';


	( function($){
		$(function(){
		//垂直轮播图
		var swiperV = new Swiper('.swiper-v',{
		pagination:'.swiper-pagination-v',
		direction:'vertical',
		paginationClickable: true,
		mousewheelControl : true,
		speed:700,
		onSlideChangeStart:function(swiper){
			$('.header').toggleClass('header-bg',swiper.activeIndex ===0);
			var run = $('#echarts').attr('data-run');
			if(swiper.activeIndex==3 && run =='true'){
				draw();
			}
            else if(swiper.activeIndex==2){
                $('.swiper-slide-v .piano>ul').addClass('fadeLeft');
            }
            //  else if(swiper.activeIndex==1){
            //     $('.swiper-slide-v > .game-lists').addClass('fadeDown');
            // }
		}
		});
		//水平轮播图
		var swiperH = new Swiper('.swiper-l',{
		pagination:'.swiper-pagination-l',
		paginationClickable: true,
		effect:'fade',
		autoplay:2500,
		speed:1000,
		autoplayDisableOnInteraction:false,
		});

		var color = ['#7BAABE', '#f90','#707d8d'];
		$('.swiper-slide-v').each(function(index, el) {
			$(this).css({
				backgroundColor: color[index]
			});
		});
		//设置第1栏背景图片
		var imgs_1 = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg'];
		var imgs_2 = ['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg','img/05.jpg'];
		var imgs_3 = ['img/001.jpg','img/002.jpg','img/003.jpg','img/004.jpg','img/005.jpg','img/006.jpg','img/007.jpg','img/008.jpg'];
		bImg('.swiper-slide-l',imgs_1);
		bImg('.swiper-pagination-l span',imgs_2);
        bImg('.swiper-slide-v .piano li',imgs_1);
		setSrc('.swiper-slide-v > .game-lists li img',imgs_3);
		//绑定元素背景图片
		 function bImg(dom,data){
		 	$(dom).each(function(index, el) {
		 		$(this).css({
		 			backgroundImage: "url("+data[index]+")"
		 		});
		 	});
		 };

		  function setSrc(dom,data){
		  	$(dom).each(function(index, el) {
		  		$(this).attr('src',""+data[index]+"")
		  	});
		  }
		 //解决窗口变化时swiper更新；
		 $(window).on('resize', function(event) {
		 	bImg('.swiper-pagination-l span',imgs_2);
            draw();	
		 });
		  
   
		 //登录窗口动画
    $("#log-bottom .common,.log-title span").on('click', function(event) {
    	$('#log-box').animate({top:'-20px'}, 'fast').fadeOut('fast');
    	$('#login .mask').fadeOut('fast'); 
    });
    $('.nav-right .login').on('click', function(event) {
    	$('#log-box').animate({top:'60px'}, 'fast').fadeIn('fast');
    	$('#login .mask').fadeIn('fast');  
    	//点击空白处登录窗口消失
    	$(document).on('mousedown', function(event) {
    	var event = event || window.event;
    	var target = event.target.className;
    	if(target == 'mask'){
    		$('#log-box').animate({top:'-20px'}, 'fast').fadeOut('fast');
    	$('#login .mask').fadeOut('fast'); 
    	}
    });
    });

   		//第二页判断鼠标进入方向
	 $(".swiper-slide-v > .game-lists .list-item").on("mouseenter mouseleave",function(e) {
                     var that = $(this);  // 先把当前元素存起来
                     var w = $(this).width(); // 得到盒子宽度
                     var h = $(this).height();// 得到盒子高度
                     var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
                     // 获取x值
                     var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
                     // 获取y值
                     var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                     if(e.type == 'mouseenter'){
                     	switch(direction) {
                     		case 0 :
                     		comeOn("topIn");
                     		break;
                     		case 1 :
                     		comeOn("rightIn");
                     		break;
                     		case 2 :
                     		comeOn("downIn");
                     		break;
                     		case 3 :
                     		comeOn("leftIn");
                     		break;

                     	}
                     }
                     else{
                     	switch(direction){
                     		case 0:
                     		leave("topOut");
                     		break;
                     		case 1:
                     		leave("rightOut");
                     		break;
                     		case 2:
                     		leave("downOut");
                     		break;
                     		case 3:
                     		leave("leftOut");
                     		break;

                     	}
                     }
                     function comeOn(str) {
                     	that.children('span').removeClass().addClass(str);                       
                     }
                     function leave(str) {                   
                     	that.children('span').removeClass().addClass(str);
                     }
                 });
   		 
            var pText=["皮皮皮皮皮皮皮皮卡丘","GAY&BOY","草帽路飞","行走的鸡蛋","美少女びしょうじょ","你是我的眼","挂在树上之黄毛","Your Superman"];
            $(".swiper-slide-v > .game-lists .list-item span").each(function(index, el) {
                $(this).text(pText[index]);
            });

            $(".swiper-slide-v .piano li").on('mouseenter', function(event) {
                $(this).stop().animate({width:'800px'}, 500).siblings().stop().animate({width:"50px"}, 500);
   
            }).on('mouseleave', function(event) {
                $(".swiper-slide-v .piano li").stop().animate({width:'200px'}, 500);
            });;
	})
	})(jQuery)
