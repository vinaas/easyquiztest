import * as types from '../mutation-types'
import {
    ApplicationUserService
} from '../../services/application-user'
import Promise from 'bluebird'
import _ from 'lodash'
const co = Promise.coroutine
const applicationUserService = new ApplicationUserService()
const mutationTypes = {
  RECEIVE_APPLICATION_USERS: 'RECEIVE_APPLICATION_USERS',
  PATCH_APPLICATION_USERS: 'PATCH_APPLICATION_USERS',
  RECEIVE_SEARCH_USERS: 'RECEIVE_SEARCH_USERS',
  COUNT_USERS: 'COUNT_USERS',
  REMOVE: 'REMOVE'

}
const state = {
  all: [],
  searchUsers: [],
  totalRows: 0
}

const mutations = {
  [mutationTypes.REMOVE] (state) {},
  [mutationTypes.RECEIVE_APPLICATION_USERS] (state, {
        appList
    }) {
    state.all = appList
  },
  [mutationTypes.PATCH_APPLICATION_USERS] (state) {},
  [mutationTypes.RECEIVE_SEARCH_USERS] (state, {
        userList
    }) {
    state.searchUsers = userList
  },
  [mutationTypes.COUNT_USERS] (state,
        count
    ) {
    state.totalRows = count
  }
}

const actions = {
  getAll: co(function*({
        commit
    }) {
    let appList = yield applicationUserService.getAll()
    commit(mutationTypes.RECEIVE_APPLICATION_USERS, {
      appList
    })
  }),
  patch: co(function*({
        commit
    }, app) {
    var ret = yield applicationUserService.patch(app)
    commit(mutationTypes.PATCH_APPLICATION_USERS)
  }),
  remove: co(function*({
        commit
    }, app) {
    var ret = yield applicationUserService.remove(app.id)
  }),
  search: Promise.coroutine(function*({ commit }, filter) {
    let userList = yield applicationUserService.search({ skip: filter.page * filter.pageSize, limit: filter.pageSize })
    commit(mutationTypes.RECEIVE_SEARCH_USERS, { userList })
  }),
  count: Promise.coroutine(function*({ commit }, filter) {
    let result = yield applicationUserService.count(filter)
    commit(mutationTypes.COUNT_USERS, result.count)
  })
}

const getters = {
  all: state => state.all,
  searchUsers: state => state.searchUsers
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
