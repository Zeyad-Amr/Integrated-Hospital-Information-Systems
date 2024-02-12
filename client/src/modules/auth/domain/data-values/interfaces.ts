import {
    IdentityEnum,
    GenderEnum,
    RoleEnum,
    ShiftEnum,
    GovernateEnum,
    DepartmentEnum,
} from './enums';


export interface IIdentity {
    id: IdentityEnum;
    value: string;
}

export interface IGender {
    id: GenderEnum;
    value: string;
}

export interface IRole {
    id: RoleEnum;
    value: string;
}

export interface IShift {
    id: ShiftEnum;
    value: string;
}

export interface IGovernate {
    id: GovernateEnum;
    value: string;
}

export interface IDepartment {
    id: DepartmentEnum;
    value: string;
}