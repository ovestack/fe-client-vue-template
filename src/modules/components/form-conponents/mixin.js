export default {
    created () {
        if (typeof this.value !== 'undefined') {
            this.val = this.value
        }
    },
    data() {
        return {
            val: ''
        }
    },
    props:{
        config:{
            default() {
                return {}
            }
        },
        value: null
    },
    methods: {
        setValue(e) {
            this.$emit('input', this.val)
        }
    }
}