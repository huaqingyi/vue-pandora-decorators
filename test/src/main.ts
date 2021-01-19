import { createApp } from 'vue';
import store from './store';
import App from './app.vue';

export async function bootstrap() {
    const app = createApp(App);
    app.use(store as any);
    return app.mount('#app');
}

bootstrap();
