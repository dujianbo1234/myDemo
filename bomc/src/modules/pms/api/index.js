// import devRequest from './request';
// import prodRequest from '@/utils/request';

const isDev = process.env.NODE_ENV === "development";

let request;

 // if is development
if(isDev) { 
  // development
  request = require('@/modules/pms/api/request.js').default;
}else {
  // production
  request = require('@/utils/request.js').default;
}

export default request;
