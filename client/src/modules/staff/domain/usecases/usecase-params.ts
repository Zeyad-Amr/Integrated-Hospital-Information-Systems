import StaffEntity from "../entities/staff-entity";

class GetStaffMemberByIdUseCaseParameters {
    constructor(public id: string) { }
}

class CreateStaffMemberUseCaseParameters {
    constructor(public staff: StaffEntity) { }
}

class UpdateStaffMemberUseCaseParameters {
    constructor(public staff: StaffEntity) { }
}

class DeleteStaffMemberUseCaseParameters {
    constructor(public id: string) { }
}


export {
    GetStaffMemberByIdUseCaseParameters,
    CreateStaffMemberUseCaseParameters,
    UpdateStaffMemberUseCaseParameters,
    DeleteStaffMemberUseCaseParameters
};
