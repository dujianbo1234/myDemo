import * as d3 from "d3";

/**
 *
 * 力导图初始化
 *
 * */
export default (svg) => {
  let width = parseInt(svg.attr("width").slice(0, -2)), height = parseInt(svg.attr("height").slice(0, -2));
  //初始化
  let force = d3.forceSimulation([])
    .force("charge", d3.forceManyBody().strength(-1))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink([]).id(d => d.ciid).distance(d =>
      Math.sqrt(Math.pow(d.source.x - d.target.x, 2) + Math.pow(d.source.y - d.target.y, 2))).strength(1));
  return force;
}
