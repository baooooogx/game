/*图片轮播效果*/
$(document).ready(function(){
    ImgPlay();
});

function ImgPlay() {
	var loop = -999, index = 1,value;  //index表示第几个儿子节点，value为当前幻灯片绑定的值
	var length = $(".bgx_broadcast_father").children().length;
	var pre = 0;
	Start();
	function Start() {
		loop = setInterval(Play,3000);
	};
   	function Play() {
    	$(".bgx_broadcast_father").children().eq(pre).fadeOut(500);
    	$(".bgx_broadcast_img").children("div").eq(pre).removeClass("bgx_current_pic");
    	$(".bgx_broadcast_father").children().eq(index).fadeIn(2000);
    	$(".bgx_broadcast_img").children("div").eq(index).addClass("bgx_current_pic");
    	pre = index;
    	index++;
    	if (index == length) {
    		index =0;
    	}
    }
    //点击向前箭头 选择前一张幻灯片
    $(document).on("click",".bgx_broadcast_image1",function() {
	    var nowValue = $(".bgx_current_pic").data("value");
	    if(nowValue == 0) {
	    	value = 3;
	    } else {
	    	value = nowValue - 1;
	    }
	    click();
	})
	//点击向后箭头 选择后一张幻灯片
	$(document).on("click",".bgx_broadcast_image2",function() {
	    var nowValue = $(".bgx_current_pic").data("value");
	    if(nowValue == 3) {
	    	value = 0;
	    } else {
	    	value = nowValue + 1;
	    }
	    click();
	})
    $(document).on("click",".bgx_click",function() {
    	value = $(this).data("value");
    	click();
    })
    $(document).on("mouseenter",".bgx_broadcast111,.bgx_broadcast_father",function() {
    	if (loop != -999) {
            clearInterval(loop);
            loop = -999;
    	}
    })
    $(document).on("mouseleave",".bgx_broadcast111,.bgx_broadcast_father",function() {
    	if(loop == -999){
			loop = setInterval(Play,3000);
    	}       
    });
    function click() {
    	if(value == 0) {
    		pre = length - 1;
    		index = value;
    	} else {
    		pre = value - 1;
    		index = value;
    	}
    	$(".bgx_broadcast_father").children().css("display","none");
    	$(".bgx_broadcast_img").children("div").removeClass("bgx_current_pic");
    	$(".bgx_broadcast_father").children().eq(index).fadeIn();
    	$(".bgx_broadcast_img").children("div").eq(index).addClass("bgx_current_pic");
    }
}

//日历切换效果 
var current_this; 
function DateDetail() {
	var week = $(".bgx_date_detail").parent("div").children("span").eq(0).html();  
	var month = $(".bgx_date_detail").parent("div").children("span").eq(1).html();
	var day = $(".bgx_date_detail").parent("div").children("span").eq(2).html();
	$(".bgx_detail_date").children("div").eq(0).html(month);
	$(".bgx_detail_date").children("div").eq(1).html(day);
	$(".bgx_detail_date").children("div").eq(2).html(week);
}
$(document).on("mouseenter",".bgx_data",function() {
	current_this = $(this);
	$(".bgx_data").css("width","78px");
	$(this).css("width","271px");
	$(this).append($(".bgx_date_detail"));
	DateDetail();
})
$(document).on("mouseleave",".bgx_center2_main",function() {
	current_this.css("width","271px");
})
$(document).on("mouseleave",".bgx_data",function() {
	current_this.css("width","78px");
})

//日历时间填充计算
var now = new Date();
var date = new Date(now-(now.getDay()-1)*86400000); 
var myDate = new Date(date);
var month = myDate.getMonth()+1;     //当前所在周周一的日期
var day = myDate.getDate();

now.setDate(myDate.getDate() + 0);     //当前所在周一时间往后N天日期计算
var mm = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);  //日期格式化
var dd = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();

$(document).ready(function() {
	for (var i = 0, n = 1; i < 7; i++, n++) {
		$(".bgx_center2_main").children("div").eq(i).find(".bgx_month").html(mm);
		$(".bgx_center2_main").children("div").eq(i).find(".bgx_day").html(dd);
		now.setDate(myDate.getDate() + n);  
		mm = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
		dd = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
	}
	var current_day = new Date().getDay();
	if(current_day == 0) {
		current_day = 7;
	}
	$(".bgx_data").css("width","78px");
	$(".bgx_center2_main").children("div").eq(current_day - 1).append($(".bgx_date_detail")).css("width","271px");
	DateDetail();
})

//滚动条插件调用 
$(document).ready(function() {
	$(".bgx_detail_game").jScrollPane();
})

