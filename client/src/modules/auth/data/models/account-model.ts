import { AccountInterface } from '../../domain/interfaces/account-interface';
import UserModel from './user-model';

export default class AccountModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AccountInterface {
        return {
            user: UserModel.fromJson(json),
            permissions: [
                {
                    subDepartment: {
                        id: 1,
                        name: "Registration",
                        roomId: 1,
                        specializationId: 1,
                        departmentId: 1,

                    },
                    permissions: [
                        {
                            id: 1,
                            value: "feature",
                            subDepartmentId: 1,
                        },
                    ],
                },
                {
                    subDepartment: {
                        id: 2,
                        name: "Triage",
                        roomId: 2,
                        specializationId: 2,
                        departmentId: 2,
                    },
                    permissions: [
                        {
                            id: 2,
                            value: "feature",
                            subDepartmentId: 2,
                        },
                    ],
                },
                {
                    subDepartment: {
                        id: 3,
                        name: "Examination",
                        roomId: 3,
                        specializationId: 3,
                        departmentId: 3,
                    },
                    permissions: [
                        {
                            id: 3,
                            value: "feature",
                            subDepartmentId: 3,
                        },
                    ],
                }
            ],
        };
    }
}
