<template>
    <div class="P-layout">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    events: {
        call() {
            this.$broadcast('recive', 'world')
        }
    }
}
</script>

