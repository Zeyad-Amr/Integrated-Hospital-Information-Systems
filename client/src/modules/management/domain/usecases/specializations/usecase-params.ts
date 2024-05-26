import SpecializationInterface from "../../interfaces/specialization -interface";

class GetSpecializationByIdUseCaseParameters {
    constructor(public id: string) { }
}

class CreateSpecializationUseCaseParameters {
    constructor(public specialization: SpecializationInterface) { }
}

class UpdateSpecializationUseCaseParameters {
    constructor(public specialization: SpecializationInterface) { }
}

class DeleteSpecializationUseCaseParameters {
    constructor(public id: string) { }
}


export {
    GetSpecializationByIdUseCaseParameters,
    CreateSpecializationUseCaseParameters,
    UpdateSpecializationUseCaseParameters,
    DeleteSpecializationUseCaseParameters
};
