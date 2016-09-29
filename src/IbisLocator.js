/**
 * @file IbisLocator.js
 * @version 0.2.5
 * @summary A JavaScript micro-library designed for data-heavy map applications.
 * @license GPL-3.0. See LICENSE.txt file included in this distribution.
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright 2015-2016 Kyle Alexis Sargeant
 */

// Meta

class IbisLocator {
    constructor() {
        console.log("Layer initialising...");
        this._layers = null;
        this._metadata = null;
    }

    getEntityMetadata(id) {
        return this._metadata[id];
    }

    onMessage(msg) {
        //self.postMessage({type: "console", data: "Got message: " + JSON.stringify(msg)});

        // console.log(`REQ: x=${msg.x} y=${msg.y}`);
        if(msg.isTrusted) {return;}
        //console.log("DB: " + this.db);
        var entityMetadata = this.getEntityMetadata(msg.id);

        if(entityMetadata) {
            var msgString = JSON.stringify(entityMetadata);
            self.postMessage(msgString);
        }
    }

    processEntities(layers, metadata) {
        console.log("Locator processing data");
        this._layers = layers;
        this._metadata = {};
        for(var i = 0; i < metadata.length; i++) {
            var id = metadata[i].id;
            this._metadata[id] = metadata[i];
        }
        console.log(`Have ${this._layers} metadata records covering ${this._metadata} entity layers.`);
    }
}

// Exports
if(!module) {var module = {};}
module.exports = IbisLocator;

function ajaxText(url, data, callback, type) {
    var data_array, data_string, idx, req, value;
    if(data == null) {
        data = {};
    }
    if(callback == null) {
        callback = function() {};
    }
    if(type == null) {
        //default to a GET request
        type = "GET";
    }
    data_array = [];
    for(idx in data) {
        value = data[idx];
        data_array.push("" + idx + "=" + value);
    }
    data_string = data_array.join("&");
    req = new XMLHttpRequest();
    req.open(type, url, false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200) {
            return callback(req.responseText);
        }
    };
    req.send(data_string);
    return req;
}

const worker = new IbisLocator();

self.onmessage = function(evt) {
    var msg = evt.data;
    if(msg && msg.layers && msg.layers.length) {
        // Async loader
        ajaxText(msg.datasource, {"send": true, "lemons": "sweet"}, function(jsonData) {
            console.log("Locator received data");
            // worker._layers = msg.layers;
            // worker._metadata = JSON.parse(jsonData);
            var metadata = JSON.parse(jsonData);
            worker.processEntities(msg.layers, metadata);
        });
    } else {
        worker.onMessage(msg);
    }
};
