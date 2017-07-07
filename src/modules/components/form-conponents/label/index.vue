<template>
    <span class="M-label">
        {{text}}
    </span>
</template>

<script>
    import './index.less'
    export default {
        props: {
            text: String
        }
    }
</script>