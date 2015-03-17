<html>
<head>
	<title>Labs EasyBlog.It - Web Mapping Applications</title>
	<meta name="description" content="Web2.0 experimental Web Mapping applications" />
	<meta name="author" content="Stefano Cudini" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="google-site-verification" content="rO0NU6dhQAZpHrpdYc8J0m55wJ7xwUk7eDO8Ahj6k5U" />
	<link rel="image_src" href="http://labs.easyblog.it/logo.png" />
	<link rel="stylesheet" type="text/css" href="../labs.css" />
<style>
body {
	background:url('../backmap.jpg') top left #EEFAF6;
}
h2,h3 {
	margin:0;
}
ul {
	clear:both;
}
li {
	margin-bottom:1em;
}
li a {
	font-size: 1em;
	font-weight: bold;
}
#header {
	margin: 10px 0 30px -12px;
	float:left;
	padding:4px 18px;
	border-radius:12px;
	border: 4px solid rgba(0, 50, 0, 0.3);
	background-color: rgba(255, 255, 255, 0.7);
}
#leaflet-plugins {
	background: url('../leaflet-logo.png') no-repeat top center;	
	padding-top: 5em;
	margin-top: 2em;
}
</style>
</head>
<body>
<div id="content">
	<div id="bubbles"></div>
	<h1><img height="50" width="50" alt="logo easyblog" src="../logo.png"> Easyblog.it  <em> &bull;&nbsp;Labs</em></h1>
	<p id="desc">
		<b>Web Mapping Applications</b>
		<span>dev by <a style="color:#f80" href="http://labs.easyblog.it/stefano-cudini/" rel="author"><b>Stefano Cudini</b></a></span>
		<br />
		<a href="../"><b>&laquo; more apps</b></a>
	</p>
	<div id="likepage">
		<iframe src="http://ghbtns.com/github-btn.html?user=stefanocudini&count=true&type=follow" allowtransparency="true" frameborder="0" scrolling="0" width="185" height="20"></iframe>
	</div>

	<ul>
		<li><a href="/maps/gps-network-tracking-system/">Track GPS Network</a><br />
			<b>GPS tracking system</b> of remote devices and tracks <b>spatial search</b>
		</li>
		<li><a href="/maps/gpsdata_server/">GPS Streaming Daemon</a><br />
			<b>NodeJs</b> daemon for remote <b>nmea data</b> acquisitions from mobile devices
		</li>
		<li><a href="/maps/realtime-access-map/">Realtime Access Map</a><br />
			<b>Realtime access analysis</b> for web sites and clients <b>geo-location</b>
		</li>
		<li><a href="/maps/share-tracks/">Share Gpx Tracks</a><br />
			Share and <b>Embed GPX</b> tracks in mobile devices.
		</li>
		<li><a href="/maps/osm-contributors-by-area/">OpenStreetMap Contributors by Area</a><br />
			List of <b>OSM contributors</b> who have participated in a given <b>map area</b>.
		</li>
		<li><a href="/maps/gpx-simplify-optimizer/">GPX Optimizer online</a><br />
			Online <b>Simplifier</b> and <b>tracks Optimizer</b>.
		</li>
		<li><a href="/maps/python-dem-picker/">Python DEM Picker</a><br />
			<b>DEM</b>(Digital Elevation Model) data picker, with <b>http interface</b>
		</li>
	</ul>
	<div id="leaflet-plugins">
		<ul>
			<li><a href="/maps/leaflet-search/">Leaflet Control Search</a><br />
				Control for <b>searching markers</b> and features by custom fields from layer or <b>remote source</b>.
			</li>
			<li><a href="/maps/leaflet-panel-layers/">Leaflet Panel Layers</a><br />
				Leaflet <b>Control.Layers extended</b> for multiple <b>layers groups</b> and icon legends.
			</li>
			<li><a href="/maps/leaflet-layerjson/">Leaflet Dynamic JSON Layer</a><br />
				Build <b>dynamic JSON Layer</b> via Ajax/JSONP with <b>Caching requests</b>.
			</li>			
			<li><a href="/maps/leaflet-gps/">Leaflet Control Gps</a><br />
				Simple Leaflet Control plugin for <b>tracking gps</b> position, highly customizable.
			</li>
			<li><a href="/maps/leaflet-compass/">Leaflet Control Compass</a><br />
				A <b>Leaflet Control</b> plugin to make simple <b>rotating compass</b>
			</li>
			<li><a href="/maps/leaflet-list-markers/">Leaflet List Markers</a><br />
				A Leaflet Control for <b>listing visible markers</b>/features in a interactive box.
			</li>
			<li><a href="/maps/leaflet-loader/">Leaflet Control Loader</a><br />
				Simple control to show/hide a <b>gif loader</b> to the center of the map.
			</li>
		</ul>
	</div>
	<div id="footer">&copy;<?php echo date('Y'); ?> Stefano Cudini</div>	
</div>
<script src="/labs-common.js"></script>
</body>
</html>

