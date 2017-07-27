import Promise from 'bluebird'
const pathEntity = '/api/ApplicationUsers'
const co = Promise.coroutine

import _ from 'lodash'
export class ApplicationUserService {
  getAll = co(function* () {
    let ret = yield axios.get(pathEntity);
      return ret.data.map(x => {
      x.email = x.email || '';
      x.identification = x.identification || '';
      x.username = x.username || '';
      return x
    })
   
  })
 patch= co(function* (bindingEntity) {
    let ret = yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity)
    return ret.data
  })
 
}