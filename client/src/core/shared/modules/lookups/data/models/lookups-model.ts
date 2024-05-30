import { LookupsInterface } from '../../domain/interfaces/lookups-interface';

export default class LookupsModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------


    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): LookupsInterface {

        return {
            identityTypes: json.identityType || [],
            genderTypes: json.genderType || [],
            kinshipTypes: json.kinshipType || [],
            roleTypes: json.roleType || [],
            shiftTypes: json.shiftType || [],
            cameFromOptions: json.cameFromOptions || [],
            attendantRoles: json.attendantRole || [],
            triageTypes: json.triageType || [],
            LOC: json.LOC || [],
            comorbidities: json.comorbidities || [],
            governates: json.governate || [],
            departments: (json.department || []).map((department: any) => {
                return {
                    id: department.id,
                    value: department.name,
                };
            }
            ),

            features: json.features || [
                {
                    "id": 1,
                    "value": "Nerve test",
                },
                {
                    "id": 2,
                    "value": "Cardiology test",
                }
            ],
        };
    }


}


