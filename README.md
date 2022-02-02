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

---


All files (for each "release") in this repository are permanently stored at https://doi.org/10.5281/zenodo.5912068

[![DOI](https://zenodo.org/badge/422760000.svg)](https://zenodo.org/badge/latestdoi/422760000)

---

The contents of this repository are licensed under [CC-BY 4.0 International](https://github.com/gasparl/dtjs/blob/master/LICENSE.md). (In essence, you can use all material for any purpose as long as you give credit to the original authors in a reasonable manner, e.g. cite it in case of a publication; for details, see the included [LICENSE file](https://github.com/gasparl/dtjs/blob/master/LICENSE.md).)

An appropriate reference for citation is:

Lukács, G., & Gartus, A. (2022). _Precise display time measurement in JavaScript for web-based experiments._ https://psyarxiv.com/jqk8m/
