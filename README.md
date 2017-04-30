# IBIS.JS

```diff
- THIS PROJECT IS NOW UNMAINTAINED AND FOR ARCHIVING PURPOSES ONLY.
```

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

Development on this version has stopped.  Better approaches have made it obsolete.  This distribution is therefore left here for archiving purposes only.

### License

Currently the Ibis.js library is released under the GPL-3.0 license.  See LICENSE.txt.

Copyright &copy; Kyle Alexis Sargeant 2015-2016.

