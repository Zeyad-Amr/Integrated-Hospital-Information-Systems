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
    visit: {
        list: '/visit',
        details: '/visit/:visitcode',
        create: '/visit/',
        createAnonymously: '/visit/anonymous',
        update: '/patient',
        triageAX: '/visit/triage/:visitCode',
    },
    incident: {
        create: '/incident',
        list: '/incident',
        details: '/incident/:id',
    },
    lookups: {
        list: '/enums',
    },
    department: {
        list: '/department',
        details: '/department/:id',
        create: '/department',
        update: '/department/:id',
        delete: '/department/:id',
    },
    person: {
        details: '/person/:ssn'
    }
};
export default Endpoints;
