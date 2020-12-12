<template>
    <div>Test1 ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
    <test4></test4>
</template>
<script lang="ts">
import Test4 from './test4.vue';
import { reactive, ref, defineComponent } from 'vue';

export default defineComponent({
    components:{
        Test4,
    },
    setup(){
        return { name: ref(111), object: reactive({}) }
    }
})
</script>
