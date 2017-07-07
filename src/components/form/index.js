import Vue from 'vue'
import util from 'modules/util'
import './index.less'

var valueIsEmpty = function(val) {
    return val === null || util.isUndefined(val) || String(val).trim() === ''
}

export default {
    props: {
        config: Array,
        validator: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            model: {}
        }
    },
    created () {
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
            if (util.isBoolean(config.hide) && config.hide || util.isFunction(config.hide) && config.hide(this.model)) return
            return (
                <div class={{
                    'M-formRow': true,
                    'error': config.$invalid
                }}>
                    <div class="M-formRowLabel" data-required={config.required}>
                        {config.text}
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
                    props: util.merge({}, config.props, {
                        value: model[config.key]
                    }),
                    attrs: util.merge({}, config.attrs),
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
            if (validator[key] && util.isFunction(validator[key].getVal)) {
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
                    if (util.isFunction(validator.validate)) {
                        if (validator.validate(val, model)) {
                            Vue.set(conf, '$invalid', false)
                            continue
                        } else {
                            if (!util.isUndefined(validator.tip)) {
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
