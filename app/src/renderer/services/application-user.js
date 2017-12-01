import Promise from 'bluebird'
const pathEntity = '/api/ApplicationUsers'
const co = Promise.coroutine

import _ from 'lodash'
export class ApplicationUserService {
  getAll = co(function*() {
    let ret = yield axios.get(pathEntity)
    return ret.data.map(x => {
      x.email = x.email || ''
      x.identification = x.identification || ''
      x.username = x.username || ''
      return x
    })
  })
  search = co(function*(filter) {
    let ret = yield axios.get(`${pathEntity}?filter=${JSON.stringify(filter)}`)
    return ret.data
  })
  count = co(function*(filter) {
    let ret = yield axios.get(`${pathEntity}/count?where=${JSON.stringify(filter)}`)
    return ret.data
  })
  patch = co(function*(bindingEntity) {
    let ret = bindingEntity.id == undefined ? yield axios.post(`${pathEntity}/replaceOrCreate`, bindingEntity) : yield axios.patch(`${pathEntity}/${bindingEntity.id}`, bindingEntity)
    return ret.data
  })
  remove = co(function*(id) {
    let ret = yield axios.delete(`${pathEntity}/${id}`)
    return ret.data
  })
}
