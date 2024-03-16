import VisitInterface from "../../interfaces/visit-interface";

class NoParams { }

class CreateVisitUseCaseParameters {
    constructor(public visit: VisitInterface) { }
}

class UpdateVisitUseCaseParameters {
    constructor(public visit: VisitInterface) { }
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
