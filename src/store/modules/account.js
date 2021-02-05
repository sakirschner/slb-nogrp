import axios from "axios"

const state = () => ({
    account: {},
    error: {},
    class: []
})

const actions = {
    registerAccount({commit}, payload) {
        axios.post(`${this.$store.state.url.url}/api/user/create/`, payload)
            .then((response) => {
                commit('setAccount', response)
                commit('auth/setAuthentication', null, {root: true})
            }
        )
            .catch((error) => {
                commit('setError', error)
            }
        )
    },
    getAccount({commit, rootState}) {
        console.log("getting account")
        let token = rootState.auth.token
        if (token) {
            axios.get(`${this.$store.state.url.url}/api/user/me/`, {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                commit('setAccount', response);           
            })
            .catch((error) => {
                commit('auth/setError', error, { root:true })
            })
        }
    },
    getClass({commit, rootState}) {
        let token = rootState.auth.token
        if (token) {
            axios.get(`${this.$store.state.url.url}/api/user/`, {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                commit('setClass', response);           
            })
        }
    }
}

const mutations = {
    setAccount(state, response) {
        state.account = response.data
    },
    setError(state, error) {
        state.error = error
    },
    setClass(state, response) {
        state.class = response.data
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}