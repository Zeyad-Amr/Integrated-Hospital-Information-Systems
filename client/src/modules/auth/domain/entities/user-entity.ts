import PersonInterface from "../interfaces/person-interface";
import UserInterface from "../interfaces/user-interface";
import PersonEntity from "./person-entity";

export default class UserEntity {
    private _id: string;
    private _role: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;
    private _createdById?: string;
    private _person: PersonInterface;

    constructor(data: UserInterface) {
        this._id = data.id;
        this._role = data.role;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._createdById = data.createdById;
        this._person = data.person;
    }

    //* --------------------- Getters ---------------------
    get id(): string {
        return this._id;
    }

    get role(): string {
        return this._role;
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


    set createdById(createdById: string | undefined) {
        this._createdById = createdById;
    }

    set person(person: PersonInterface) {
        this._person = person;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        const defaultDate = new Date();
        const defaultPerson = PersonEntity.defaultValue(); // Getting default PersonEntity
        return {
            id: '',
            role: '',
            createdAt: defaultDate,
            updatedAt: defaultDate,
            createdById: undefined,
            person: defaultPerson,
        };
    }
}
