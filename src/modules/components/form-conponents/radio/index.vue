<template>
    <div class="M-radio">
        <template v-for="option,index in config.options">
            <label :for="unionId + index"><input type="radio" :id="unionId + index" :value="option.val" v-model="val" @change="setValue"><span>{{option.text}}</span></label>
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
                unionId: '_M_RADIO_' + UID
            }
        },
        mixins: [mixin]
    }
</script>