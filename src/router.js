import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes = [{
    path: '/',
    name: 'index',
    component: function(resolve) {
        return require(['components/index'], resolve)
    }
}]

var router = new VueRouter({
	hashbang: false,
    routes
})

export default router