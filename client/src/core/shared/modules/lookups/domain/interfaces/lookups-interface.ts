import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";

export interface LookupsInterface {
    identityTypes: IdentityTypeInterface[];
    genderTypes: GenderTypeInterface[];
    kinshipTypes: KinshipTypeInterface[];
    roleTypes: RoleTypeInterface[];
    shiftTypes: ShiftTypeInterface[];
    cameFromOptions: CameFromOptionsInterface[];
    attendantRoles: AttendantRoleInterface[];
    triageTypes: TriageTypeInterface[];
    LOC: LOCInterface[];
    comorbidities: ComorbiditiesInterface[];
    governates: GovernateInterface[];
    departments: DepartmentInterface[];
    features: FeatureInterface[];
}

export interface IdentityTypeInterface {
    id: string;
    value: string;
}

export interface GenderTypeInterface {
    id: string;
    value: string;
}

export interface KinshipTypeInterface {
    id: string;
    value: string;
}

export interface RoleTypeInterface {
    id: string;
    value: string;
}

export interface ShiftTypeInterface {
    id: string;
    value: string;
}

export interface CameFromOptionsInterface {
    id: string;
    value: string;
}

export interface AttendantRoleInterface {
    id: string;
    value: string;
}

export interface TriageTypeInterface {
    id: string;
    value: string;
}

export interface LOCInterface {
    id: string;
    value: string;
}

export interface ComorbiditiesInterface {
    id: string;
    value: string;
}

export interface GovernateInterface {
    id: string;
    value: string;
}

export interface DepartmentInterface {
    id: string;
    value: string;
}

export interface FeatureInterface {
    id: string;
    value: string;
    subDepartment: SubDepartmentInterface;
}