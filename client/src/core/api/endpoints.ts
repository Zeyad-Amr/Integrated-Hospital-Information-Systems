const Endpoints = {
    user: {
        login: '/user/login',
        me: '/user/me',
    },
    employee: {
        list: '/employee',
        details: '/employee/:id',
        create: '/employee',
        update: '/employee/:id',
        delete: '/employee/:id',
    },
};
export default Endpoints;
