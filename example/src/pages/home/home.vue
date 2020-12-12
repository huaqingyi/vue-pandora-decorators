<template>
    <div>home ...</div>
    <div>{{userInfo}}</div>
    <el-button @click="editUser">修改</el-button>
</template>
<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue';

export class UserInfo {
    public username: string;
    public password: string;
    public updated: number;
    constructor() {
        this.username = '';
        this.password = '';
        this.updated = (new Date).getTime();
    }
}

export default defineComponent({
    setup(){
        const userInfo: UnwrapRef<UserInfo> = reactive(new UserInfo);
        function editUser(){
            console.log('editUser');
            userInfo.updated = (new Date).getTime();
        }
        return { userInfo, editUser };
    }
});
</script>