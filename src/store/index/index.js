import actions from 'action/index'
const state = {
	data: []
}

const mutations = {
	'index/INIT': function(state,payload) {
		state.data = payload.data
	}
}

export default {
	state,
	mutations,
    actions
}