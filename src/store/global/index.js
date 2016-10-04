import actions from 'action/global'
const state = {
	loading: true
}

const mutations = {
	'global/LOADING': function(state,payload) {
		state.loading = payload.status
	}
}

export default {
	state,
	mutations,
    actions
}