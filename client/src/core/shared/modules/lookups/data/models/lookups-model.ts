import { LookupsInterface } from '../../domain/interfaces/lookups-interface';
import SubDepartmentsModel from '@/modules/management/data/models/sub-departments';

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
            features: (json.features || []).map((feature: any) => {
                return {
                    id: feature.id,
                    value: feature.name,
                    code: feature.code,
                    subDepartment: SubDepartmentsModel.fromJson(feature.subDepartment),
                };
            }),
        } as LookupsInterface;
    }


}

// id?: string | number;
//   name: string;
//   roomId: string | number;
//   specializationId: string | number;
//   departmentId: string | number;


