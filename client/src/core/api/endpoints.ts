const Endpoints = {
    base: 'https://qasr-server-lqj1.onrender.com/api',
    devBase: 'http://localhost:4000/api',

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
        create: '/visit',
        createAnonymously: '/visit/anonymous',
        update: '/patient',
        triageAX: '/visit/triage/:visitCode',
        streaming: '/streaming/event',
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
    },
    room: {
        list: '/room',
        details: '/room/:id',
        create: '/room',
        update: '/room/:id',
        delete: '/room/:id',
    },
    specialization: {
        list: '/specialization',
        details: '/specialization/:id',
        create: '/specialization',
        update: '/specialization/:id',
        delete: '/specialization/:id',
    },
    subdepartment: {
        list: '/subdepartment',
        details: '/subdepartment/:id',
        create: '/subdepartment',
        update: '/subdepartment/:id',
        updateAssignFeatures: '/subdepartment/:id/assignfeatures',
        delete: '/subdepartment/:id',
    },
    feature: {
        list: '/feature',
        details: '/feature/:id',
        create: '/feature',
        update: '/feature/:id',
        delete: '/feature/:id',
    },
    permission: {
        list: '/permission',
        details: '/permission/:id',
        create: '/permission',
        update: '/permission/:id',
        delete: '/permission/:id',
    },
    role: {
        list: '/role',
        details: '/role/:id',
        create: '/role',
        update: '/role/:id',
        delete: '/role/:id',
    },
    allergy: {
        list: '/allergy',
        details: '/allergy/:id',
        create: '/allergy',
        update: '/allergy/:id',
        delete: '/allergy/:id',
    },
    surgery: {
        list: '/surgery',
        details: '/surgery/:id',
        create: '/surgery',
        update: '/surgery/:id',
        delete: '/surgery/:id',
    },
    medicalProblem: {
        list: '/medicalProblem',
        details: '/medicalProblem/:id',
        create: '/medicalProblem',
        update: '/medicalProblem/:id',
        delete: '/medicalProblem/:id',
    },
    medication: {
        list: '/medication',
        details: '/medication/:id',
        create: '/medication',
        update: '/medication/:id',
        delete: '/medication/:id',
    },
    prescription: {
        list: '/prescription',
        details: '/prescription/:id',
        create: '/prescription',
        update: '/prescription/:id',
        delete: '/prescription/:id',
    },
    diagnosis: {
        list: '/diagnosis',
        details: '/diagnosis/:id',
        create: '/diagnosis',
        update: '/diagnosis/:id',
        delete: '/diagnosis/:id',
    }
};
export default Endpoints;
