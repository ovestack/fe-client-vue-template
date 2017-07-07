<template>
    <div class="M-input" :data-type="config.type">
        <template v-if="config.isPsw">
            <input type="password" v-model="val" @input="setValue" :placeholder.once="config.placeholder">
        </template>
        <template v-else>
            <input type="text" v-model="val" @input="setValue" :placeholder.once="config.placeholder">
        </template>
        <i :data-ico="config.type" v-if="config.type" @click="onClick"></i>
    </div>
</template>

<script>
    import mixin from '../mixin.js'
    import './index.less'
    export default {
        mixins: [mixin],
        methods: {
            onClick() {
                this.$emit('click', this.val)
            }
        }
    }
</script>