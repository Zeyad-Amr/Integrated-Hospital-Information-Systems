import { AttendantRole, CameFromOptions, Comorbidities, GenderType, IdentityType, KinshipType, LOC, LookupsInterface, RoleType, ShiftType, TriageType } from "../interfaces/lookups-interface";

export default class LookupsEntity implements LookupsInterface {
    private _identityTypes: IdentityType[];
    private _genderTypes: GenderType[];
    private _kinshipTypes: KinshipType[];
    private _roleTypes: RoleType[];
    private _shiftTypes: ShiftType[];
    private _cameFromOptions: CameFromOptions[];
    private _attendantRoles: AttendantRole[];
    private _triageTypes: TriageType[];
    private _LOC: LOC[];
    private _comorbidities: Comorbidities[];

    constructor(data: LookupsInterface) {
        this._identityTypes = data.identityTypes;
        this._genderTypes = data.genderTypes;
        this._kinshipTypes = data.kinshipTypes;
        this._roleTypes = data.roleTypes;
        this._shiftTypes = data.shiftTypes;
        this._cameFromOptions = data.cameFromOptions;
        this._attendantRoles = data.attendantRoles;
        this._triageTypes = data.triageTypes;
        this._LOC = data.LOC;
        this._comorbidities = data.comorbidities;
    }

    //* --------------------- Getters ---------------------
    get identityTypes(): IdentityType[] {
        return this._identityTypes;
    }

    get genderTypes(): GenderType[] {
        return this._genderTypes;
    }

    get kinshipTypes(): KinshipType[] {
        return this._kinshipTypes;
    }

    get roleTypes(): RoleType[] {
        return this._roleTypes;
    }

    get shiftTypes(): ShiftType[] {
        return this._shiftTypes;
    }

    get cameFromOptions(): CameFromOptions[] {
        return this._cameFromOptions;
    }

    get attendantRoles(): AttendantRole[] {
        return this._attendantRoles;
    }

    get triageTypes(): TriageType[] {
        return this._triageTypes;
    }

    get LOC(): LOC[] {
        return this._LOC;
    }

    get comorbidities(): Comorbidities[] {
        return this._comorbidities;
    }

    //* --------------------- Setters ---------------------
    set identityTypes(types: IdentityType[]) {
        this._identityTypes = types;
    }

    set genderTypes(types: GenderType[]) {
        this._genderTypes = types;
    }

    set kinshipTypes(types: KinshipType[]) {
        this._kinshipTypes = types;
    }

    set roleTypes(types: RoleType[]) {
        this._roleTypes = types;
    }

    set shiftTypes(types: ShiftType[]) {
        this._shiftTypes = types;
    }

    set cameFromOptions(options: CameFromOptions[]) {
        this._cameFromOptions = options;
    }

    set attendantRoles(roles: AttendantRole[]) {
        this._attendantRoles = roles;
    }

    set triageTypes(types: TriageType[]) {
        this._triageTypes = types;
    }

    set LOC(locations: LOC[]) {
        this._LOC = locations;
    }

    set comorbidities(comorbidities: Comorbidities[]) {
        this._comorbidities = comorbidities;
    }

    //* --------------------- Methods ---------------------

    static defaultValue(): LookupsInterface {
        return {
            identityTypes: [],
            genderTypes: [],
            kinshipTypes: [],
            roleTypes: [],
            shiftTypes: [],
            cameFromOptions: [],
            attendantRoles: [],
            triageTypes: [],
            LOC: [],
            comorbidities: [],
        };
    }
}
