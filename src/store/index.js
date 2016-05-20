import Vuex from 'vuex'
import Vue from 'vue'
import posts from './posts/'

import createLogger from 'vuex/logger'

Vue.use(Vuex)

export default new Vuex.Store({
	middlewares: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
	modules: {
		posts
	}
})