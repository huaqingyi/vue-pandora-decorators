import { router } from '/@/rotuer';

router.beforeEach((to, from, next) => {
    // router.replace(to.path);
    next();
});

router.afterEach(() => {

});
