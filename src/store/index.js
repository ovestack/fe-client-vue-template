import Vuex from 'vuex'
import Vue from 'vue'
import index from './index/index'

import createLogger from 'vuex/logger'

Vue.use(Vuex)

export default new Vuex.Store({
	middlewares: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
	modules: {
		index
	}
})