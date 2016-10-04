export default {
    'index/INIT': function({commit,dispatch}) {
        dispatch('global/LOADING',true)
        dispatch('index/GETDATA').then(function(data) {
            commit('index/INIT',{
                data
            })
            dispatch('global/LOADING',false)
        })
    },
    'index/GETDATA': function({commit}) {
        return new Promise(function(resolve,reject) {
            setTimeout(function() {
                resolve([1,2,3,4,5])
            },2000)
        })
    }
}