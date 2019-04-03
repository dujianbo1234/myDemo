import * as d3 from 'd3';
/**
 *
 * 绘制连线
 *
 * */
export default (links) => {
  debugger
  //连线
  let link = d3.select("#g_main").selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("marker-end", "url(#arrow)")
    .attr("stroke-dasharray", "5,3")
    .attr("cursor", "pointer");
  return link;
}
