<template>
    <div class="P-test">
        <v-form :config="config" :validator="validator" ref="form"></v-form>
        <p>
            {{msg}}
        </p>
        <button @click="onTestVuex('hahahahhsss')">test vuex</button>
        <button @click="onGo">go inner</button>
        <router-view></router-view>
    </div>
</template>

<script>
import vForm from 'components/form'
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        var self = this
        var opts = [{
            text: '11',
            val: '11'
        },{
            text: '12',
            val: '12'
        }]
        return {
            validator: {
                key1: {
                    tip: '该内存不能为read',
                    validate: function(val) {
                        return !!val
                    }
                }
            },
            config: [{
                text: '标题2',
                mod: 'v-input',
                key: 'key2',
                required: true,
                props: {
                    config: {}
                },
                data: 'sadsdasdada'
            },{
                text: '标题3',
                mod: 'v-select',
                key: 'key3',
                props: {
                    config: {
                        defOption: 'xxxx',
                        options: opts
                    }
                },
                data: 11
            },{
                text: '标题4',
                mod: 'v-textarea',
                key: 'key4',
                required: true,
                props: {
                    config: {
                        placeholder: '啊哈啊啊啊啊'
                    }
                },
                data: 111
            },{
                text: '标题5',
                mod: 'v-checkbox',
                key: 'key5',
                props: {
                    config: {
                        options: opts
                    }
                },
                data: ['12']
            },{
                text: '标题6',
                mod: 'v-checkbox',
                key: 'key6',
                props: {
                    config: {
                        text: 'aaaa'
                    }
                },
                data: false
            },{
                text: '标题7',
                mod: 'v-radio',
                key: 'key7',
                props: {
                    config: {
                        options: opts
                    }
                },
                data: 12,
                hide: function(model) {
                    return !model.key6
                }
            }]
        }
    },
    computed: {
        ...mapState({
            msg(state) {
                return state.test.msg
            }
        })
    },
    methods: {
        ...mapActions({
            onTestVuex: 'test:ACTION'
        }),
        onGo() {
            this.$router.push('/test/inner')
        }
    },
    components: {
        vForm
    }
}
</script>
