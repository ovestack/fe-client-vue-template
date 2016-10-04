import actions from 'action/index'
const state = {
	data: []
}

const mutations = {
	'index/INIT': function(state) {
		state.data = [1, 2, 3]
	}
}

export default {
	state,
	mutations,
    actions
}