/**
 * @file IbisFactory.js
 * @version 0.2.5
 * @summary A JavaScript micro-library designed for data-heavy map applications.
 * @license GPL-3.0. See LICENSE.txt file included in this distribution.
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright 2015-2016 Kyle Alexis Sargeant
 */

// Meta
/*global importScripts:false */

// importScripts("../lib/earcut_browser.min.js");  // DONE NOW DURING BUILD PHASE

class IbisFactory {
    constructor() {
        console.log("Layer initialising...");
    }

    addPolygons(idn, type, color, polygonData, hasEdge) {

        var idArray = [];
        var triangleArray = [];
        var i, j;
        for(i = 0; i < polygonData.length; i++) {
            var id = polygonData[i].id;
            var coords = polygonData[i].coordinates[0];

            var flatData = [];
            for(j = 0; j < coords.length; j++) {
                flatData.push(coords[j][0]);
                flatData.push(coords[j][1]);
            }

            var indexArray = earcut(flatData);

            for(j = 0; j < indexArray.length; j += 3) {
                var index0 = indexArray[j];
                var index1 = indexArray[j + 1];
                var index2 = indexArray[j + 2];
                triangleArray.push([
                    flatData[index0 * 2], flatData[index0 * 2 + 1],
                    flatData[index1 * 2], flatData[index1 * 2 + 1],
                    flatData[index2 * 2], flatData[index2 * 2 + 1]
                ]);
                idArray.push(id);
                idArray.push(id);
                idArray.push(id);
            }
        }

        var positions = new Float32Array(triangleArray.length * 9);
        var i = 0;
        for(var t = 0; t < triangleArray.length; t++) {
            // positions
            var triangle = triangleArray[t];
            positions[i] = triangle[0];
            positions[i + 1] = triangle[1];
            positions[i + 2] = 0;
            positions[i + 3] = triangle[2];
            positions[i + 4] = triangle[3];
            positions[i + 5] = 0;
            positions[i + 6] = triangle[4];
            positions[i + 7] = triangle[5];
            positions[i + 8] = 0;
            i += 9;
        }
        return {idn: idn, type: type, color: color, hasEdge: hasEdge, ids: idArray, positions: positions};
    }

    processTilePolygonText(idn, type, color, polygonData, hasEdge) {
        // Finally, chunk the data... so the front-end makes BufferGeometry within capacity
        const step = 150000;
        let x = 0;
        while(x < polygonData.length) {
            let polygonDataSlice = polygonData.slice(x, x + step);
            console.log(`Slice length ${polygonDataSlice.length}`);
            var entities = this.addPolygons(idn, type, color, polygonDataSlice, hasEdge);
            // var msgString = JSON.stringify(entities);
            self.postMessage(entities);
            // var mesh = this.addPolygons(triangleArraySlice, 3, 0xFF9D00, true);// ORANGE
            // var mesh = this.addPolygons(triangleArraySlice, 3, 0xCCCCCC, true);
            x += step;
        }
    }

    addLines(idn, type, color, lineData, hasEdge) {
        var idArray = [];
        var linePoints = [];
        for(var r = 0; r < lineData.length; r++) {
            var coords = lineData[r].coordinates[0];
            //console.info(lineData[r]);
            for(var c = 0; c < coords.length - 1; c++) {
                linePoints.push(coords[c]);
                linePoints.push(coords[c + 1]);
                idArray.push(lineData[r].id);
                idArray.push(lineData[r].id);
                // idArray.push(lineData[r].id);
            }
        }
        console.info("LP length:" + linePoints.length);

        var segments = linePoints.length;
        var positions = new Float32Array(segments * 3);

        for(var i = 0; i < linePoints.length; i++) {
            // positions
            positions[i * 3] = linePoints[i][0];
            positions[i * 3 + 1] = linePoints[i][1];
            positions[i * 3 + 2] = 0;
        }
        var entities = {idn: idn, type: type, color: color, hasEdge: hasEdge, ids: idArray, positions: positions};
        self.postMessage(entities);
    }

    addPoints(idn, type, color, pointData, hasEdge) {

        var numPoints = pointData.length;
        var buffer = new ArrayBuffer(numPoints * 12);
        var positions = new Float32Array(buffer);

        // var idArray = new Array(pointData.length * 3);
        var idArray = new Array(pointData.length);

        for(var i = 0; i < pointData.length; i++) {
            idArray[i] = pointData[i].id;
            positions[i * 3] = pointData[i].coordinates[0];
            positions[i * 3 + 1] = pointData[i].coordinates[1];
            positions[i * 3 + 2] = 0;
        }
        var entities = {idn: idn, type: type, color: color, hasEdge: hasEdge, ids: idArray, positions: positions};
        self.postMessage(entities);
    }

    processEntities(idn, type, color, entities, hasEdge) {
        if(entities && entities.length) {
            //console.log("XXX: " + entities.length);
            switch(type) {
                case "Polygon":
                    entities = this.processTilePolygonText(idn, type, color, entities, hasEdge);
                    break;
                case "MultiLineString":
                    this.addLines(idn, type, color, entities, hasEdge);
                    break;
                case "Point":
                    this.addPoints(idn, type, color, entities, hasEdge);
                    break;
                default:

            }
        }
    }
}

// Exports
if(!module) {var module = {};}
module.exports = IbisFactory;

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


const worker = new IbisFactory();

self.onmessage = function(evt) {
    var msg = evt.data;
    if(msg && msg.layers && msg.layers.length) {
        console.log(`Loading ${msg.layers.length} layers.`);

        for(var i = 0; i < msg.layers.length; i++) {
            var layer = msg.layers[i];
            // Async loader
            ajaxText(layer.datasource, {"send": true, "lemons": "sweet"}, function(jsonData) {
                let data = JSON.parse(jsonData);
                worker.processEntities(layer.idn, layer.type, layer.color, data, layer.hasEdge);
                self.postMessage({done: true});
            });
        }
    } else {
        console.error(`Error: Invalid or corrupt entity layer request.`);
    }
};
