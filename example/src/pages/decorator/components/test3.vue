<template>
    <div>Test3 ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
</template>
<script lang="ts">
import { Component, Mixin } from '/vue-pandora-decorators/index';
// import { reactive, ref } from 'vue';
import Test2 from './test2.vue';

@Component
export default class extends Mixin(Test2) {
    // public setup(props: any, ctx: any) {
    //     return { name: ref(111), object: reactive({}) };
    // }
}
</script>