//左侧hover调用ajax内容
var time = null;
var offset;
var myThis;
var flag;
$(document).on("mouseenter",".bgx_list > ul > li",function() {
	offset = $(this).offset();
	myThis = $(this);
    popMyDiv();
    if(time != null) {
    	clearTimeout(time);
    	time = null;
    }
})
function popMyDiv() {
	$.ajax({
        url:"selection.html",
        dataType:"text",
        success:function(msg) {
        	$(document.body).append(msg);
        	$(".bgx_selection").css({"top":offset.top + 45 + "px","left":offset.left + "px"});
            removeClass();
            myThis.addClass("bgx_current_game");
            myThis.find("span").addClass("bgx_decription");
        	$(".bgx_select").jScrollPane();
        }
    });
}

$(document).on("mouseleave",".bgx_list > ul > li",function() {
    time = setTimeout("remove(),removeClass()",300);
})
$(document).on("mouseenter",".bgx_selection",function() {
	$(".bgx_selection").css("display","");
	if(time != null) {
		clearTimeout(time);
		time = null;
	}
})
$(document).on("mouseleave",".bgx_selection",function() {
	remove();
	removeClass();
})

function remove() {
	$(".bgx_selection").remove();
}
function removeClass() {
	$(".bgx_list > ul > li").removeClass("bgx_current_game");
	$(".bgx_list > ul > li span").removeClass();
}

//头部点击变化 
$(document).ready(function() {
	offset = $(".bgx_home").offset();
	$(".bgx_float").css({"top":"61px","left":offset.left - 10,"width":"61px","overflow":"hidden"});
})
$(document).on("click",".bgx_head_click",function() {
	offset = $(this).offset();
	$(".bgx_float").css({"top":"61px","left":offset.left - 10,"width":"81px"});
	$(".bgx_head_click").removeClass("bgx_current_click");
	$(".bgx_home").removeClass("bgx_current_click");
	$(this).addClass("bgx_current_click");
})
$(document).on("click",".bgx_home",function() {
	offset = $(this).offset();
	$(".bgx_float").css({"top":"61px","left":offset.left - 10,"width":"61px","overflow":"hidden"});
	$(".bgx_head_click").removeClass("bgx_current_click");
	$(this).addClass("bgx_current_click");
})
$(document).on("click",".bgx_second_head_click",function() {
	$(".bgx_second_head_click").removeClass("bgx_current_style")
	$(this).addClass("bgx_current_style");
})

$(document).on("click",".bgx_all_game > div",function() {
	$(".bgx_all_game > div").removeClass("bgx_current_all");
	$(this).addClass("bgx_current_all");
})

$(document).on("mouseenter",".bgx_game_intro_recommend",function() {
	offset = $(this).offset();
    myThis = $(this);
    myHover();
    if(time != null) {
    	clearTimeout(time);
    	time = null;
    }
})
function myHover() {
    $.ajax({
        url:"hover.html",
        dataType:"text",
        success:function(msg) {
            $(document.body).append(msg);
            $(".bgx_hover_fly").css({"top":offset.top - 72  ,"left":offset.left -118 });
        }
    });
}

$(document).on("mouseleave",".bgx_game_intro_recommend",function() {
	time = setTimeout("removeHover()",300);
})
$(document).on("mouseenter",".bgx_hover_fly",function() {
	$(".bgx_hover_fly").css("display","block");
	if(time != null) {
		clearTimeout(time);
		time = null;
	}
})
$(document).on("mouseleave",".bgx_hover_fly",function() {
	removeHover();
})
function removeHover() {
	$(".bgx_hover_fly").remove();
}

//左侧筛选
$(document).on("click",".bgx_game1",function() {
	$(".bgx_list ul li").css("display","block");
})
$(document).on("click",".bgx_role",function() {
	$(".bgx_list ul li").css("display","none");
	$(".bgx_list ul li").filter($(".bgx_list ul li[bgx-sort='role']")).css("display","block");
})
$(document).on("click",".bgx_war",function() {
	$(".bgx_list ul li").css("display","none");
	$(".bgx_list ul li").filter($(".bgx_list ul li[bgx-sort='war']")).css("display","block");
})
$(document).on("click",".bgx_leisure",function() {
	$(".bgx_list ul li").css("display","none");
	$(".bgx_list ul li").filter($(".bgx_list ul li[bgx-sort='leisure']")).css("display","block");
})
$(document).on("click",".bgx_grow",function() {
	$(".bgx_list ul li").css("display","none");
	$(".bgx_list ul li").filter($(".bgx_list ul li[bgx-sort='grow']")).css("display","block");
})