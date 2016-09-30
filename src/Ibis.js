/**
 * @file Ibis.js
 * @version 0.2.6
 * @summary A JavaScript micro-library designed for data-heavy map applications.
 * @description A high-performance JavaScript GeoJSON mapping library for data-heavy web applications - both online and offline.
 * @license GPL-3.0. See LICENSE.txt file included in this distribution.
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright 2015-2016 Kyle Alexis Sargeant
 * @example <caption>Example configuration of Ibis.js engine with multiple GeoJSON layers.</caption>
 * // Bind a new map engine with the defined layers.
 * const layers = [
 *      {idn: "natural", type: "Polygon", color: 0x00FF77, datasource: "../demo/data/output_domain.osm_natural.json"},
 *      {idn: "building", type: "Polygon", color: 0xCCCCCC, datasource: "../demo/data/output_domain.osm_building.json", hasEdge: false},
 *      {idn: "road", type: "MultiLineString", color: 0xFFFFFF, datasource: "../demo/data/output_domain.osm_road_multi.json"},
 * ];
 * const engine = new IbisEngine("my-map-id", layers, [12345.0, -678900.0]);
 */
