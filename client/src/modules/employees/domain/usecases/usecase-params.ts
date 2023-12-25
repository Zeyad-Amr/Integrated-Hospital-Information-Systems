import EmployeeInterface from "../interfaces/employee-interface";

class GetEmployeeByIdUseCaseParameters {
    constructor(public id: string) { }
}

class CreateEmployeeUseCaseParameters {
    constructor(public employee: EmployeeInterface) { }
}

class UpdateEmployeeUseCaseParameters {
    constructor(public employee: EmployeeInterface) { }
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
