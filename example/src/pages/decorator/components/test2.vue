<template>
    <div>Test2 ...</div>
    <div>{{aaa}}</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
    <div>{{test}}</div>
    <div>{{computed}}</div>
    <el-button @click="edit">修改</el-button>
</template>
<script lang="ts">
import { ToRefs, watch } from 'vue';
import { Component, dynamic, Prop, PureComponent, Reactived, computed } from '/vue-pandora-decorators/index';

export interface Props {
    aaa: number;
}

export interface State {
    name: number;
    object: any;
}

// 这里可以不定义 Props 和 State 默认 any
@Component
export default class Test2 extends PureComponent<Props, State> implements Reactived<State> {
    
    @dynamic
    public name: number;
    
    @dynamic
    public object: any;

    public test: boolean;

    @Prop
    public aaa!: number;

    @computed
    public get computed() {
        return `${(new Date).getTime()} ${this.aaa} ${JSON.stringify(this.object)}`;
    }

    constructor(props: any, ctx: any){
        super(props, ctx);
        this.name = 111;
        this.object = {};
        this.test = true;
        // // 下面两种等同
        // console.log(this.aaa);
        // console.log(this.props.aaa);
    }

    // 开始生成响应式数据
    onReactived() {
        console.log(`on reactived ...`);
    }

    // 这里 return 的数据会自动 merge 到 component
    public setup(props: any, ctx: any) {
    }

    // 在 setup 后 merge component 完成
    // 可选
    // public reactived() {
    // public reactived(data: ToRefs<this>) {
    public reactived(data: ToRefs<State>) {
        console.log(`reactived ...`);
    }

    // 数据初始化完成 返回到 上下文之前
    // 未定义 State
    // public didReactived(data:ToRefs<this>) {
    // 以定义 State
    public didReactived(data: ToRefs<State>){
        // 下面两种等同
        // watch(this.state.name, ()=>{
        //     console.log(`监听修改 ...`);
        // });
        watch(data.name, ()=>{
            console.log(`监听修改 ...`);
        });
        console.log(`did reactived ...`);
        // 这里一可以 return 初始数据
        return data;
    }

    public edit() {
        console.log(11111, this.name, this.test);
        this.name++;
        this.object.time = (new Date).getTime();
        this.test = !this.test;
    }

    public editProps(){
        this.aaa += 100;
    }
}
</script>
