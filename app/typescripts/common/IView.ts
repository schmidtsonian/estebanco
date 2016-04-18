/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />


module common{

    export interface IView {
        open(): JQueryPromise<{}>;
        close(): JQueryPromise<{}>;
        intro(d?: JQueryDeferred<{}>): JQueryPromise<{}>;
        isOpen:boolean;
    }
}
