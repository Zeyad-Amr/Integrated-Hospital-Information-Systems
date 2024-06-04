import UserModel from "@/modules/auth/data/models/user-model";
import EmployeeInterface from "../../domain/interfaces/employee-interface";
import PersonModel from "@/core/shared/modules/person/data/models/person-model";
import AuthDataModel from "@/modules/auth/data/models/auth-data-model";

export default class EmployeeModel {
  //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: EmployeeInterface): any {
    const baseJson = UserModel.toJson(entity); // Convert the base model to JSON
    return {
      ...baseJson,
    };
  }

  static toJsonUpdateEmployee(entity: EmployeeInterface): any {
    return {
      roleId: entity.roleId,
      shiftId: entity.shiftId,
      subDepartmentIds: entity.subDepartmentIds,
      personalData: entity.person ? PersonModel.toJson(entity.person) : null,
      auth: entity.auth ? AuthDataModel.toJson(entity.auth) : null,
    };
  }

  //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): EmployeeInterface {
    const baseModel = UserModel.fromJson(json); // Create a UserModel from JSON data

    const {
      /* other employee-specific data */
    } = json;
    return {
      id: baseModel.id,
      roleId: baseModel.roleId,
      shiftId: baseModel.shiftId,
      subDepartmentIds: baseModel.subDepartmentIds,
      createdAt: baseModel.createdAt,
      updatedAt: baseModel.updatedAt,
      person: baseModel.person,
      auth: baseModel.auth,
    };
  }
}
