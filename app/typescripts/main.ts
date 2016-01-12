/// <reference path="definitions/greensock/greensock.d.ts" />
/// <reference path="definitions/jquery/jquery.d.ts" />
/// <reference path="index/IndexApp.ts" />

import IndexApp = index.IndexApp;
$(function() {
	
	var app = new IndexApp();
	app.init();
});