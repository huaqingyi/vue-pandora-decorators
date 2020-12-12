import { app } from '../core';
import Axios from 'axios';
import http from '/@/config/http';

app.config.globalProperties.$axios = Axios;
app.config.globalProperties.$http = Axios.create(http);
