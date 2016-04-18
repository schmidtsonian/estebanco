/// <reference path="../../common/View.ts" />

module views {

    export class AboutMe extends common.View {

        intro(): JQueryPromise<{}> {

            var d = $.Deferred();

            TweenMax.set('#js-aboutme-title, #js-aboutme-subtitle', { opacity: 0, x: -50 });

            var tl = new TimelineMax({ paused: true, ease: Cubic.easeOut, onComplete: () => { d.resolve(); } });

            tl.to('#js-secundary-loader', .15, { opacity: 0 });
            tl.set('#js-secundary-loader', { top: '-100%' });

            tl.staggerTo(
                [
                    '#js-aboutme-title',
                    '#js-aboutme-subtitle',
                ], 0.25, { opacity: 1, x: 0 }, 0.15);

            tl.play();


            return d.promise();
        }
    }
}