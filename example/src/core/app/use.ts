import { app } from '../core';
import { router } from '/@/rotuer';
import store from '/@/store';
import ElementPlus from 'element-plus';

app.use(router);
app.use(store);
app.use(ElementPlus);
