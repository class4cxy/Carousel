/**
 * by jdo
 * 20140625
 * summary : a slider depend on zetpo, which work for mobile
 */
define([
	"../zepto/zepto",
	"../zepto/event",
	"../zepto/data"
], function() {

	// if exist
	if ( $([]).carousel ) return;

	var slice = Array.prototype.slice;

	function slider ( element, options ) {

        // if ( !(this.dom = $(selector))[0] ) return console.log("Can't find the dom through "+selector);
        var $wrap = this.$wrap = $(element);
        // console.log($dom.find(".ui-carousel-item"))

        $.extend(this, {
            $inner : $wrap.find(".ui-carousel-inner"),
        	// son item 内部子节点
            $item : $wrap.find(".ui-carousel-item"),
            // 容器宽度
            // TODO 如果有需要可以做成自适应
            width : $wrap.width(),
            // webkitTransitionDuration
            webkitTransitionDuration : 300,
            // 控点节点列表
            dots : [],
            // 当前帧数
            current : 0,
            // 当前距离
            currentpos : 0,
            // 激活circle轮播方式，默认激活
            enableCircleLoop : !!1,
            // 激活自动轮播，默认激活
            // 自动轮播激活前提是激活了circle轮播方式
            enableAutoLoop : !!1,
            // 自动轮换时长
            autoLoopDuration : 5e3
        }, options)
        /*interface( this, options||{}, {

            // son item 内部子节点
            frames : $dom.find(".ui-carousel-item"),
            // 容器宽度
            // TODO 如果有需要可以做成自适应
            width : $dom.parent().width(),
            // webkitTransitionDuration
            webkitTransitionDuration : 300,
            // 控点节点列表
            dots : [],
            // 当前帧数
            current : 0,
            // 当前距离
            currentpos : 0,
            // 激活circle轮播方式，默认激活
            enableCircleLoop : !!1,
            // 激活自动轮播，默认激活
            // 自动轮播激活前提是激活了circle轮播方式
            enableAutoLoop : !!1,
            // 自动轮换时长
            autoLoopDuration : 5e3

        });*/

        // initialize ui
        _prepareForUI(this);
        // initialize event
        _prepareForEvt(this);
        // 
        _autoLoop.start.call(this)
    }

    $.extend(slider.prototype, {
        to : function ( index, noanim ) {
            // noanim 为无动画效果
            // if ( index >= 0 && index < this.$item.length ) {

                if ( this.current > this.$item.length ) return;
                // var time = !noanim ? this.webkitTransitionDuration : 0;
                this.$inner.css({
                    "-webkitTransitionDuration" : (!noanim ? this.webkitTransitionDuration : 0)+"ms",
                    "-webkitTransform" : 'translate3d('+-(this.width*(this.current=index))+'px, 0, 0)'
                });
                this.currentpos = -index * this.width;

                /*setClass(delClass(this.dots, "curr")[this.current = index], "curr");
                this.currentpos = -index * this.width*/
            // }
            /*if ( index >= this.$item.length ) {
                this.current = 0;
            }*/
        }
    });

    // 启动/关闭 自动轮换，便于其他地方调用
    var _autoLoop = function () {

        var timer;

        return {
            start : function () {
                var that = this;
                if (!timer && this.enableCircleLoop && this.enableAutoLoop) {
                    timer = setInterval(function() {
                        that.to(++that.current)
                    }, this.autoLoopDuration)
                }
            },
            stop : function () {
                if ( timer ) {
                    clearInterval(timer);
                    timer = null
                }
            }
        }
    }();

    // 初始化事件逻辑
    function _prepareForEvt ( that ) {

        var startpos,
            starttime,
            touchstartpos,
            speed = .4,
            framesLen = that.$item.length,
            max = that.width*(framesLen-1);

        that.$inner
        	.on("touchstart", function (evt) {

	            evt.stopPropagation();
	            evt.preventDefault();
	            if ( that.current <= -1 || that.current >= framesLen ) return;
	            var e = evt.touches[0];
	            touchstartpos = startpos = e.pageX;
	            starttime = +new Date;

	        }, !!1)

        	.on("touchmove", function (evt) {

	            _autoLoop.stop.call(that);
	            if ( that.current <= -1 || that.current >= framesLen ) return;
	            var e = evt.touches[0];
	            evt.preventDefault();

	            that.currentpos += e.pageX - startpos;
	            that.enableCircleLoop || ( that.currentpos = that.currentpos/(that.currentpos > 0 || that.currentpos < -max ? 3 : 1) )
	            // that.currentpos += (e.pageX - startpos)/(that.currentpos > 0 || that.currentpos < -max ? 3 : 1);
	            startpos = e.pageX;

	            that.$inner.css({
	                "-webkitTransform" : 'translate3d('+that.currentpos+'px, 0px, 0px)'
	            });

	        }, !!1)

        	.on("touchend", function (evt) {

	            if ( that.current <= -1 || that.current >= framesLen ) return;
	            // 时间间隔
	            ///var duration = +new Date + starttime;
	            // 距离
	            var distance = evt.changedTouches[0].pageX-touchstartpos;
	            // 距离绝对值
	            var absdistance = Math.abs(distance);
	            // 方向
	            var diration = distance/absdistance;
	            // 滑动范围[0,lenght-1]
	            // [注]当激活enableCircleLoop时
	            // isInRange一直为true
	            // 表示不受范围控制
	            var isInRange = that.enableCircleLoop ? !!1 : diration > 0 ? that.current > 0 : that.current < framesLen-1;
	            // 是否滚动过半
	             var isHalf = absdistance >= Math.floor(that.width/2);
	            // 手指滑动速度
	            var ss = absdistance / (+new Date-starttime);

	           // log(that.width)
	           // log(ss)
	            that.to(function(){
	                var index = that.current - ((speed < ss || isHalf) && isInRange ? diration : 0);
	                // console.log(index)
	                // that.currentpos = -index * that.width;
	                return index
	            }());

	        }, !!1)
        	.on("webkitTransitionEnd", function (evt) {

	            // evt.stopPropagation();
	            _autoLoop.start.call(that);

	            that.$inner.css({"-webkitTransitionDuration" : '0'});

	            // 到了第一张的临时节点
	            if ( that.current >= framesLen ) {
	                // setClass(delClass(that.dots, "curr")[that.current = 0], "curr");
	                // that.currentpos = that.current = 0
	                that.$inner.css({
	                    "-webkitTransform" : 'translate3d('+(that.currentpos = that.current = 0)+'px, 0px, 0px)'
	                });
	            }
	            // 到了最后一张的临时节点
	            if ( that.current <= -1 ) {
	                // that.current = framesLen-1
	                // that.currentpos = (that.current = framesLen-1) * that.width
	                // setClass(delClass(that.dots, "curr")[that.current = framesLen-1], "curr");
	                that.$inner.css({
	                    "-webkitTransform" : 'translate3d('+(that.currentpos = -(that.current = framesLen-1) * that.width)+'px, 0px, 0px)'
	                });
	            }

	            that.dots
	                .removeClass("ui-carousel-dots-curr")
	                .eq(that.current).addClass("ui-carousel-dots-curr");
	            // setClass(delClass(that.dots, "curr")[that.current], "curr");

	        }, !!1);

        /*that.dom.addEventListener("resize", function (evt) {
            //that.width = that.dom.parentNode.clientWidth;
            setCSS(that.dom, {"webkitTransform" : 'translate3d(-'+((that.width = that.dom.parentNode.clientWidth)*that.current)+'px, 0px, 0px)'});
            //that.to(that.current)
        })*/

    }

    // 初始化UI（样式/生成节点）
    function _prepareForUI ( that ) {

        var framesLen = that.$item.length;

        that.$inner.css({
            position : "relative",
            width : 100*(framesLen+2)+'%',
            display : "-webkit-box"
        });
        // console.log(that.$item)

        // 用于无限循环轮播
        var firstNode = that.$item[0].cloneNode(1);
        var lastNode = that.$item[framesLen-1].cloneNode(1);
        // var lastNode = addClass(that.$item[framesLen-1].cloneNode(1), "ui-carousel-item-last");

        // 插入复制的节点
        that.$inner.append([firstNode, lastNode]);

        /*setCSS(that.$item, {
            float : "left",
            width: Math.floor((100/itemsLeng)*100)/100+"%"
        });*/

        // create navigator
        var dotstmpl = '<p class="ui-carousel-dots">';

        for ( var i = 0; i < framesLen; i++ ) {
            dotstmpl += '<a class="ui-carousel-dots-i">'+ (i+1) +'</a>'
        }
        dotstmpl += '</p>';

        that.$wrap.append(dotstmpl)
        // collection dots node
        that.dots = that.$wrap.find(".ui-carousel-dots-i")
        that.dots.eq(that.current).addClass("ui-carousel-dots-curr");
        // that.dots.eq(that.current).addClass("ui-carousel-dots-curr")
    }

   $.Carousel = slider;

    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('carousel');
            // console.log($this.data())
            var options = $.extend({}, $this.data(), option||{});
            var action  = typeof option == 'string' ? option : options.slide;

            if (!data) $this.data('carousel', (data = new slider(this, options)));
            /*if (typeof option == 'number') data.to(option);
            else if (action) data[action]();
            else if (options.interval) data.pause().cycle()*/
        })
    }

    $("#carousel").carousel()

});