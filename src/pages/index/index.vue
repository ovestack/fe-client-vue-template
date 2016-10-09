<style>

</style>

<template>
    <section>
        <ul>
            <li v-for="d in data">
                {{d}}
            </li>
        </ul>
        <router-view></router-view>
    </section>
</template>

<script>
import {init} from '../../action/index.js'

export default {
    ready() {
        this.init()
    },
    vuex: {
        getters: {
            data(state) {
                return state.index.data
            }
        },
        actions: {
            init
        }
    }
}
</script>

