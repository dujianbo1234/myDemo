// import request from '@/utils/request'
// import request from './request'

// export default request

const isDev = process.env.NODE_ENV === "development";

let request;

// if is development
if (isDev) {
  // development
  request = require('@/modules/oms/api/request.js').default;
} else {
  // production
  request = require('@/utils/request.js').default;
}

export default request