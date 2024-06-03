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
    id: number;
    value: string;
}

export interface GenderTypeInterface {
    id: number;
    value: string;
}

export interface KinshipTypeInterface {
    id: number;
    value: string;
}

export interface RoleTypeInterface {
    id: number;
    value: string;
}

export interface ShiftTypeInterface {
    id: number;
    value: string;
}

export interface CameFromOptionsInterface {
    id: number;
    value: string;
}

export interface AttendantRoleInterface {
    id: number;
    value: string;
}

export interface TriageTypeInterface {
    id: number;
    value: string;
}

export interface LOCInterface {
    id: number;
    value: string;
}

export interface ComorbiditiesInterface {
    id: number;
    value: string;
}

export interface GovernateInterface {
    id: number;
    value: string;
}

export interface DepartmentInterface {
    id: number;
    value: string;
}

export interface FeatureInterface {
    id: number;
    value: string;
    subDepartmentId: number;
}