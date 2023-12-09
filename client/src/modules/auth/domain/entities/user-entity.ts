import AuthInterface from "../interfaces/auth-interface";
import PersonInterface from "../interfaces/person-interface";
import UserInterface from "../interfaces/user-interface";
import AuthDataEntity from "./auth-data-entity";
import PersonEntity from "./person-entity";

export default class UserEntity implements UserInterface {
    private _id: string;
    private _role: string;
    private _shift: string;
    private _department: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;
    private _createdById?: string;
    private _person: PersonInterface;
    private _auth: AuthInterface;

    constructor(data: UserInterface) {
        this._id = data.id;
        this._role = data.role;
        this._shift = data.shift;
        this._department = data.department;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._createdById = data.createdById;
        this._person = data.person;
        this._auth = data.auth;
    }


    //* --------------------- Getters ---------------------
    get id(): string {
        return this._id;
    }

    get role(): string {
        return this._role;
    }

    get shift(): string {
        return this._shift;
    }

    get department(): string {
        return this._department;
    }

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    get createdById(): string | undefined {
        return this._createdById;
    }

    get person(): PersonInterface {
        return this._person;
    }

    get auth(): AuthInterface {
        return this._auth;
    }

    //* --------------------- Setters ---------------------
    set id(id: string) {
        this._id = id;
    }

    set role(role: string) {
        this._role = role;
    }

    set shift(shift: string) {
        this._shift = shift;
    }

    set department(department: string) {
        this._department = department;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }


    set createdById(createdById: string | undefined) {
        this._createdById = createdById;
    }

    set person(person: PersonInterface) {
        this._person = person;
    }

    set auth(auth: AuthInterface) {
        this._auth = auth;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        const defaultDate = new Date();
        const defaultPerson = PersonEntity.defaultValue(); // Getting default PersonEntity
        const defaultAuth = AuthDataEntity.defaultValue(); // Getting default AuthInterface
        return {
            id: '',
            role: '',
            shift: '',
            department: '',
            createdAt: defaultDate,
            updatedAt: defaultDate,
            createdById: undefined,
            person: defaultPerson,
            auth: defaultAuth,
        };
    }
}
