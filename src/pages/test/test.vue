<template>
    <div class="P-test">
        <select v-model="$i18n.locale">
            <option value="ja">日本语</option>
            <option value="cn">中文</option>
            <option value="en">English</option>
        </select>
        <v-form :config="config" :validator="validator" :lang="lang" ref="form"></v-form>
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
                mod: 'v-input',
                key: 'key2',
                lang: 'form.key2',
                required: true,
                props: {
                    config: {}
                },
                data: 'sadsdasdada'
            }],
            lang: {
                ja: {
                    form: {
                        key2: 'タイトル2'
                    }
                },
                cn: {
                    form: {
                        key2: '标题2'
                    }
                },
                en: {
                    form: {
                        key2: 'title2'
                    }
                }
            }
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
