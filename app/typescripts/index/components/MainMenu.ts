module components {
    
    export class MainMenu {
        
        private bt: JQuery;
        private container: JQuery;
        
        constructor(bt: JQuery, container: JQuery ){
            
            this.bt = bt;
            this.container = container;
        }
        
        private bind():void{
            
            this.bt.on("click", this.open.bind(this));
        }
        
        eneable():void{
            this.bt.css({left: "0"});
        }
        
        diseable():void{
            this.bt.css({left: "-60px"});
            this.container.css({left: "-100%"});
        }
        
        open():void{
            
            this.bt.addClass("active");
            this.container.addClass("active");
        }
        
        close():void{
            
            this.bt.removeClass("active");
            this.container.removeClass("active");
        }
    }
}