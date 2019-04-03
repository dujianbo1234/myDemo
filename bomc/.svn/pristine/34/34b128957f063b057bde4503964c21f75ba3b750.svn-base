//cell style
const title_style = {  //设置主标题样式
  fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: "FFFFD700"}},
  border: {top: {style: 'double'}, left: {style: 'double'}, bottom: {style: 'double'}, right: {style: 'double'}},
  alignment: {horizontal: "center", vertical: "center", wrapText: true},
  font: {name: 'Comic Sans MS', family: 4, size: 16, bold: true}
};
const subtitle_style = {  //设置副标题样式
  fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: "FFFFEC8B"}},
  border: {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}},
  alignment: {horizontal: "center", vertical: "center", wrapText: true},
  font: {name: 'Comic Sans MS', family: 4, size: 12, bold: true}
};
const TYPES = {
  "Business": "业务类",
  "Application": "应用类",
  "Logic": "逻辑类",
  "Physical": "物理类",
  "Other": "其他类"
};
const ResourceObject = [
  'ciid',
  'ciname',
  'state',
  'check',
  'last_check_time',
  'create_time',
  'isdelete',
  'delete_time',
  'management',
  'last_update_person',
  'last_update_time',
  'description'
];
const ResourceObjectvalue = [
  "搜索代码",
  "名称",
  "状态",
  "审核状态",
  "最近审核时间",
  "创建时间",
  "删除状态",
  "删除时间",
  "配置管理员",
  "最后更新人",
  "最后更新时间",
  "资源描述"
];
const TypeObject = {
  'Business': [
    "level",
    "name",
    "module",
    "sub_module",
    "influence_area",
    "influence_customer",
    "influence_system",
    "department",
    "service_level",
    "integrator"
  ],
  'Application': [
    "level",
    "name",
    "module",
    "sub_module",
    "influence_area",
    "influence_customer",
    "influence_system",
    "department",
    "service_level",
    "integrator",
    "service_provider"
  ],
  'Logic': [
    "level",
    "name",
    "module",
    "sub_module",
    "influence_area",
    "influence_customer",
    "influence_system",
    "department",
    "service_level",
    "integrator",
    "service_provider"
  ],
  'Physical': [
    "level",
    "asset_number",
    "serial_number",
    "name",
    "module",
    "sub_module",
    "influence_area",
    "influence_customer",
    "influence_system",
    "department",
    "service_start",
    "service_end",
    "manufacturer",
    "service_level",
    "service_provider",
    "service_tel"
  ],
  'Other': ["location"]
};
const TypeObjectvalue = {
  'Business': [
    "云计算层级",
    "系统名称",
    "模块名称",
    "子模块名称",
    "影响区域",
    "影响客户",
    "影响系统",
    "使用部门",
    "服务级别",
    " 集成商"
  ],
  'Application': [
    "云计算层级",
    "系统名称",
    "模块名称",
    "子模块名称",
    "影响区域",
    "影响客户",
    "影响系统",
    "使用部门",
    "服务级别",
    "集成商",
    "服务提供商"
  ],
  'Logic': [
    "云计算层级",
    "系统名称",
    "模块名称",
    "子模块名称",
    "影响区域",
    "影响客户",
    "影响系统",
    "使用部门",
    "服务级别",
    "集成商",
    "服务提供商"
  ],
  'Physical': [
    "云计算层级",
    "资产号",
    "序列号",
    "系统名称",
    "模块名称",
    "子模块名称",
    "影响区域",
    "影响客户",
    "影响系统",
    "使用部门",
    "服务开始日期",
    "服务到期日期",
    "厂商",
    "服务级别",
    "服务提供商",
    "服务联系方式"
  ],
  'Other': ["物理位置"]
};
/**
 * 导出excel
 * @param models 资源模型信息，获取类型、专有属性等信息
 * @param data 导出的数据，无表示导出模板
 */
