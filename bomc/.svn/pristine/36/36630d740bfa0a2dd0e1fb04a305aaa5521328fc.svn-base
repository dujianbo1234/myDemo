import * as d3 from "d3";

/**
 *
 * 绘制节点
 *
 * */
export default (keys,datas) => {
//节点
  let node = [], node_ = [];
  for (let key in keys) {
    node_[key] = d3.select("#g_model").attr("transform", "translate(12,12)").selectAll("#model_" + keys[key])
      .data([{name: keys[key]}]).enter().append("g").attr("id", "model_" + keys[key])
      .attr("transform", "translate(0," + 45 * key + ")").attr("cursor", "pointer");
    node_[key].append("image").attr("width", "28").attr("height", "28")
      .attr("xlink:href", d => require("../../../assets/" + keys[key] + ".svg"));
    node_[key].append("text").text(d => d.name).attr("dx", 30).attr("dy", 18);

    node[key] = d3.select("#g_main").selectAll(".node_" + keys[key]).data(datas[keys[key]]).enter().append("g")
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")").attr("cursor", "pointer").attr("id",d=>d.ciid)
      .attr("class", "node_" + keys[key]).attr("v-popover", "popover");
    node[key].append("image").attr("width", "22").attr("height", "22")
      .attr("xlink:href", d => require("../../../assets/" + keys[key] + ".svg"));
    node[key].append("text").attr("enable", "false").attr("fill", "#662bff").attr("cursor", "default")
      .text(d => d.ciid).attr("dx", 22).attr("dy", 16).style("font-size", "12px");
  }
  return node;
}
