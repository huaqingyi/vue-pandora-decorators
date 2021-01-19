<template>11111</template>
<script lang="ts">
import { Component, useAction, Vue } from 'vue-pandora-decorators';
import { AppStore } from './appStore';

@Component
export default class extends Vue {
    public get test() {
        return useAction(AppStore).test;
    }
    public mounted() {
        this.test({});
    }
}
</script>
<style lang="less" scoped>
#layout {
    height: 100vh;
}
</style>
