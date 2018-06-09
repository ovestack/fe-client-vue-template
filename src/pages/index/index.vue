<template>
    <div class="P-index">
        hello world
        <a href="" @click.prevent="go()">to test</a>
        <a href="" @click.prevent="test()">test event</a>
    </div>
</template>

<script>
export default {
    methods: {
        go() {
            this.$router.push('/test')
        },
        test() {
            this.$dispatch('call')
        }
    },
    events: {
        recive(data) {
            console.log(data)
        }
    }
}
</script>

