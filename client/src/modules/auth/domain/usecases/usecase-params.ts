import StaffEntity from "../entities/login-user-entity";

class GetStaffDetailsUseCaseParameters {
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
    GetStaffDetailsUseCaseParameters,
    CreateStaffMemberUseCaseParameters,
    UpdateStaffMemberUseCaseParameters,
    DeleteStaffMemberUseCaseParameters
};
