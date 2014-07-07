<h1>Carousel - 一个基于zetpo，定位移动端的slider组件</h1>
<em>PS：取名Carousel是为了兼容早期已经投入的使用。</em>
<ol>
	<li><strong>支持`有终点`跟`无终点`轮播模式；</strong></li>
	<li><strong>支持响应式；</strong></li>
	<li><strong>支持自动轮播，[注]：自动轮播依赖于`无终点`模式；</strong></li>
	<li><strong>支持指定帧数初始化。</strong></li>
</ol>

<h3>[API]</h3>

<h4>JS 对象方法</h4>
<p>
```html
/**
 * index[number] 初始化状态切换到的帧数
 * noanim[boolean] 切换过程是否需要动画
 */
$("#carousel").carousel(index, noanim);
```
</p>
<h4>HTML 初始化</h4>
<p>
```html
// data-enable-circle-loop 激活`无终点`轮播方式，默认激活
// data-enable-auto-loop 激活自动轮播，默认激活，若 enableCircleLoop=false，该项不起作用
// data-enable-dots 激活触点导航，默认激活
// data-auto-loop-duratio 自动轮播时间间隔，默认5s
<div class="ui-carousel" id="carousel" data-enable-circle-loop="true" data-enable-auto-loop="true" data-enable-dots="true" data-auto-loop-duration="5000">
    <ul class="ui-carousel-inner">
        <li class="ui-carousel-item"><img width="100%" src="http://lorempixel.com/640/300/sports/1/"></li>
        <li class="ui-carousel-item"><img width="100%" src="http://lorempixel.com/640/300/sports/2/"></li>
        <li class="ui-carousel-item"><img width="100%" src="http://lorempixel.com/640/300/sports/3/"></li>
        <li class="ui-carousel-item"><img width="100%" src="http://lorempixel.com/640/300/sports/4/"></li>
    </ul>
</div>
```
</p>
<h4>CSS <a href="https://github.com/class4cxy/Carousel/blob/master/carousel.css">carousel.css</a></h4>
