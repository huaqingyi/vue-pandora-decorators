<template>
    <div>Test4 ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue';

export default defineComponent({
    setup(){
        return { name: ref(111), object: reactive({}) }
    }
})
</script>
