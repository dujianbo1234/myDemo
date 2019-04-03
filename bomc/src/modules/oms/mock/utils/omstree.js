export function deep(arr) {
  var res = [];
  arr.forEach((item, index) => {
    if (item === "null") {
      return
    }
    var obj = {};
    obj.label = obj.value = item;
    if (arr[index + 1] && arr[index + 1] !== "null") {
      arr.splice(index, 1)
      obj.children = deep(arr);
    }
    res.push(obj);

  })
  return res;
}

export function findParentNode(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 1; j < arr.length - 1; j++) {
      if (arr[i].value === arr[j].value) {
        assign(arr[i], arr[j]);
        arr.splice(j, 1);
      }
    }
  }
}

export function assign(obj1, obj2) {

  var children1 = obj1.children;
  var children2 = obj2.children;

  for (var i = 0; i < children1.length; i++) {
    for (var j = 0; j < children2.length; j++) {
      if (children1[i].value !== children2[j].value) {
        obj1.children = obj1.children.concat(obj2.children);

      } else {
        if (children1[i].children && children2[j].children) {
          assign(children1[i], children2[j]);
        } else if (!children1[i].children && children2[j].children) {
          children1[i].children = children2[j].children;
        }
      }
    }
  }

}