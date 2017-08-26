<template>
    <button :data-type="type" :data-size="size" :disabled="disabled" class="M-button" @click="onClick">{{text}}</button>
</template>

<script>
import './index.less'
export default {
    props: {
        text: String,
        type: String,
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'm'
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>