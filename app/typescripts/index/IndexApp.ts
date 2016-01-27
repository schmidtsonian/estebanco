/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="../common/Router.ts" />
/// <reference path="../common/ViewManager.ts" />
/// <reference path="../common/View.ts" />

module index {
    
    import Router = common.Router;
    import ViewManager = common.ViewManager;
    import View = common.View;

    export enum MainViews {
        HomeView,
        AboutMeView
    }
	export class IndexApp {
		
        private router:Router;
        private viewManager:ViewManager;
        
        private HomeView:View;
        
		constructor () {
            
            this.router = new Router();
            this.viewManager = new ViewManager();
		}

		init ():void {
			
            var mainContainer = $("#container");
            this.HomeView = new View("/about-me/index.html #container__aboutme", mainContainer );
            this.viewManager.addView(MainViews.HomeView, this.HomeView );
            
            this.router
                .add(/about-me/, function() {
                    $("#button-menu").removeClass("active");
                    $("#main-navigation").removeClass("active");
                    $("#button-menu").css({left: "0"});
                })
                .add(function() {
                    $("#button-menu").removeClass("active");
                    $("#main-navigation").removeClass("active");
                    $("#button-menu").css({left: "-60px"});
                })
                .listen();
            // $("a.pushstate").on("click", (e)=>{
            //     e.preventDefault();
            //     this.router.navigate($(e.target).attr("href"));
            // })
            this.router.check();
        }
	}
}