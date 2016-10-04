<style>

</style>

<template>
    <div v-show="loading">loading...</div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState({
                loading(state) {
                    return state.global.loading
                }
            })
        }
    }
</script>