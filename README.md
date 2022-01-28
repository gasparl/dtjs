Code for the "RAF loop" timing method from the paper "[Precise display time measurement in JavaScript for web-based experiments](https://psyarxiv.com/jqk8m/)". (See also "disptime.js" at [https://github.com/gasparl/disp_time](https://github.com/gasparl/disp_time) for a commented version of the code, and [https://osf.io/wyebt/](https://osf.io/wyebt/) for other material.)

The contents of the dt.js can be placed anywhere in a JS code or simply the dt.js can be loaded. In either case, the `DT` object can then be called to use the included functions. In particular, the RAF loop can be started using `DT.loopOn()`, and stopped using `DT.loopOff()`.

Call `DT.now()` for timer: uses `performance.now()` when available (normally it should be), otherwise `Date.now()`.

Use `DT.preload()` with a list of image paths as an argument to preload images. The preloaded images will be available in the `DT.images` object, accessible by the given paths as keys. Example:

```javascript
DT.preload(allimages)
    .then(function(images) {
        console.log('Preloaded all', images);
    })
    .catch(function(err) {
        console.error('Failed', err);
    });
```
