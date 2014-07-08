<h1>Carousel - 一个基于zetpo，定位移动端的slider组件</h1>
<em>PS：取名Carousel是为了兼容早期已经投入的使用。</em>
<ol>
	<li><strong>支持`有终点`跟`无终点`轮播模式；</strong></li>
	<li><strong>支持响应式；</strong></li>
	<li><strong>支持自动轮播，[注]：自动轮播依赖于`无终点`模式；</strong></li>
	<li><strong>支持指定帧数初始化；</strong></li>
	<li><strong>支持销毁初始化对象。</strong></li>
</ol>

<h3>[API]</h3>

<h4>JS 对象方法</h4>
<p>
<pre>
/**
 * 简单初始化
 * PS：若该dom没有初始化过carousel，则初始化
 */
$(".carousel").carousel();
</pre>
</p>
<p>
<pre>
/**
 * 带参数初始化
 * index[number] 初始化状态切换到的帧数
 * noanim[boolean] 切换过程是否需要动画
 */
$(".carousel").carousel(index, noanim);
</pre>
</p>
<p>
<pre>
/**
 * 销毁操作
 * PS：若该dom有初始化过carousel，则执行销毁
 */
$(".carousel").carousel('clear');
</pre>
</p>
<h4>HTML 初始化</h4>
<p>
<pre>
/**
 *
 * data-enable-circle-loop 激活`无终点`轮播方式，默认激活
 * data-enable-auto-loop 激活自动轮播，默认激活，若 enableCircleLoop=false，该项不起作用
 * data-enable-dots 激活触点导航，默认激活
 * data-auto-loop-duratio 自动轮播时间间隔，默认5s
 * /
</pre>
<br>
<a href="https://github.com/class4cxy/Carousel/blob/master/demo.html">demo.html</a>
</p>

<h4>CSS 初始化</h4>
<p><a href="https://github.com/class4cxy/Carousel/blob/master/carousel.css">carousel.css</a></p>
