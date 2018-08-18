import Vue from 'vue'
import {
    isUndefined,
    isBoolean,
    isFunction,
    merge
} from 'modules/util'
import './index.less'

var valueIsEmpty = function(val) {
    return val === null || isUndefined(val) || String(val).trim() === ''
}

export default {
    props: {
        config: Array,
        validator: {
            type: Object,
            default() {
                return {}
            }
        },
        lang: Object
    },
    data() {
        return {
            model: {}
        }
    },
    created () {
        if (this.lang) {
            var messages = this._i18n._vm.$data.messages
            Vue.set(this._i18n._vm, 'messages', merge({}, messages, this.lang))
        }
        this.config.forEach(function(conf) {
            Vue.set(this.model, conf.key, conf.data)
        }, this)
    },
    render() {
        var config = this.config,
            model = this.model,
            self = this
        return (
            <div class="M-form">
                {this.config.map(function(config) {
                    return this.buildRow(config)
                }, this)}
            </div>
        )
    },
    methods: {
        setValue(key, val) {
            Vue.set(this.model, key, val)
        },
        buildRow(config) {
            if (isBoolean(config.hide) && config.hide || isFunction(config.hide) && config.hide(this.model)) return
            return (
                <div class={{
                    'M-formRow': true,
                    'error': config.$invalid
                }}>
                    <div class="M-formRowLabel" data-required={config.required}>
                        {config.lang ? this.$t(config.lang) : config.text}
                    </div>
                    <div class="M-formCon">
                        {this.buildCon(config)}
                    </div>
                </div>
            )
        },
        buildCon(config) {
            var model = this.model
            if (config.mod) {
                var Mod = config.mod
                return this.$createElement(config.mod, {
                    props: merge({}, config.props, {
                        value: model[config.key]
                    }),
                    attrs: merge({}, config.attrs),
                    on: {
                        input(value) {
                            config.data = value
                            Vue.set(model, config.key, value)
                        }
                    }
                })
            }
            if (config.$render) {
                return config.$render.call(this, model, this.setValue)
            }
        },
        getVal(key) {
            var model = this.model,
                validator = this.validator
            var item = model[key]
            if (validator[key] && isFunction(validator[key].getVal)) {
                return validator[key].getVal(item, model)
            } else {
                return item
            }
        },
        validate(items) {
            var data = {},
                validateors = this.validator,
                model = this.model
            if (typeof items === 'undefined') {
                items = Object.keys(this.model)
            }
            for (var i = 0,l = items.length; i < l;i++) {
                let key = items[i]
                let val = this.getVal(key)
                let conf = this.getConfigByKey(key)
                if (conf.pass) continue
                data[key] = val
                let validator = validateors[key]
                if (validator) {
                    if (isFunction(validator.validate)) {
                        if (validator.validate(val, model)) {
                            Vue.set(conf, '$invalid', false)
                            continue
                        } else {
                            if (!isUndefined(validator.tip)) {
                                this.$tip(validator.tip)
                            }
                            Vue.set(conf, '$invalid', true)
                            data = null
                            return {
                                $valid: false
                            }
                        }
                    }
                }
                if (valueIsEmpty(val)) {
                    if (conf && conf.required) {
                        Vue.set(conf, '$invalid', true)
                        this.$tip(`${conf.text}不能为空`)
                        data = null
                        return {
                            $valid: false
                        }
                    }
                }
                Vue.set(conf, '$invalid', false)
            }
            return {
                data: data,
                $valid: true
            }
        },
        getConfigByKey(key) {
            var config = this.config
            for (let i = 0, l = config.length; i < l; i++) {
                if (config[i].key == key) {
                    return config[i]
                }
            }
        },
        $getResult(keys) {
            return this.validate(keys)
        }
    }
}
