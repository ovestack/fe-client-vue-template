<template>
    <div class="M-select">
        <select v-model="val" @change="setValue">
            <option value="" v-if="config.defOption">{{config.defOption}}</option>
            <option :value="option.val" v-for="option in config.options">{{option.text}}</option>
        </select>
    </div>
</template>

<script>
    import mixin from '../mixin.js'
    import './index.less'
    export default {
        mixins: [mixin]
    }
</script>