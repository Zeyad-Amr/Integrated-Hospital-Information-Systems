import { Yup } from "@/core/shared/utils/validation";
import { IDepartment, IRole, IShift } from "../data-values/interfaces";
import AuthInterface from "../interfaces/auth-interface";
import PersonInterface from "../interfaces/person-interface";
import UserInterface from "../interfaces/user-interface";
import { DepartmentEnum, RoleEnum, ShiftEnum } from "../data-values/enums";

export default class UserEntity implements UserInterface {
    private _id: string;
    private _role?: IRole;
    private _shift?: IShift;
    private _department?: IDepartment;
    private _createdAt?: Date;
    private _updatedAt?: Date;
    private _person?: PersonInterface;
    private _auth?: AuthInterface;

    constructor(data: UserInterface) {
        this._id = data.id;
        this._role = data.role;
        this._shift = data.shift;
        this._department = data.department;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._person = data.person;
        this._auth = data.auth;
    }

    //* --------------------- Getters ---------------------
    get id(): string {
        return this._id;
    }

    get role(): IRole | undefined {
        return this._role;
    }

    get shift(): IShift | undefined {
        return this._shift;
    }

    get department(): IDepartment | undefined {
        return this._department;
    }

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }


    get person(): PersonInterface | undefined {
        return this._person;
    }

    get auth(): AuthInterface | undefined {
        return this._auth;
    }

    //* --------------------- Setters ---------------------
    set id(id: string) {
        this._id = id;
    }

    set role(role: IRole) {
        this._role = role;
    }

    set shift(shift: IShift) {
        this._shift = shift;
    }

    set department(department: IDepartment) {
        this._department = department;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

    set person(person: PersonInterface) {
        this._person = person;
    }

    set auth(auth: AuthInterface) {
        this._auth = auth;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        return {
            id: '',
            role: undefined,
            shift: undefined,
            department: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            person: undefined,
            auth: undefined,
        };
    }

    static getSchema(): Yup.ObjectSchema<any> {
        return Yup.object().shape({
            role: Yup.string()
                .oneOf(Object.values(RoleEnum).map(String) as string[])
                .required("الوظيفة مطلوب"),
            shift: Yup.string()
                .oneOf(Object.values(ShiftEnum).map(String) as string[])
                .required("موعد العمل مطلوب"),
            department: Yup.string()
                .oneOf(Object.values(DepartmentEnum).map(String) as string[])
                .required("القسم مطلوب"),


        }).defined();
    }


}
