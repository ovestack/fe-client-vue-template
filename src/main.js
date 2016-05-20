import Vue from 'vue'
// import App from './App'
import store from './store/'
import router from './router'

document.addEventListener('DOMContentLoaded', function() {
	router.start(Vue.extend({
		store
	}), '#app')
})