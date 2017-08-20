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
  REMOVE: 'REMOVE'

}
const state = {
  all: []

}

const mutations = {
  [mutationTypes.REMOVE] (state) {
  },
  [mutationTypes.RECEIVE_APPLICATION_USERS] (state, {
        appList
    }) {
    state.all = appList
  },
  [mutationTypes.PATCH_APPLICATION_USERS] (state) {}

}

const actions = {
  getAll: co(function* ({
        commit
    }) {
    let appList = yield applicationUserService.getAll()
    commit(mutationTypes.RECEIVE_APPLICATION_USERS, {
      appList
    })
  }),
  patch: co(function* ({
        commit
    }, app) {
    var ret = yield applicationUserService.patch(app)
    commit(mutationTypes.PATCH_APPLICATION_USERS)
  }),
  remove: co(function* ({
    commit
  }, app) {
    var ret = yield applicationUserService.remove(app.id)
  })

}

const getters = {
  all: state => state.all

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
