/*
(function() {
	var css = "z-index:6000;position:fixed;width:200px;height:100px;top:270px;right:0;"+
			  "background:url('http://keplerjs.io/images/keplerjs.png') center center;padding:3px;"+
			  "background-size:200px 100px;color:#479;font-size:12px;font-style:italic;"+
			  "box-shadow:0 0 16px rgba(0,0,0,0.3);text-align:right;text-decoration:none";

	var div = document.createElement('a');
	div.setAttribute('id','banner');
	document.body.appendChild(div);
	div.setAttribute('style', css);
	div.setAttribute('href', 'http://keplerjs.io/');
	div.innerHTML = 'The new opensource <br>geosocial platform';
})();
*/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38393469-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var disqusDiv = document.getElementById('disqus_thread');

if( disqusDiv && disqusDiv.style.display!='none' )
{
	var disqus_shortname = disqus_shortname || 'labs-easyblog-it';
	(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
}
