import {
    IdentityEnum,
    GenderEnum,
    RoleEnum,
    ShiftEnum,
} from './enums';


export interface IIdentity {
    key: IdentityEnum;
    label: string;
}

export interface IGender {
    key: GenderEnum;
    label: string;
}

export interface IRole {
    key: RoleEnum;
    label: string;
}

export interface IShift {
    key: ShiftEnum;
    label: string;
}
