import PersonEntity from "@/modules/auth/domain/entities/person-entity";
// import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";

export default class VisitEntity {
    private _code: string;
    private _sequenceNumber: number | null;
    private _kinship: string | null;
    private _createdAt: Date;
    private _updatedAt: Date;
    // private _creator: EmployeeEntity;
    private _patient: PersonEntity;
    private _companion: PersonEntity;

    constructor(data: {
        code: string;
        sequenceNumber: number | null;
        kinship: string | null;
        createdAt: Date;
        updatedAt: Date;
        // creator: {
        //     id: string;
        //     role: string;
        //     createdAt: Date;
        //     updatedAt: Date;
        //     createdById: string | null;
        //     person: {
        //         id: string;
        //         firstName: string;
        //         secondName: string;
        //         thirdName: string;
        //         fourthName: string;
        //         SSN: string;
        //         verificationMethod: string;
        //         gender: string;
        //         birthDate: Date;
        //         phone: string;
        //         email: string;
        //         governate: string;
        //         address: string;
        //         createdAt: Date;
        //         updatedAt: Date;
        //     };
        // };
        patient: {
            id: string;
            firstName: string;
            secondName: string;
            thirdName: string;
            fourthName: string;
            SSN: string;
            verificationMethod: string;
            gender: string;
            birthDate: Date;
            phone: string;
            email: string;
            governate: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        };
        companion: {
            id: string;
            firstName: string;
            secondName: string;
            thirdName: string;
            fourthName: string;
            SSN: string;
            verificationMethod: string;
            gender: string;
            birthDate: Date;
            phone: string;
            email: string;
            governate: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }) {
        this._code = data.code;
        this._sequenceNumber = data.sequenceNumber;
        this._kinship = data.kinship;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        // this._creator = new EmployeeEntity(data.creator);
        this._patient = new PersonEntity(data.patient);
        this._companion = new PersonEntity(data.companion);
    }

    //* --------------------- Getters ---------------------
    get code(): string {
        return this._code;
    }

    get sequenceNumber(): number | null {
        return this._sequenceNumber;
    }

    get kinship(): string | null {
        return this._kinship;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    // get creator(): EmployeeEntity {
    //     return this._creator;
    // }

    get patient(): PersonEntity {
        return this._patient;
    }

    get companion(): PersonEntity {
        return this._companion;
    }

    //* --------------------- Setters ---------------------

    set code(code: string) {
        this._code = code;
    }

    set sequenceNumber(sequenceNumber: number | null) {
        this._sequenceNumber = sequenceNumber;
    }

    set kinship(kinship: string | null) {
        this._kinship = kinship;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

    // set creator(creator: EmployeeEntity) {
    //     this._creator = creator;
    // }

    set patient(patient: PersonEntity) {
        this._patient = patient;
    }

    set companion(companion: PersonEntity) {
        this._companion = companion;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): VisitEntity {
        const defaultDate = new Date();
        const defaultPerson = PersonEntity.defaultValue(); // Getting default PersonEntity
        // const defaultEmployee = EmployeeEntity.defaultValue(); // Getting default PersonEntity

        return new VisitEntity({
            code: "",
            sequenceNumber: null,
            kinship: null,
            createdAt: defaultDate,
            updatedAt: defaultDate,
            // creator: defaultEmployee,
            patient: defaultPerson,
            companion: defaultPerson,

        });
    }

}