export const export_excel = (models, data) => {
  let model = Object.keys(models);
  //create a workbook
  let Excel = require('exceljs/dist/es5/exceljs.browser');
  let workbook = new Excel.Workbook();
  for (let i = 0; i < model.length; i++) {
    let worksheet = workbook.addWorksheet(model[i]);
    const res_len = ResourceObject.length;
    const type_len = TypeObject[models[model[i]]['uri'].split('.')[1]].length;
    const private_len = models[model[i]].hasOwnProperty('attributes') ? models[model[i]]['attributes'].length : 0;
    let title = ['通用属性'];
    let temp = res_len;
    while (--temp) title.push('');
    title.push(models[model[i]]['type'] + '属性');
    temp = type_len;
    while (--temp) title.push('');
    private_len === 0 ? 1 : title.push('专有属性');
    worksheet.addRow(title);
    worksheet.mergeCells(0, 0, 0, res_len);
    worksheet.mergeCells(0, res_len + 1, 0, res_len + type_len);
    if (private_len > 1) worksheet.mergeCells(0, res_len + type_len + 1, 0, res_len + type_len + private_len);
    for (let m = 1; m <= res_len; m++) {
      worksheet.getCell(1, m).style = title_style;
    }
    for (let m = res_len + 1; m <= res_len + type_len; m++) {
      worksheet.getCell(1, m).style = title_style;
    }
    for (let m = res_len + type_len + 1; m <= res_len + type_len + private_len; m++) {
      worksheet.getCell(1, m).style = title_style;
    }
    let attra = private_len === 0 ? [] : models[model[i]]['attributes'];
    const PrivateObject = [];
    const PrivateObjectvalue = [];
    for (let j = 0; j < attra.length; j++) {
      PrivateObject.push(attra[j]['name']);
      PrivateObjectvalue.push(attra[j]['description'])
    }
    let titleline = [];
    ResourceObjectvalue.map(x => titleline.push(x))
    TypeObjectvalue[models[model[i]]['uri'].split('.')[1]].map(x => titleline.push(x))
    PrivateObjectvalue.map(x => titleline.push(x))
    worksheet.addRow(titleline);
    for (let m = 1; m <= type_len + res_len + private_len; m++) {
      worksheet.getCell(2, m).style = subtitle_style;
    }
    if (data) {//写入数据
      let datas = data[model[i]];
      let line = [];
      let n = 3;
      for (let k = 0; k < datas.length; k++) {
        line = [];
        //写入根类属性，属性名以_time结尾的转成YYYY-MM-SS HH:MM:SS格式
        ResourceObject.map(x => {
          if(x.endsWith("_time")){
            let time = new Date(parseInt(datas[k][x])).toLocaleString();
            line.push(time==="Invalid Date"?"":time);
          }else if(x === "ciname"&&datas[k][x].startsWith("*")){
            line.push(datas[k][x].substring(1))
          }else{
            line.push(datas[k][x])
          }
        });
        TypeObject[models[model[i]]['uri'].split('.')[1]].map(x => line.push(datas[k][x]));
        PrivateObject.map(x => line.push(datas[k][x]));
        worksheet.addRow(line);
      }
    }
  }
  /*let worksheet_relation = workbook.addWorksheet("资源关系");
  worksheet_relation.addRow(['源资源搜索代码', '关系类型', '目标资源搜索代码']);
  worksheet_relation.getCell('A1').style = title_style;
  worksheet_relation.getCell('B1').style = title_style;
  worksheet_relation.getCell('C1').style = title_style;
  worksheet_relation.getColumn('A').width = 30;
  worksheet_relation.getColumn('B').width = 20;
  worksheet_relation.getColumn('C').width = 30;
  for (let c = 2; c < 200; c++) {
    worksheet_relation.getCell('B' + c).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Deployed(部署),NetConnects(网络连接),StorConnects(存储连接),Uses(使用),Depends(依赖),BasedOn(基于),RunsOn(运行在)"']
    };
  }*/

  workbook.xlsx.writeBuffer().then(function (buffer) {
    saveAs(new Blob([buffer], {type: "application/octet-stream"}),
      "资源数据" + getNowFormatDate() + '.xlsx');
  });
};

export const import_excel = (models, data) => {
  let jsondata = {};
  let sheets = Object.keys(data);   //[Host,Route,...]
  for (let i = 0; i < sheets.length; i++) {
    if (models.hasOwnProperty(sheets[i])) {
      jsondata[sheets[i]] = [];
      let keys = [];
      ResourceObject.map(x => keys.push(x));
      TypeObject[models[sheets[i]]['uri'].split('.')[1]].map(x => keys.push(x));
      if (models[sheets[i]].hasOwnProperty('attributes')) {
        models[sheets[i]]['attributes'].map(x => keys.push(x['name']));
      }
      for (let j = 0; j < data[sheets[i]].length; j++) {
        let line = {};
        let value = data[sheets[i]][j];
        //空行或ciid
        // if(value.length<2||value[0] == null||value[0].length!=17)continue;
        for (let k in keys) {
          line[keys[k]] = value[k]==undefined?"":value[k];
        }
        jsondata[sheets[i]].push(line);
      }
    } else if (sheets[i] === '资源关系') {
      jsondata['资源关系'] = data[sheets[i]]
      console.log(JSON.stringify(jsondata));
    } else {

    }
  }
  return jsondata;
};
const saveAs = (obj, fileName) => {
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj);
  tmpa.click();
  setTimeout(function () {
    URL.revokeObjectURL(obj);
  }, 100);
};

const getNowFormatDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + new Date().getTime();
  return currentdate;
}
