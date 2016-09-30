# IBIS.JS

## A high-performance JavaScript GeoJSON mapping library for data-heavy web applications - both online and offline.

Written in modern Javascript(ES6) - works across all core browsers.  Tested extensively with latest stable releases of: IE, Firefox and Chrome.

Though Chrome is currently recommended as best for overall performance.

### What can it do?

* Speedily display large multi-layered sets of GeoJson vector data (especially heavy datasets i.e. > 100K GeoJSON records).
* Work both with online and offline browsing (see Road Map section below for latter).
* Works across all desktop browsers (and some mobile devices).
* Entire library minimised and gzipped is only 100kB.  About the cost of four 256x256 map tiles!


### How stable is it - and what are it's limits?

In terms of general library stability - it should be stable enough for most typical production senarios.

More tests will be added to the library over time - thus improving that edge cases are correctly dealt with - but if you discover any faults whilst using Ibis.js - please report a bug.

The one exception to this stabilty - is if you are trying to cram an ocean into a champagne glass... because it just won't work!  Really!!! ;))  Browsers have their memory capacities and although this limit can be worked with... it can't be ignored.  For example, in a Chrome process - around 200 megabytes of user data is about the (current Sep 2016) absolute limit before the browser explodes!  But even just approaching the limits of its memory
can cause other unexpected behaviour i.e. sporadic freezing and process death can be expected!  Thus, forewarned, a good rule of thumb is to work within two-thirds of the maximum capacity of your targeted browser(s).  Using that - with all main
browsers - stable and consistently responsive map usage can be expected - even through long user-sessions.


### How can I use it?

#### Install
~~~~
npm install Ibis.js
~~~~

#### Integrate

The Ibis.js API is designed to be as terse/for-purpose and intuitive as possible. 

To add a new map to your project first import Ibis.js into your page:-

~~~~
<script src="../dist/Ibis.js"></script>
~~~~

Then, following on, add a DOM element with the ID you want as a target, like so:-

~~~~
<div id="my-map"></div>
~~~~

And finally, somewhere in your page's JavaScript, active Ibis.js to use this by:-

~~~~
    const layers = [
        {idn: "building", type: "Polygon", color: 0xCCCCCC, datasource: "../demo/data/output_domain.osm_building.json", hasEdge: false}
    ];
    const engine = new IbisEngine("my-map", layers, [10478.0, -6708110.0]);
~~~~

There must be, at least, one layer of GeoJSON data defined.

NOTE: Data loading is intentionally 'eager' - for long running map sessions - this works out to be often far more bandwidth friendly than raster tile-based mapping approaches.
i.e. data is loaded at most - once only - per session.  And with offline support (see Roadmap section) - data load will be required even less often than that.  Again, potentially making a considerable overall saving in network traffic.

### Demo

Included in the github (but not npm) distribution are gzipped files and demo code to show Ibis in action.

The demo utilises the sampled OpenStreetMap data from GeoFabriek.  A raw data size of around 200 MBs which was further processed and split into sub-files for efficient deployment and clarity of design.

On my cheapo two-year-old Lenovo laptop... the entire OSM Greater London dataset will download and display in Chrome in around 10-12 seconds.

NOTE: If your webserver does not support the fetching of gzipped source files - then simply ungzip the data files in-place - and you have the original .json GeoJson data.  No code/config changes are required.


### Roadmap

Four additional features seem to be necessary to bring the library up to a minimum standard for typical production scenarios.
They are:

- Text display
- Full offline browsing support
- Geo selection and editing functionality
- More network options, including WebSocket, Socket.IO and possibly MsgPack usage.

A fifth possible feature - is better mobile support.  Because, although I don't envisage a mobile device as the best
device (yet!... they're always improving of course!) for the types of geo-spatial application the library's core
audience is focused on... still... it's obviously very handy for users to have the OPTION of being able to quickly check something via their
mobile device.  But some sort of smart/cached/staged solution is required... to compensate for the mobile's lesser performance
and ever-possible network issues.

So that's the current road map for Ibis.  However, as with most Open-Source developers, I don't have the luxury of spending my time just working on my projects
like Ibis.js... but need instead to put most of my time to "the full-time job"...

...all these features aren't going to happen by tomorrow!  Or even the day after tomorrow!

Instead, I expect to have the free time to tackle them at a rate of about one a month.  So users should expect substantial updates to the
library at around the same frequency.

Finally, as a promise, I will endeavour to keep the library's growing API - as backwards-compatible as possible.  However, a lot of functionality still has to be added and
integrated to the library - so I don't imagine that real stability in the API will be achieved until the current road map
is complete.  Say around end-2016.

And... if any other developers out there feel inspired to shoulder some of the 'heavy-lifting' ;) ... then please be my guest! ;))


### License

Currently the Ibis.js library is released under the GPL-3.0 license.  See LICENSE.txt.

Copyright &copy; Kyle Alexis Sargeant 2015-2016.

