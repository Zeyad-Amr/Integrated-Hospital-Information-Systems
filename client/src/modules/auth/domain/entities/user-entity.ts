import PersonEntity from './person-entity';

export default class UserEntity {
    private _id: string;
    private _role: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _createdById: string | null;
    private _person: PersonEntity;

    constructor(data: {
        id: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string | null;
        person: {
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
        this._id = data.id;
        this._role = data.role;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._createdById = data.createdById;
        this._person = new PersonEntity(data.person);
    }

    //* --------------------- Getters ---------------------
    get id(): string {
        return this._id;
    }

    get role(): string {
        return this._role;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get createdById(): string | null {
        return this._createdById;
    }

    get person(): PersonEntity {
        return this._person;
    }

    //* --------------------- Setters ---------------------
    set id(id: string) {
        this._id = id;
    }

    set role(role: string) {
        this._role = role;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }


    set createdById(createdById: string | null) {
        this._createdById = createdById;
    }

    set person(person: PersonEntity) {
        this._person = person;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): UserEntity {
        const defaultDate = new Date();
        const defaultPerson = PersonEntity.defaultValue(); // Getting default PersonEntity
        return new UserEntity({
            id: '',
            role: '',
            createdAt: defaultDate,
            updatedAt: defaultDate,
            createdById: null,
            person: defaultPerson,
        });
    }
}
