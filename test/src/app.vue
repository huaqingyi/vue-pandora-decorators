<template>11111</template>
<script lang="ts">
import { Component, useAction, useCommit, Vue } from 'vue-pandora-decorators';
import { AppStore } from './appStore';
import { TestStore, Test } from './testStore';

@Component
export default class extends Vue {
    public get test() {
        return useAction(AppStore).test;
    }

    public async mounted() {
        // console.log(await this.test({}));
        // console.log(Test.name, await Test.updateTest({ aaa: 222 }));
        console.log(await useCommit(TestStore).addTest({ name: 111 }));
    }
}
</script>
<style lang="less" scoped>
#layout {
    height: 100vh;
}
</style>
