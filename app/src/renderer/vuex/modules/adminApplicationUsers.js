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
    CURRENT: 'CURRENT',
    RESET_CURRENT: 'RESET_CURRENT',
    UPDATE_CURRENT: 'UPDATE_CURRENT',
    REMOVE: 'REMOVE'
}
const state = {
    all: [],
    current: {
        
    }
}

const mutations = {
     [mutationTypes.REMOVE](state) {
  
    },
    [mutationTypes.RESET_CURRENT](state, selected) {

        state.current = {
           
        };

    },
    [mutationTypes.UPDATE_CURRENT](state, selected) {

        if (_.isEmpty(selected)) {
            state.current =  {
           
        };
            return;
        }
        state.current = selected;

    },
    [mutationTypes.CURRENT](state, selected) {
        if (_.isEmpty(selected)) {
            state.current = state.current;
            return;
        }
        let filter = state.all.filter(x => selected && x.id == selected.id)
        state.current = filter[0]

    },

    [mutationTypes.RECEIVE_APPLICATION_USERS](state, {
        appList
    }) {
        state.all = appList
    },
    [mutationTypes.PATCH_APPLICATION_USERS](state) {}

}

const actions = {
    updateCurrent: Promise.coroutine(function* ({ commit }, selected) {
    commit(mutationTypes.UPDATE_CURRENT, selected)
  }),
    current: function ({
        commit
    }, selected) {
        commit(mutationTypes.CURRENT, selected)
    },
    getAll: co(function* ({
        commit
    }) {
        let appList = yield applicationUserService.getAll();
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
    all: state => state.all,
    current:state=>state.current,
     title: state => state.current.id!=undefined ? 'Cập nhật' : 'Tạo mới' 
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}