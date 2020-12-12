import { createApp, defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const app = createApp(defineComponent({
    render: () => (
        <>
            <RouterView />
        </>
    ),
}));
