import * as d3 from "d3";
import svg2png from 'save-svg-as-png'

/**
 *
 * 监听处理所有事件
 *
 * */
export default (that, force, node, link, link_text, update, data) => {

  force.on("tick", tick);
  document.onclick = function (e) {
    debugger
    d3.select("#topo_contextmenu").attr("hidden", "hidden");
  };
  function tick() {
    //节点位置更新
    node.map(x => x.attr("transform", d => "translate(" + d.x + "," + d.y + ")"));
    //连线位置起始点计算,箭头终点坐标在以target坐标为圆心，半径的圆上
    link.attr("x1", x => x.source.x + 9)
      .attr("y1", x => x.source.y + 9)
      .attr("x2", x => x.target.x + 9 + (x.source.x > x.target.x ? 1 : -1) * 18 * (Math.abs(x.source.x - x.target.x))
        / Math.sqrt(Math.pow(x.source.x - x.target.x, 2) + Math.pow(x.source.y - x.target.y, 2)))
      .attr("y2", x => x.target.y + 9 + (x.source.y > x.target.y ? 1 : -1) * 18 * (Math.abs(x.source.y - x.target.y))
        / Math.sqrt(Math.pow(x.source.x - x.target.x, 2) + Math.pow(x.source.y - x.target.y, 2)));
    //连线文字位置
    link_text.attr("transform", d => "translate(" + ((d.source.x + d.target.x) / 2) + "," + (8 + (d.source.y +
      d.target.y) / 2) + ") rotate(" + (180 * (d.source.x > d.target.x ? 1 : -1) * Math.asin((d.source.y - d.target.y)
      / Math.sqrt(Math.pow(d.source.x - d.target.x, 2) + Math.pow(d.source.y - d.target.y, 2))) / Math.PI) + ")");
  }

  //右键菜单
  d3.select("#topo_addRelation").on("click", () => {
    debugger
    let d = that.node_obj;
    that.node_obj = null;
    let dragline = d3.select("#dragline").attr("display", null);
    dragline.attr("d", "M" + (d.x + 11) + "," + (d.y + 11) + "L" + (d.x + 22) + "," + (d.y + 22));
    document.onmousemove = () => {
      dragline.attr("d", "M" + (d.x + 11) + "," + (d.y + 11) + "L" + event.offsetX + "," + event.offsetY);
    }
  });
  d3.select("#topo_delCI").on("click", () => {
    debugger
    let d = that.node_obj;
    that.node_obj = null;
    console.log(3 + " " + d)
  });
  d3.select("#topo_delRelation").on("click", () => {
    debugger
    let d = that.link_obj;
    that.link_obj = null;
    console.log(1 + " " + d)
  });

//工具栏
  d3.select("#toolmenu_center").on("click", () => {
    debugger
    update(data);
  });
  d3.select("#toolmenu_fullscreen").on("click", () => {
    debugger
    let element = that.$refs.main_svg;
    if (element.requestFullScreen)
      return element.requestFullScreen();
    if (element.webkitRequestFullScreen)
      return element.webkitRequestFullScreen();
    if (element.mozRequestFullScreen)
      return element.mozRequestFullScreen();
    if (element.msRequestFullscreen)
      return element.msRequestFullscreen();
  });
  d3.select("#toolmenu_saveAsPng").on("click", () => {
    debugger
    let element = that.$refs.main_svg;
    svg2png.saveSvgAsPng(element, "topology.png", {scale: 1})
  });


  node.map(x => {
    debugger
    x.on("click", nodeclick)
      .on("contextmenu", node_right_click)
      .on("mouseover", node_mouseover)
      .on("mouseout", node_mouseout)
      .call(d3.drag()
        .on("start", dragstart)
        .on("drag", dragged)
        .on("end", dragended));
  });

  link.on("mouseover", link_mouseover)
    .on("mouseout", link_mouseout)
    .on("click", link_click);

  function link_click(d) {
    that.link_obj = d;
    let contextmenu = d3.select("#topo_contextmenu")
      .attr("hidden", null)
      .style("left", event.clientX + "px")
      .style("top", event.clientY + "px");
    contextmenu.select("#li_addRelation").attr("hidden", null);
    contextmenu.select("#li_delCI").attr("hidden", null);
    contextmenu.select("#li_delRelation").attr("hidden", "hidden");
    event.preventDefault();//取消默认右键事件
  }

  function link_mouseover(d) {
    debugger
    link.style("stroke", line => {
      if (line.cirid === d.cirid) return "#a9fffd";
    });
    link.style("stroke-width", line => {
      if (line.cirid === d.cirid) return 5;
    });
  }

  function link_mouseout(d) {
    debugger
    link.style("stroke", "#000").style("stroke-width", 1);
  }


  function nodeclick(d) {
    debugger
    let dragline = d3.select("#dragline");
    if (dragline.attr("display") === null) {
      document.onmousemove = null;
      that.$prompt('从 '+d.ciid+" 到 "+d.ciid, '添加关系', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        that.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    } else {
      that.ResData = [];
      that.TypeData = [];
      that.ModelData = [];
      that.dialogVisible = true;
      that.dialogTitle = d._t + " ( " + d.ciid + " )";
      data.PROPERTY[d._t]["ResProperty"].map(x => that.ResData.push({
        "value": x["value"],
        "label": x["label"],
        "data": d[x["value"]] ? d[x["value"]] : ""
      }));
      data.PROPERTY[d._t]["TypeProperty"].map(x => that.TypeData.push({
        "value": x["value"],
        "label": x["label"],
        "data": d[x["value"]] ? d[x["value"]] : ""
      }));
      data.PROPERTY[d._t]["ModelProperty"].map(x => that.ModelData.push({
        "value": x["value"],
        "label": x["label"],
        "data": d[x["value"]] ? d[x["value"]] : ""
      }));
    }
  }

  function node_mouseover(d) {
    let temp = new Set();
    temp.add(d.ciid);
    link.style("stroke", line => {
      if (line.source.ciid === d.ciid || line.target.ciid === d.ciid) {
        temp.add(line.source.ciid);
        temp.add(line.target.ciid);
        return "#000";
      } else {
        return "#d4deca";
      }
    }).style("marker-end", line => {
      if (line.source.ciid === d.ciid || line.target.ciid === d.ciid) {
        return "url(#arrow)";
      } else {
        return "url(#arrow_)";
      }
    });
    link_text.style("opacity", line => {
      if (line.source.ciid === d.ciid || line.target.ciid === d.ciid) {
        return 1;
      } else {
        return 0.1;
      }
    });
    node.map(obj => obj.style("opacity", n => temp.has(n.ciid) ? 1 : 0.1));
  }

  function node_mouseout(d) {
    link.style("stroke-width", 1).style("stroke", "#000").style("marker-end", "url(#arrow)")
    link_text.style("opacity", 1)
    node.map(obj => obj.style("opacity", 1));
  }

  function node_right_click(d) {
    that.node_obj = d;
    let contextmenu = d3.select("#topo_contextmenu")
      .attr("hidden", null)
      .style("left", event.clientX + "px").style("top", event.clientY + "px");
    contextmenu.select("#li_addRelation").attr("hidden", null);
    contextmenu.select("#li_delCI").attr("hidden", null);
    contextmenu.select("#li_delRelation").attr("hidden", "hidden");
    event.preventDefault();//取消默认右键事件
  }

//开始拖拽
  function dragstart(d) {
    if (!d3.event.active) {
      force.alphaTarget(.1).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

//拖拽过程
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

//结束拖拽
  function dragended(d) {
    // force.stop();
    if (!d3.event.active) {
      force.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
}
