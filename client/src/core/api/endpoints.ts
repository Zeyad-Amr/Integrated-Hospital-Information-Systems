const Endpoints = {
    user: {
        login: '/user/login',
        me: '/user/me',
    },
    staff: {
        list: '/staff',
        details: '/staff/:id',
        create: '/staff',
        update: '/staff/:id',
        delete: '/staff/:id',
    },
};
export default Endpoints;
