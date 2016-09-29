/*
 GPL-3.0. See LICENSE.txt file included in this distribution.
 @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 @copyright 2015-2016 Kyle Alexis Sargeant
*/
var IbisLocator=function(){console.log("Layer initialising...");this._metadata=this._layers=null};IbisLocator.prototype.getEntityMetadata=function(a){return this._metadata[a]};IbisLocator.prototype.onMessage=function(a){!a.isTrusted&&(a=this.getEntityMetadata(a.id))&&(a=JSON.stringify(a),self.postMessage(a))};
IbisLocator.prototype.processEntities=function(a,b){console.log("Locator processing data");this._layers=a;this._metadata={};for(var d=0;d<b.length;d++)this._metadata[b[d].id]=b[d];console.log("Have "+this._layers+" metadata records covering "+this._metadata+" entity layers.")};if(!module)var module={};module.exports=IbisLocator;
function ajaxText(a,b,d,e){var f,g,c,h;null==b&&(b={});null==d&&(d=function(){});null==e&&(e="GET");f=[];for(g in b)h=b[g],f.push(""+g+"="+h);b=f.join("&");c=new XMLHttpRequest;c.open(e,a,!1);c.setRequestHeader("Content-type","application/x-www-form-urlencoded");c.onreadystatechange=function(){if(4===c.readyState&&200===c.status)return d(c.responseText)};c.send(b);return c}var worker=new IbisLocator;
self.onmessage=function(a){var b=a.data;if(b&&b.layers&&b.layers.length)ajaxText(b.datasource,{send:!0,lemons:"sweet"},function(a){console.log("Locator received data");a=JSON.parse(a);worker.processEntities(b.layers,a)});else worker.onMessage(b)};
