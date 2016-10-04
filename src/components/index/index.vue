<style>
    body {
        color: red;
    }
</style>

<template>
    <section>
        <ul>
            <li v-for="item in data">
                {{item}}
            </li>
        </ul>
    </section>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    mounted: function() {
        this.init()
    },
    computed: {
        ...mapState({
            data(state) {
                return state.index.data
            }
        })
    },
    methods: {
        ...mapActions({
            init: 'index/INIT'
        })
    }
}
</script>

