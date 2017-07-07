<template>
    <div class="M-textarea">
        <textarea v-model="val" @input="setValue" :placeholder.once="config.placeholder"></textarea>
        <span v-if="config.limit" :class="{
            'M-invalid': val.length > config.limit
        }">
            {{val.length}} / {{config.limit}}
        </span>
    </div>
</template>

<script>
    import mixin from '../mixin.js'
    import './index.less'
    export default {
        mixins: [mixin]
    }
</script>