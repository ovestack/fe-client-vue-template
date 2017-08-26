<template>
    <div class="M-checkbox">
        <template v-for="option,index in config.options" v-if="config.options">
            <label :for="unionId + index"><input type="checkbox" :id="unionId + index" v-model="val" :value="option.val" @change="setValue" ><span>{{option.text}}</span></label>
        </template>
        <template v-if="!config.options">
            <label :for="unionId"><input type="checkbox" :id="unionId" v-model="val" @change="setValue"><span>{{config.text}}</span>
            </label>
        </template>
    </div>
</template>

<script>
    import mixin from '../mixin.js'
    import './index.less'
    var UID = 1
    export default {
        data() {
            UID++
            return {
                unionId: '_M_CHECKBOX_' + UID
            }
        },
        mixins: [mixin]
    }
</script>