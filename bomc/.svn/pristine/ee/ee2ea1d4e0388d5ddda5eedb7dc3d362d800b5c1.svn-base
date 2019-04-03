import * as d3 from 'd3';

export default function () {
  //拓扑矢量图
  let svg = d3.select("#topology_container")
    .style("pointer-events", "all")
    .call(d3.zoom()
      .scaleExtent([1 / 4, 4])
      .on("zoom", () => g_main.attr("transform", d3.event.transform)));
  let g_main = svg.append("g").attr("id", "g_main"),
    g_model = svg.append("g").attr("id", "g_model");
  //添加关系线段
  g_main.append("path").attr("display", "none").attr("id", "dragline").attr("d", "M0,0L100,100").attr("marker-end", "url(#arrow)");
  //箭头
  g_main.append("marker").attr("refX", "6").attr("refY", "6").attr("id", "arrow").attr("orient", "auto").attr("markerWidth", "24")
    .attr("markerHeight", "24").attr("viewBox", "0 0 12 12").attr("markerUnits", "userSpaceOnUse").append("path")
    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2");
  g_main.append("marker").attr("refX", "6").attr("refY", "6").attr("id", "arrow_").attr("orient", "auto").attr("markerWidth", "24")
    .attr("markerHeight", "24").attr("viewBox", "0 0 12 12").attr("markerUnits", "userSpaceOnUse").append("path")
    .attr("opacity", 0.1).attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2");
  return svg;
}
