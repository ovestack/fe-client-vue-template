import Vuex from 'vuex'
import Vue from 'vue'
import global from './global/index'
import index from './index/index'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
	modules: {
        global,
		index
	}
})