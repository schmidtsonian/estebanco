/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="../common/Router.ts" />
/// <reference path="../common/ViewManager.ts" />
/// <reference path="../common/View.ts" />

/// <reference path="components/MainMenu.ts" />

/// <reference path="views/Home.ts" />
/// <reference path="views/SomeCode.ts" />
/// <reference path="views/AboutMe.ts" />

module index {
    
    import Router = common.Router;
    import ViewManager = common.ViewManager;
    import View = common.View;
    
    import MainMenu = components.MainMenu;
    
    import HomeView = views.Home;
    import SomeCodeView = views.SomeCode;
    import AboutMeView = views.AboutMe;

    export enum MainViews {
        HomeView,
        SomeCodeView,

        AboutMeView,
    }
	export class IndexApp {
		
        private router:Router;
        private viewManager:ViewManager;
        
        private mainMenu:MainMenu;
        
        private HomeView:HomeView;
        private AboutMeView: AboutMeView;
        private SomeCodeView: SomeCodeView;
        
		constructor () {
            
            this.router = new Router();
            this.viewManager = new ViewManager();
		}

		init ():void {
            
            this.mainMenu = new MainMenu($("#button-menu"), $("#main-navigation"));
			
            var mainContainer = $("#main-container");
            this.HomeView = new HomeView("/index.html #container__home", mainContainer );
            this.SomeCodeView = new SomeCodeView("/some-code/index.html #container__somecode", mainContainer);
            this.AboutMeView = new AboutMeView("/about-me/index.html #container__aboutme", mainContainer);
            
            this.viewManager.addView(MainViews.HomeView, this.HomeView );
            this.viewManager.addView(MainViews.AboutMeView, this.AboutMeView );
            this.viewManager.addView(MainViews.SomeCodeView, this.SomeCodeView);
            
            
            
            // TO-Do
            // refactor!!
            var isFirstLoad = true;
            this.router
                .add(/about-me/, () =>{
                    this.mainMenu.eneable();
                    if(isFirstLoad){
                        isFirstLoad = false;
                        this.viewManager.currentView = this.AboutMeView;
                        this.viewManager.currentView.intro();
                    }else{
                        this.viewManager.openView(MainViews.AboutMeView);
                    }
                })
                .add(/some-code/, () =>{
                    this.mainMenu.eneable();
                    if(isFirstLoad){
                        isFirstLoad = false;
                        this.viewManager.currentView = this.SomeCodeView;
                        this.viewManager.currentView.intro();
                    }else{
                        this.viewManager.openView(MainViews.SomeCodeView);
                    }
                })
                .add(() =>{
                    this.mainMenu.diseable();
                    if(isFirstLoad){
                        isFirstLoad = false;
                        this.viewManager.currentView = this.HomeView;
                        this.viewManager.currentView
                            .intro()
                            .then( this.HomeView.bind );
                    }else{
                        this.viewManager.openView(MainViews.HomeView);
                    }
                })
                .listen();
            $(document).on("click", "a.pushstate", (e: JQueryEventObject) => {
                e.preventDefault();
                this.router.navigate($(e.currentTarget).attr("href"));
            })
            this.router.check();
        }
	}
}