!function(x){"object"==typeof exports&&"undefined"!=typeof module?module.exports=x():"function"==typeof define&&define.amd?define([],x):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).earcut=x()}(function(){return function e(h,b,v){function l(d,A){if(!b[d]){if(!h[d]){var z="function"==typeof require&&require;if(!A&&z)return z(d,!0);if(n)return n(d,!0);z=Error("Cannot find module '"+d+"'");throw z.code="MODULE_NOT_FOUND",z;}z=b[d]={exports:{}};
h[d][0].call(z.exports,function(b){var n=h[d][1][b];return l(n?n:b)},z,z.exports,e,h,b,v)}return b[d].exports}for(var n="function"==typeof require&&require,d=0;d<v.length;d++)l(v[d]);return l}({1:[function(e,h,b){function v(a,f,w){w=w||2;var c=f&&f.length,C=c?f[0]*w:a.length,b=l(a,0,C,w,!0),u=[];if(!b)return u;var k,m,h,g;if(c){var t=w,p,q,r;g=[];c=0;for(p=f.length;p>c;c++)q=f[c]*t,r=p-1>c?f[c+1]*t:a.length,q=l(a,q,r,t,!1),q===q.next&&(q.steiner=!0),g.push(D(q));g.sort(y);for(c=0;c<g.length;c++){f=
g[c];t=b;if(t=A(f,t))f=L(t,f),n(f,f.next);b=n(b,b.next)}}if(a.length>80*w){k=h=a[0];m=c=a[1];for(t=w;C>t;t+=w)g=a[t],f=a[t+1],k>g&&(k=g),m>f&&(m=f),g>h&&(h=g),f>c&&(c=f);h=Math.max(h-k,c-m)}return d(b,u,w,k,m,h),u}function l(a,f,w,c,C){var b;if(C===0<J(a,f,w,c))for(C=f;w>C;C+=c)b=M(C,a[C],a[C+1],b);else for(C=w-c;C>=f;C-=c)b=M(C,a[C],a[C+1],b);return b&&E(b,b.next)&&(H(b),b=b.next),b}function n(a,f){if(!a)return a;f||(f=a);var w,c=a;do if(w=!1,c.steiner||!E(c,c.next)&&0!==B(c.prev,c,c.next))c=c.next;
else{if(H(c),c=f=c.prev,c===c.next)return null;w=!0}while(w||c!==f);return f}function d(a,f,w,c,b,F,u){if(a){if(!u&&F){var k=a,m=k;do null===m.z&&(m.z=z(m.x,m.y,c,b,F)),m.prevZ=m.prev,m=m.nextZ=m.next;while(m!==k);m.prevZ.nextZ=null;m.prevZ=null;var k=m,h,g,t,p,q,r,l=1;do{m=k;p=k=null;for(q=0;m;){q++;g=m;for(h=r=0;l>h&&(r++,g=g.nextZ,g);h++);for(h=l;0<r||0<h&&g;)0===r?(t=g,g=g.nextZ,h--):0!==h&&g?m.z<=g.z?(t=m,m=m.nextZ,r--):(t=g,g=g.nextZ,h--):(t=m,m=m.nextZ,r--),p?p.nextZ=t:k=t,t.prevZ=p,p=t;m=
g}p.nextZ=null;l*=2}while(1<q)}for(m=a;a.prev!==a.next;){t=a.prev;k=a.next;if(F)a:{g=a;h=c;var e=b,v=F;p=g.prev;q=g;r=g.next;if(0<=B(p,q,r))g=!1;else{var y=p.x>q.x?p.x>r.x?p.x:r.x:q.x>r.x?q.x:r.x,A=p.y>q.y?p.y>r.y?p.y:r.y:q.y>r.y?q.y:r.y,l=z(p.x<q.x?p.x<r.x?p.x:r.x:q.x<r.x?q.x:r.x,p.y<q.y?p.y<r.y?p.y:r.y:q.y<r.y?q.y:r.y,h,e,v);h=z(y,A,h,e,v);for(e=g.nextZ;e&&e.z<=h;){if(e!==g.prev&&e!==g.next&&G(p.x,p.y,q.x,q.y,r.x,r.y,e.x,e.y)&&0<=B(e.prev,e,e.next)){g=!1;break a}e=e.nextZ}for(e=g.prevZ;e&&e.z>=
l;){if(e!==g.prev&&e!==g.next&&G(p.x,p.y,q.x,q.y,r.x,r.y,e.x,e.y)&&0<=B(e.prev,e,e.next)){g=!1;break a}e=e.prevZ}g=!0}}else a:if(g=a,p=g.prev,q=g,r=g.next,0<=B(p,q,r))g=!1;else{for(l=g.next.next;l!==g.prev;){if(G(p.x,p.y,q.x,q.y,r.x,r.y,l.x,l.y)&&0<=B(l.prev,l,l.next)){g=!1;break a}l=l.next}g=!0}if(g)f.push(t.i/w),f.push(a.i/w),f.push(k.i/w),H(a),m=a=k.next;else if(a=k,a===m){if(u)if(1===u){u=f;t=w;k=a;do m=k.prev,g=k.next.next,!E(m,g)&&N(m,k,k.next,g)&&I(m,g)&&I(g,m)&&(u.push(m.i/t),u.push(k.i/t),
u.push(g.i/t),H(k),H(k.next),k=a=g),k=k.next;while(k!==a);a=k;d(a,f,w,c,b,F,2)}else{if(2===u)a:{u=a;do{for(t=u.next.next;t!==u.prev;){if(k=u.i!==t.i){k=u;m=t;if(g=k.next.i!==m.i&&k.prev.i!==m.i){b:{g=k;do{if(g.i!==k.i&&g.next.i!==k.i&&g.i!==m.i&&g.next.i!==m.i&&N(g,g.next,k,m)){g=!0;break b}g=g.next}while(g!==k);g=!1}g=!g}if(g=g&&I(k,m)&&I(m,k)){g=k;p=!1;q=(k.x+m.x)/2;m=(k.y+m.y)/2;do g.y>m!=g.next.y>m&&q<(g.next.x-g.x)*(m-g.y)/(g.next.y-g.y)+g.x&&(p=!p),g=g.next;while(g!==k);g=p}k=g}if(k){a=L(u,
t);u=n(u,u.next);a=n(a,a.next);d(u,f,w,c,b,F);d(a,f,w,c,b,F);break a}t=t.next}u=u.next}while(u!==a)}}else d(n(a),f,w,c,b,F,1);break}}}}function y(a,f){return a.x-f.x}function A(a,f){var b,c=f,d=a.x,e=a.y,u=-(1/0);do{if(e<=c.y&&e>=c.next.y){var k=c.x+(e-c.y)*(c.next.x-c.x)/(c.next.y-c.y);if(d>=k&&k>u){if(u=k,k===d){if(e===c.y)return c;if(e===c.next.y)return c.next}b=c.x<c.next.x?c:c.next}}c=c.next}while(c!==f);if(!b)return null;if(d===u)return b.prev;for(var m,k=b,h=b.x,g=b.y,l=1/0,c=b.next;c!==k;)d>=
c.x&&c.x>=h&&G(g>e?d:u,e,h,g,g>e?u:d,e,c.x,c.y)&&(m=Math.abs(e-c.y)/(d-c.x),(l>m||m===l&&c.x>b.x)&&I(c,a)&&(b=c,l=m)),c=c.next;return b}function z(a,f,b,c,d){return a=32767*(a-b)/d,f=32767*(f-c)/d,a=16711935&(a|a<<8),a=252645135&(a|a<<4),a=858993459&(a|a<<2),a=1431655765&(a|a<<1),f=16711935&(f|f<<8),f=252645135&(f|f<<4),f=858993459&(f|f<<2),f=1431655765&(f|f<<1),a|f<<1}function D(a){var f=a,b=a;do f.x<b.x&&(b=f),f=f.next;while(f!==a);return b}function G(a,f,b,c,d,e,h,k){return 0<=(d-h)*(f-k)-(a-h)*
(e-k)&&0<=(a-h)*(c-k)-(b-h)*(f-k)&&0<=(b-h)*(e-k)-(d-h)*(c-k)}function B(a,f,b){return(f.y-a.y)*(b.x-f.x)-(f.x-a.x)*(b.y-f.y)}function E(a,f){return a.x===f.x&&a.y===f.y}function N(a,f,b,c){return E(a,f)&&E(b,c)||E(a,c)&&E(b,f)?!0:0<B(a,f,b)!=0<B(a,f,c)&&0<B(b,c,a)!=0<B(b,c,f)}function I(a,f){return 0>B(a.prev,a,a.next)?0<=B(a,f,a.next)&&0<=B(a,a.prev,f):0>B(a,f,a.prev)||0>B(a,a.next,f)}function L(a,f){var b=new K(a.i,a.x,a.y),c=new K(f.i,f.x,f.y),d=a.next,e=f.prev;return a.next=f,f.prev=a,b.next=
d,d.prev=b,c.next=b,b.prev=c,e.next=c,c.prev=e,c}function M(a,b,d,c){a=new K(a,b,d);return c?(a.next=c.next,a.prev=c,c.next.prev=a,c.next=a):(a.prev=a,a.next=a),a}function H(a){a.next.prev=a.prev;a.prev.next=a.next;a.prevZ&&(a.prevZ.nextZ=a.nextZ);a.nextZ&&(a.nextZ.prevZ=a.prevZ)}function K(a,b,d){this.i=a;this.x=b;this.y=d;this.nextZ=this.prevZ=this.z=this.next=this.prev=null;this.steiner=!1}function J(a,b,d,c){for(var e=0,h=d-c;d>b;b+=c)e+=(a[h]-a[b])*(a[b+1]+a[h+1]),h=b;return e}h.exports=v;v.deviation=
function(a,b,d,c){var e=b&&b.length,h=Math.abs(J(a,0,e?b[0]*d:a.length,d));if(e)for(var e=0,l=b.length;l>e;e++)h-=Math.abs(J(a,b[e]*d,l-1>e?b[e+1]*d:a.length,d));for(e=b=0;e<c.length;e+=3){var l=c[e]*d,k=c[e+1]*d,m=c[e+2]*d;b+=Math.abs((a[l]-a[m])*(a[k+1]-a[l+1])-(a[l]-a[k])*(a[m+1]-a[l+1]))}return 0===h&&0===b?0:Math.abs((b-h)/h)};v.flatten=function(a){for(var b=a[0][0].length,d={vertices:[],holes:[],dimensions:b},c=0,e=0;e<a.length;e++){for(var h=0;h<a[e].length;h++)for(var l=0;b>l;l++)d.vertices.push(a[e][h][l]);
0<e&&(c+=a[e-1].length,d.holes.push(c))}return d}},{}]},{},[1])(1)});/*
 GPL-3.0. See LICENSE.txt file included in this distribution.
 @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 @copyright 2015-2016 Kyle Alexis Sargeant
*/
var IbisFactory=function(){console.log("Layer initialising...")};
IbisFactory.prototype.addPolygons=function(x,e,h,b,v){var l=[],n=[],d,y;for(d=0;d<b.length;d++){var A=b[d].id,z=b[d].coordinates[0],D=[];for(y=0;y<z.length;y++)D.push(z[y][0]),D.push(z[y][1]);z=earcut(D);for(y=0;y<z.length;y+=3){var G=z[y],B=z[y+1],E=z[y+2];n.push([D[2*G],D[2*G+1],D[2*B],D[2*B+1],D[2*E],D[2*E+1]]);l.push(A);l.push(A);l.push(A)}}b=new Float32Array(9*n.length);for(y=d=0;y<n.length;y++)A=n[y],b[d]=A[0],b[d+1]=A[1],b[d+2]=0,b[d+3]=A[2],b[d+4]=A[3],b[d+5]=0,b[d+6]=A[4],b[d+7]=A[5],b[d+
8]=0,d+=9;return{idn:x,type:e,color:h,hasEdge:v,ids:l,positions:b}};IbisFactory.prototype.processTilePolygonText=function(x,e,h,b,v){for(var l=0;l<b.length;){var n=b.slice(l,l+15E4);console.log("Slice length "+n.length);n=this.addPolygons(x,e,h,n,v);self.postMessage(n);l+=15E4}};
IbisFactory.prototype.addLines=function(x,e,h,b,v){for(var l=[],n=[],d=0;d<b.length;d++)for(var y=b[d].coordinates[0],A=0;A<y.length-1;A++)n.push(y[A]),n.push(y[A+1]),l.push(b[d].id),l.push(b[d].id);console.info("LP length:"+n.length);b=new Float32Array(3*n.length);for(d=0;d<n.length;d++)b[3*d]=n[d][0],b[3*d+1]=n[d][1],b[3*d+2]=0;self.postMessage({idn:x,type:e,color:h,hasEdge:v,ids:l,positions:b})};
IbisFactory.prototype.addPoints=function(x,e,h,b,v){for(var l=new ArrayBuffer(12*b.length),l=new Float32Array(l),n=Array(b.length),d=0;d<b.length;d++)n[d]=b[d].id,l[3*d]=b[d].coordinates[0],l[3*d+1]=b[d].coordinates[1],l[3*d+2]=0;self.postMessage({idn:x,type:e,color:h,hasEdge:v,ids:n,positions:l})};
IbisFactory.prototype.processEntities=function(x,e,h,b,v){if(b&&b.length)switch(e){case "Polygon":this.processTilePolygonText(x,e,h,b,v);break;case "MultiLineString":this.addLines(x,e,h,b,v);break;case "Point":this.addPoints(x,e,h,b,v)}};if(!module)var module={};module.exports=IbisFactory;
function ajaxText(x,e,h,b){var v,l,n,d;null==e&&(e={});null==h&&(h=function(){});null==b&&(b="GET");v=[];for(l in e)d=e[l],v.push(""+l+"="+d);e=v.join("&");n=new XMLHttpRequest;n.open(b,x,!1);n.setRequestHeader("Content-type","application/x-www-form-urlencoded");n.onreadystatechange=function(){if(4===n.readyState&&200===n.status)return h(n.responseText)};n.send(e);return n}var worker=new IbisFactory;
self.onmessage=function(x){if((x=x.data)&&x.layers&&x.layers.length){console.log("Loading "+x.layers.length+" layers.");for(var e=0;e<x.layers.length;e++){var h=x.layers[e];ajaxText(h.datasource,{send:!0,lemons:"sweet"},function(b){b=JSON.parse(b);worker.processEntities(h.idn,h.type,h.color,b,h.hasEdge);self.postMessage({done:!0})})}}else console.error("Error: Invalid or corrupt entity layer request.")};