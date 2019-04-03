let tree = []
function getIndex(id, array) {
  for (const i in array) {
    if (array[i].id === id) { return i }
  }
}
// 根据菜单主键id获取下级菜单
// id：菜单主键id
// arry：菜单数组信息
function getChildArry(id, array) {
  var newArry = []
  for (var i in array) {
    if (array[i].pid === id) { newArry.push(array[i]) }
  }
  return newArry
}

// 根据菜单主键id生成菜单列表html
// id：菜单主键id
// arry：菜单数组信息
function getItem(id, array) {
  const childArry = getChildArry(id, array)
  var item = tree[getIndex(id, array)]
  if (childArry.length > 0) {
    item['children'] = []
    for (var i in childArry) {
      item['children'].push(childArry[i])
      getItem(childArry[i].id, array)
    }
  }
  return item
}

export function getRoot(array) {
  var ids = new Set()
  var pids = new Set()
  array.forEach(item => {
    ids.add(item.id)
    pids.add(item.pid)
  })
  for (const id of ids) {
    if (pids.has(id)) {
      pids.delete(id)
    }
  }
  return pids
}
// 根据出入数据生成treeTable
// pid为父节点的值
// arry为需要转成tree的数组
export function getSubTree(pid, array) {
  const childArry = getChildArry(pid, array)
  tree = array
  const mytree = []
  if (childArry.length > 0) {
    for (const i in childArry) {
      mytree.push(getItem(childArry[i].id, array))
    }
  }
  return mytree
}
// 根据出入数据生成treeTable,不指定Pid
export function getTree(array) {
  const roots = getRoot(array)
  const mytree = []
  tree = array
  for (const rootId of roots) {
    const childArry = getChildArry(rootId, array)
    if (childArry.length > 0) {
      for (const i in childArry) {
        mytree.push(getItem(childArry[i].id, array))
      }
    }
  }
  // debugger
  return mytree
}
// 参考数据格式
// tree: [{ 'name': '若依集团', 'pid': 0, 'id': 100, 'title': '若依集团' }, { 'name': '研发部门', 'pid': 100, 'id': 101, 'title': '研发部门' }, { 'name': '市场部门', 'pid': 100, 'id': 102, 'title': '市场部门' }, { 'name': '测试部门', 'pid': 100, 'id': 103, 'title': '测试部门' }, { 'name': '财务部门', 'pid': 100, 'id': 104, 'title': '财务部门' }, { 'name': '运维部门', 'pid': 100, 'id': 105, 'title': '运维部门' }, { 'name': '研发一部', 'pid': 101, 'id': 106, 'title': '研发一部' }, { 'name': '研发二部', 'pid': 101, 'id': 107, 'title': '研发二部' }, { 'name': '市场一部', 'pid': 102, 'id': 108, 'title': '市场一部' }]
// getTree(0, tree)
