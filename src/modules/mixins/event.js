import Vue from 'vue'

var broadcastEvent = function(key, ...args) {
    var vms = this.$children
    if (vms) {
        vms.forEach((vm) => {
            let ret = emitEvent.call(vm, key,  ...args)
            if (ret === false) {
                return
            }
            broadcastEvent.call(vm, key, ...args)
        })
    }
}

var dispatchEvent = function(key, ...args) {
    var parent = this.$parent
    if (parent) {
        let ret = emitEvent.call(parent, key,  ...args)
        if (ret === false) {
            return
        }
        dispatchEvent.call(parent, key, ...args)
    }
}

var emitEvent = function(key, ...args) {
    var events = this.$options.events
    if (events && events.hasOwnProperty(key)) {
        return events[key].call(this, ...args)
    }
}

export default {
    created() {
        this.$dispatch = function(...args) {
            dispatchEvent.call(this, ...args)
        }
        this.$broadcast = function(...args) {
            broadcastEvent.call(this, ...args)
        }
        var $emit = this.$emit
        this.$emit = function(...args) {
            $emit.call(this, ...args)
            emitEvent.call(this, ...args)
        }
    },
    destroy() {
        this.$dispatch = this.$broadcast = null
    }
}