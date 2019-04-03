
const encode = function (obj) {
  let str1 = JSON.stringify(obj)
  let str2 =str1.replace(/{/g,'').replace(/}/g,'').replace(/:/g,'=').replace(/"/g,'').split(',');
  return str2
}

const objToStr = (obj)=>{
  //{a:b,c:d}
  let str1 = JSON.stringify(obj);
  let str2 = str1.replace(/{/g,'').replace(/}/g,'').replace(/:/g,'=').replace(/"/g,'').replace(/,/g,'&')
  return str2
}

export  {
  encode,
  objToStr
}
  
