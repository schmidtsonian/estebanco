
/// <reference path="IView.ts" />

module common {

    import IView = common.IView;
    
    export class View implements IView {

        private _isOpen: boolean = false;
        
        private target:string;
        private $result:JQuery;
        // public target: HTMLElement;

        constructor(target:string, $result:JQuery) {
            this.target = target;
            this.$result = $result;
        }

        get isOpen(): boolean { return this._isOpen; }

        open(): JQueryPromise<{}> {
            console.log("open!!!", this.target, this.$result)
            var defer = $.Deferred();
            
            this.$result
                .load(this.target, (r)=>{
                    this._isOpen = true;
                    this.open_hook(defer);
                });
                
            return defer.promise();
        }

        close(): JQueryPromise<{}> {
            var defer = $.Deferred();
            
            this.unbind();
            this._isOpen = false;
            this.close_hook(defer);
            
            return defer.promise();
        }
        
        /**
         * @param  {JQueryDeferred<{}>} d
         * @returns void
         */
        protected open_hook(d: JQueryDeferred<{}>): void { this.bind(); d.resolve(); }
        /**
         * @param  {JQueryDeferred<{}>} d
         * @returns void
         */
        protected close_hook(d: JQueryDeferred<{}>): void { d.resolve(); }
        
        bind():void { }
        protected unbind():void { }
    }
}
