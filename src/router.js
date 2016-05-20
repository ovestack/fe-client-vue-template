import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	hashbang: false
})

router.map({
	'/': {
		name: 'index',
		component: function(resolve) {
			return require(['./components/posts/'], resolve)
		}
	}
})

router.alias({
	'/posts': '/'
})

router.redirect({
	'*': '/',
})

export default router