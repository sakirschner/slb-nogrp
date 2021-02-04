import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import account from './modules/account'
import group from './modules/group'
import url from './modules/url'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        account,
        group,
        url
    }
})