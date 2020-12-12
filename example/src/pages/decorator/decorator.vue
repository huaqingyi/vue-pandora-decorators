<template>
    <div>Dec ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
    <!-- <test1></test1> -->
    <test2 :aaa="aaa"></test2>
    <!-- <test3></test3> -->
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import Test1 from './components/test1.vue';
import Test2 from './components/test2.vue';
// import Test3 from './components/test3.vue';

export default {
    components: {
        Test1,
        Test2,
        // Test3,
    },
    setup() {
        const aaa = ref(333);
        setInterval(()=>{
            aaa.value ++;
        }, 1000);
        return { name: ref(111), object: reactive({}), aaa }
    }
}
</script>
