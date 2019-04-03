import * as d3 from "d3";
/**
 *
 * 绘制连线文字
 *
 * */
export default (links)=>{
  debugger
  //连线文字
  let link_text = d3.select("#g_main").selectAll(".link_text")
    .data(links)
    .enter()
    .append("text")
    .attr("cursor", "default")
    .attr("class", "link_text")
    .attr("fill", "#ce4f55")
    .text(d => d.cirname.split("_")[1])
    .style("font-size", "12px");
  return link_text;
}
