import axios from 'axios';

const state  = () => ({
    groups: [],
    achievements: []
})

const getters = {
    studentGroup: (state, getters, rootState) => {
        // const achievements = getters.groupDetails;
        return state.groups.map(() => {
            let foundGroup = null
            state.groups.forEach((group) => {
                   group.students.find((student) => {
                        student.id === rootState.account.account.id
                        foundGroup = group
                    })
                }
            )
            return {
                id: foundGroup.id,
                name: foundGroup.name,
                rewards: foundGroup.rewards,
                students: foundGroup.students,
                // achievements: achievements
            }
        })
    },
    groupDetails: (state, getters) => {
        let details = [];
        state.achievements.forEach((achievement) => {
            getters.studentGroup[0].students.forEach((student) => {
                if (achievement.student.id === student.id) {
                    details.push(achievement);
                }
            })
        })
        return details;
    }
}

const actions = {
   async getAllGroups({commit, rootState}) {
       let token = rootState.auth.token
       if (token) {
           await axios.get(`${this.$store.state.url.url}/api/group/groups/`, {
               headers: {
                   'Authorization': token
               }
           })
           .then((response) => {
               commit('setGroups', response);
           })
       }
   },
    async getAllAchievements({commit, rootState}) {
        let token = rootState.auth.token
        if (token) {
            await axios.get(`${this.$store.state.url.url}/api/achievement/studentachievements/`, {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                commit('setAchievements', response);
            })
        }
    }
}

const mutations = {
    setGroups(state, response) {
        state.groups = response.data
    },
    setAchievements(state, response) {
        let achievements = response.data
        achievements.forEach((achievement) => {
            achievement.created_at = new Date(achievement.created_at).toLocaleDateString() + " " + new Date(achievement.created_at).toLocaleTimeString();
        })
        state.achievements = achievements
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}