
/// <reference path="IView.ts" />

module common{

    export class AbstractView implements common.IView {

        private _isOpen: boolean = false;
        public target: HTMLElement;

        constructor(target: HTMLElement) {
            this.target = target;
        }

        get isOpen(): boolean {
            return this._isOpen;
        }

        /**
         * @protected
         * @param d
         */
        open_hook (d:JQueryDeferred<{}>): void {
            d.resolve();
        }

        /**
         * @protected
         * @param d
         */
        close_hook (d:JQueryDeferred<{}>): void {
            d.resolve();
        }

        open(): JQueryPromise<{}> {
            var defer = $.Deferred();
            this._isOpen = true;
            this.open_hook(defer);
            return defer.promise();
        }

        close(): JQueryPromise<{}> {
            var defer = $.Deferred();
            this._isOpen = false;
            this.close_hook(defer);
            return defer.promise();
        }
    }
}
