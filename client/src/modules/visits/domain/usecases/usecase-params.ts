import VisitEntity from "../entities/visit-entity";

class NoParams { }

class CreateVisitUseCaseParameters {
    constructor(public visit: VisitEntity) { }
}

class UpdateVisitUseCaseParameters {
    constructor(public visit: VisitEntity) { }
}

class GetVisitByCodeUseCaseParameters {
    constructor(public visitcode: string) { }
}


export {
    CreateVisitUseCaseParameters,
    UpdateVisitUseCaseParameters,
    GetVisitByCodeUseCaseParameters,
    NoParams
};
