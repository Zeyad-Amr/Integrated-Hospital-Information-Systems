export interface LookupsInterface {
    identityTypes: IdentityType[];
    genderTypes: GenderType[];
    kinshipTypes: KinshipType[];
    roleTypes: RoleType[];
    shiftTypes: ShiftType[];
    cameFromOptions: CameFromOptions[];
    attendantRoles: AttendantRole[];
    triageTypes: TriageType[];
    LOC: LOC[];
    comorbidities: Comorbidities[];
    governates: Governate[];
    departments: Department[];
}

export interface IdentityType {
    id: number;
    value: string;
}

export interface GenderType {
    id: number;
    value: string;
}

export interface KinshipType {
    id: number;
    value: string;
}

export interface RoleType {
    id: number;
    value: string;
}

export interface ShiftType {
    id: number;
    value: string;
}

export interface CameFromOptions {
    id: number;
    value: string;
}

export interface AttendantRole {
    id: number;
    value: string;
}

export interface TriageType {
    id: number;
    value: string;
}

export interface LOC {
    id: number;
    value: string;
}

export interface Comorbidities {
    id: number;
    value: string;
}

export interface Governate {
    id: number;
    value: string;
}

export interface Department {
    id: number;
    value: string;
}