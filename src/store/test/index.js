import actions from 'action/test'
const state = {
    msg: ''
}

const mutations = {
	['test:ACTION'](state,payload) {
		state.msg = payload
	}
}

export default {
	state,
	mutations,
    actions
}