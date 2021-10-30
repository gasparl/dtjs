/*jshint esversion: 6 */

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const DT = {
    now: function() {
        let performance = window.performance || {};
        performance.now = (function() {
            return (
                performance.now ||
                performance.webkitNow ||
                performance.msNow ||
                performance.oNow ||
                performance.mozNow ||
                function() {
                    return new Date().getTime();
                }
            );
        })();
        return performance.now();
    },
    loop: false,
    loopFunction: undefined,
    loopOn: function(warn = true) {
        if (warn) {
            console.warn('loopOn()');
        }
        this.loop = true;
        this.loopFunction();
    },
    loopOff: function(warn = true) {
        if (warn) {
            console.warn('loopOff()');
        }
        this.loop = false;
    },
    images: {},
    preload: sources =>
        Promise.all(
            sources.map(
                src => new Promise(function(resolve, reject) {
                    const img = new Image();
                    DT.images[src] = img;
                    img.onload = function() {
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = src;
                })))
};

DT.loopFunction = function() {
    if (DT.loop) {
        requestAnimationFrame(DT.loopFunction);
    }
};
