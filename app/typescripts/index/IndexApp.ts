/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="../common/Router.ts" />
/// <reference path="../common/ViewManager.ts" />
/// <reference path="../common/View.ts" />

/// <reference path="views/Home.ts" />

module index {
    
    import Router = common.Router;
    import ViewManager = common.ViewManager;
    import View = common.View;
    
    import HomeView = views.Home;

    export enum MainViews {
        HomeView,
        AboutMeView
    }
	export class IndexApp {
		
        private router:Router;
        private viewManager:ViewManager;
        
        private HomeView:HomeView;
        private AboutMeView:View;
        
		constructor () {
            
            this.router = new Router();
            this.viewManager = new ViewManager();
		}

		init ():void {
			
            var mainContainer = $("#container");
            this.HomeView = new HomeView("/index.html #container__aboutme", mainContainer );
            this.AboutMeView = new View("/about-me/index.html #container__aboutme", mainContainer );
            
            this.viewManager.addView(MainViews.HomeView, this.HomeView );
            this.viewManager.addView(MainViews.AboutMeView, this.AboutMeView );
            

            $("#button-menu").on("click", function(){
                $(this).toggleClass("active");
                $("#main-navigation").toggleClass("active");
            });
            
            var isFirstLoad = true;
            
            this.router
                .add(/about-me/, () =>{
                    $("#button-menu").removeClass("active");
                    $("#main-navigation").removeClass("active");
                    $("#button-menu").css({left: "0"});
                    
                    if(isFirstLoad){
                        isFirstLoad = false;
                        this.viewManager.currentView = this.AboutMeView;
                    }else{
                        this.viewManager.openView(MainViews.AboutMeView);
                    }
                })
                .add(() =>{
                    $("#button-menu").removeClass("active");
                    $("#main-navigation").removeClass("active");
                    $("#button-menu").css({left: "-60px"});
                    if(isFirstLoad){
                        isFirstLoad = false;
                        this.viewManager.currentView = this.HomeView;
                        this.HomeView.bind();
                    }else{
                        this.viewManager.openView(MainViews.HomeView);
                    }
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