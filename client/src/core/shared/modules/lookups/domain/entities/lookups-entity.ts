import { LookupsInterface } from "../interfaces/lookups-interface";

export default class LookupsEntity {

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
            governates: [],
            departments: [],
        };
    }
}
