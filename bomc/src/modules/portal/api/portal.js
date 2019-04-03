import request from '@/utils/request'
import Cookies from 'js-cookie'

const verInfo = '/pps/api/v1'
// const verInfo = '/test'
const userId = Cookies.get('userId') || '1'
export default {
  roleSch(formSch) { // 角色列表
    return request({
      url: verInfo + '/role/list',
      method: 'post',
      data: { 'roleName': '', 'roleKey': '', 'status': '', 'params': { 'beginTime': '', 'endTime': '' }}
    })
  },
  userSch(formSch) { // 角色列表
    return request({
      url: verInfo + '/user/list',
      method: 'post',
      data: { 'userName': '', 'phone': '', 'region': '', 'params': { 'beginTime': '', 'endTime': '' }}
    })
  },
  // 查询所有模版
  getAllTemplate(pageSize, pageNumber) {
    return request({
      url: verInfo + '/templet',
      method: 'get'
    })
  },
  // 创建新模版
  add_template(templet) {
    console.log(templet)
    return request({
      url: verInfo + '/templet?userId=' + userId,
      method: 'post',
      // data: qs.stringify({
      data: {
        'authority': 'string',
        'stateFlag': 'string',
        'templetId': 0,
        'templetJson': templet.templetJson,
        'templetName': templet.templetName,
        'templetType': templet.iconClass
      // })
      }
    })
  },
  // 更新模版
  update_template(template) {
    return request({
      url: verInfo + '/templet?userId=' + userId,
      method: 'put',
      data: {
        'authority': 'string',
        'stateFlag': 'string',
        'templetId': template.templetId,
        'templetJson': template.templetJson,
        'templetName': template.templetName,
        'templetType': templet.iconClass
      }
    })
  },
  // 绑定模版到用户或角色
  assign_template(templateId, info) {
    return request({
      url: verInfo + '/templet/assignTemplet?templetId=' + templateId + '&Id=' + info.id + '&idString=' + info.string,
      method: 'post'
    })
  },
  // 通过角色id查询所有模版
  getTemplateByRole(roleId) {
    return request({
      url: verInfo + '/templet/getTempletListByRoleId?roleId=' + roleId,
      method: 'get'
    })
  },
  // 通过用户id查询所有模版
  getTemplateByUserId() {
    return request({
      url: verInfo + '/templet/getTempletListByUserId?userId=' + userId,
      method: 'get'
    })
  },
  // 通过模版id删除模版
  delete_template(templateId) {
    return request({
      url: verInfo + '/templet/templetById?userId=' + userId + '&templetId=' + templateId,
      method: 'delete'
    })
  },
  // 通过模版id查找模版
  getTemplateById(templateId) {
    return request({
      url: verInfo + '/templet/templetById?&templetId=' + templateId,
      method: 'get'
    })
  },
  // 通过模版 name删除模版
  delete_templateByName(templateName) {
    return request({
      url: verInfo + '/templet/templetByName?&templetName=' + templateName,
      method: 'delete'
    })
  },
  // 通过模版name查找模版
  getTemplateByName(templateName) {
    return request({
      url: verInfo + '/templet/templetByName?&templetName=' + templateName,
      method: 'get'
    })
  },
  getGridData() {
    return request({
      url: verInfo + '/findTempletLocation?userId=' + userId,
      method: 'get'
    })
  },
  saveGridData(layout) {
    return request({
      url: verInfo + '/templetLocation?userId=' + userId,
      method: 'post',
      data: {
        locationInfo: JSON.stringify(layout)
      }
    })
  }

}
