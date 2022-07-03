Code for the "RAF loop" timing method from the paper "[Precise display time measurement in JavaScript for web-based experiments](https://psyarxiv.com/jqk8m/)". (See also "disptime.js" at [https://github.com/gasparl/disp_time](https://github.com/gasparl/disp_time) for a commented version of the code, and [https://osf.io/wyebt/](https://osf.io/wyebt/) for other material.)

## How to use

The contents of the dt.js can be placed anywhere in a JS code or simply the dt.js can be loaded. In either case, the `DT` object can then be called to use the included functions. In particular, the RAF loop can be started using `DT.loopOn()`, and stopped using `DT.loopOff()`.

Call `DT.now()` for timer: uses `performance.now()` when available (normally it should be), otherwise `Date.now()`.

### Example

Below is an example of how you may use the "RAF loop" method to display a stimulus and record the corresponding display change. First, make sure that the looping has been started (via `DT.loopOn()`) well in advance (e.g., at least 50 ms beforehand). (You can also just quite simply start the looping as soon as the experiment web page is loaded, and just leave it on.) Afterwards, when you want to make a display change and time it precisely, you can do it in a new `requestAnimationFrame` callback as follows.

```javascript
let disp_time; // set up global variable for storing display times

requestAnimationFrame(function(time_stamp) {
    // effect the display change
    // (here it's a plain text change, but it could be image display or whatever else)
    document.getElementById('stim_id').textContent = 'SOME NEW TEXT';

    // now store the RAF time stamp
    disp_time = time_stamp;
    // the time of the display change is now stored in "disp_time"
});
```

The RAF loop (which is going on independently in the background) should improve the precision of the timing in this RAF call.

Afterwards, you can detect a keypress change as, for example, `key_time = DT.now()`. Then you can calculate the response time as `resp_time = key_time - disp_time`.

Below is an example of how to record keypresses.

```javascript
let resp_time; // set up global variable for storing response times

// first, wait for the page to load (via "DOMContentLoaded")
document.addEventListener('DOMContentLoaded', function() {
    // then set up a listener to (the relevant) keypresses
    // (note: normally you want 'keydown', but you can use 'keyup' too)
    document.body.addEventListener('keydown', function(e) {
        // measure keydown time immediately
        // (if it's not the correct key, it will simply not be used)
        let key_time = DT.now();

        // now check if it's the key we want, for example, here, "k" or "l"
        if (e.key == 'k' || e.key == 'l') {
            resp_time = key_time - disp_time;
            // now the response time can be stored, etc.
        }
    });
});
```

Of course, in a real experiment, there should be some additional check to only listen to and record keypresses when it's expected, i.e., during the task, etc. For this, one could for example use a dedicated `listener` variable or such, which can be set to `true` or `false`, depending on whether the key should be listened to at any given moment. (For example, set `listener = true` following the display of a stimulus, and set `listener = false` after the response is given or the response time limit is exceeded.) Then, the full key check above could be something like "`if (listener == true && (e.key == 'k' || e.key == 'l')) { ... }`".


### Preloading images

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

## Archive


All files (for each "release") in this repository are permanently stored at https://doi.org/10.5281/zenodo.5912068

[![DOI](https://zenodo.org/badge/422760000.svg)](https://zenodo.org/badge/latestdoi/422760000)

## Licence & reference

The contents of this repository are licensed under [CC-BY 4.0 International](https://github.com/gasparl/dtjs/blob/master/LICENSE.md). (In essence, you can use all material for any purpose as long as you give credit to the original authors in a reasonable manner, e.g. cite it in case of a publication; for details, see the included [LICENSE file](https://github.com/gasparl/dtjs/blob/master/LICENSE.md).)

An appropriate reference for citation is:

Lukács, G., & Gartus, A. (2022). Precise display time measurement in JavaScript for web-based experiments. _Behavior Research Methods_. https://doi.org/10.3758/s13428-022-01835-2
