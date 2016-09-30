/**
 * @file IbisEngine.js
 * @version 0.2.5
 * @summary A JavaScript micro-library designed for data-heavy map applications.
 * @license GPL-3.0. See LICENSE.txt file included in this distribution.
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright 2015-2016 Kyle Alexis Sargeant
 */

// Meta
/*global module:false */
/*global THREE:false */
/*global Detector:false */
/*global unmask:false */
/*global updatemask:false */

class IbisEngine {
    /**
     *
     * @param {string} idn - the page DOM element ID to be used by the map.
     * @param {Array} layers - an array of layer configurations
     * @param {Array} offset - the map offset from origin in meters (EPSG:3857).
     */
    constructor(idn, layers, offset) {

        // Utilities
        this.debug = false;

        // Map and layer details
        this.idn = idn || "map";
        this.xOffset = offset[0]; //10478.0;
        this.yOffset = offset[1]; //-6708110.0;

        // Layers are in order of lowest z first.
        this.layers = layers;
        this.layersLoaded = 0;

        // Resources
        this.sprite = THREE.ImageUtils.loadTexture("./img/sprites/disc.png");

        // Engine
        if(!Detector.webgl) {Detector.addGetWebGLMessage();}

        this.container = null;
        this.stats = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.raycaster = null;
        this.mouse = null;
        this.line = null;
        this.controls = null;
        this.meshLayers = []; // Contains an array of all meshes displayed

        // Workers
        console.log("Initialising preprocessor...");
        this.worker = new Worker("../dist/IbisFactory.js");
        this.worker.postMessage({layers: this.layers});

        this.worker.onmessage = function(evt) {

            if(evt.data) {
                var data = evt.data;
                if(data.done) {
                    if(++this.layersLoaded === this.layers.length) {
                        // Actually start the engine
                        this.animate();
                        unmask(); this.layersLoaded = 0;
                    } else {
                        updatemask(`Ibis loading, '${this.idn}'.<br>Layers already loaded (${this.layersLoaded}/${this.layers.length})`);
                    }
                    return;
                }
                var idArray = data.ids;
                var positions = data.positions;
                var color = data.color;

                console.log("typeof positions: " + typeof data.positions);
                console.log(`Have received ${idArray.length} entity ids with ${positions.byteLength} vertex coordinates.`);
                console.log(`and color: ${data.color}.`);

                var geometry = new THREE.BufferGeometry();
                geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
                geometry.addAttribute("id", new THREE.BufferAttribute(idArray, 1));
                var material, mesh;
                switch(data.type) {
                    case "Polygon":
                        console.log("Receiving polygon layer.");
                        material = new THREE.MeshBasicMaterial({color: data.color, side: THREE.DoubleSide});
                        mesh = new THREE.Mesh(geometry, material);
                        break;
                    case "MultiLineString":
                        console.log("Receiving line layer.");
                        material = new THREE.LineBasicMaterial({color: color, linewidth: 2});
                        mesh = new THREE.LineSegments(geometry, material);
                        break;
                    case "Point":
                        console.log("Receiving point layer.");
                        material = new THREE.PointsMaterial({
                            color: color,
                            size: 10,
                            sizeAttenuation: true,
                            map: this.sprite,
                            alphaTest: 0.5,
                            transparent: true
                        });
                        mesh = new THREE.Points(geometry, material);
                        break;
                    default:
                        console.error(`Error: Unrecognised geo type: ${data.type}`);
                }

                // Add the generated material and wrapping mesh to the scene and raycasting array.
                mesh.position.x = this.xOffset; //10478;
                mesh.position.y = this.yOffset; //-6708110.0;
                this.scene.add(mesh);
                this.meshLayers.push(mesh);
                console.log(`Mesh layers now has ${this.meshLayers.length} meshes`);

                // If the mesh should also be edged... create and add a edge helper to the scene.
                if(data.hasEdge) {
                    //edges = new THREE.EdgesHelper(mesh, 0x000000, 45);
                    let edges = new THREE.EdgesHelper(mesh, 0x000000);
                    edges.material.linewidth = 2;
                    edges.position.z = 0.5;//this.zHeight;
                    this.scene.add(edges);
                    // NOTE: We do NOT push the edge mesh into our meshLayers array.
                    //       It is not used for interaction.
                }
            }

        }.bind(this);

        //--------------------------------------------------------------------------------------------------------------
        console.log("Initialising locator...");
        this.locatorLastId = 0;

        this.worker1 = new Worker("../dist/IbisLocator.js");
        this.worker1.postMessage({layers: this.layers, datasource: "../demo/data/output_domain.osm_metadata.json"});

        this.worker1.onmessage = function(evt) {
            if(evt.data) {
                var data = JSON.parse(evt.data);
                if(data && data.id) {
                    document.getElementById("pick-name").innerHTML = data.name;
                    document.getElementById("pick-class").innerHTML = data.class;
                    document.getElementById("pick-type").innerHTML = data.type;
                    document.getElementById("pick-id").innerHTML = data.id;
                }
            }
        }.bind(this);

        // Initialise engine
        this.init();
    }

    init() {

        this.container = document.getElementById(this.idn);
        this.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 50, 100000);
        this.camera.position.z = 50000;

        this.controls = new THREE.MapControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [65, 83, 68];
        this.controls.minDistance = 55;
        this.controls.maxDistance = 100000;
        this.controls.addEventListener("change", this.render.bind(this));

        this.scene = new THREE.Scene();

        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
        let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 2, transparent: true});
        this.line = new THREE.Line(geometry, material);
        this.scene.add(this.line);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderer = new THREE.WebGLRenderer({antialias: false});
        //renderer.setClearColor( scene.fog.color );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x666666); // Sets background color
        this.container.appendChild(this.renderer.domElement);

        if(this.debug) {
            this.stats = new THREE.Stats();
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.top = "0px";
            this.container.appendChild(this.stats.domElement);
        }
        this.onWindowResize();

        // General event handlers
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
        document.addEventListener("mousemove", this.onDocumentMouseMove.bind(this), false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls.handleResize();
    }

    onDocumentMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // See if the ray from the camera into the world hits one of our meshes
        for(var i = 0; i < this.meshLayers.length; i++) {
            let mesh = this.meshLayers[i];
            let intersects = this.raycaster.intersectObject(mesh);

            if(intersects.length > 0) {
                var osmId = intersects[0].object.geometry.getAttribute("id").array[intersects[0].index];
                //console.log(`P> index: ${intersects[0].index}, osm_id: ${osmId}`);

                // Send request (as long as it's not a duplicate of the last.
                if(osmId !== this.locatorLastId) {
                    this.worker1.postMessage({id: osmId});
                    this.locatorLastId = osmId;
                }
                break;
            }
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.render();
        if(this.debug) {this.stats.update();}
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// Exports
module.exports = IbisEngine;
