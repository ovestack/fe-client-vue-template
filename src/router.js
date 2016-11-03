import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes = [{
    path: '/',
    name: 'index',
    component: function(resolve) {
        return require(['pages/index'], resolve)
    }
}]

var router = new VueRouter({
    routes
})

export default router