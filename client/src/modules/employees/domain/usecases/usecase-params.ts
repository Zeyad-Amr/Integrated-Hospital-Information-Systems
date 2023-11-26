import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import EmployeeEntity from "../entities/employee-entity";

class GetEmployeeByIdUseCaseParameters {
    constructor(public id: string) { }
}

class CreateEmployeeUseCaseParameters {
    constructor(public employee: EmployeeEntity, public authData: AuthDataEntity) { }
}

class UpdateEmployeeUseCaseParameters {
    constructor(public employee: EmployeeEntity, public authData: AuthDataEntity) { }
}

class DeleteEmployeeUseCaseParameters {
    constructor(public id: string) { }
}


export {
    GetEmployeeByIdUseCaseParameters,
    CreateEmployeeUseCaseParameters,
    UpdateEmployeeUseCaseParameters,
    DeleteEmployeeUseCaseParameters
};
