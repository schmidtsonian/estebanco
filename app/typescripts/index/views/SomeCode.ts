/// <reference path="../../common/View.ts" />

module views {

    export class SomeCode extends common.View {

        intro(): JQueryPromise<{}> {

        	console.log('intro')
			var d = $.Deferred();

            TweenMax.set('#js-somecode-title', { opacity: 0, x: -50 });

            var tl = new TimelineMax({ paused: true, ease: Cubic.easeOut, onComplete: () => { d.resolve(); } });

            tl.to('#js-secundary-loader', .15, { opacity: 0 });
            tl.set('#js-secundary-loader', { top: '-100%' });

            tl.to('#js-somecode-title', 0.25, { opacity: 1, x: 0 }, 0.15);

            tl.play();


			return d.promise();
        }
    }
}