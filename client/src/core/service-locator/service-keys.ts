enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    StaffDataSource = 'StaffDataSource',


    //* Repositories ----------------------------------------------
    StaffRepository = 'StaffRepository',


    //* Use Cases --------------------------------------------------
    GetAllStaffMembersUseCase = 'GetAllStaffMembersUseCase',
    GetStaffDetailsUseCase = 'GetStaffDetailsUseCase',
    CreateStaffMemberUseCase = 'CreateStaffMemberUseCase',
    UpdateStaffMemberUseCase = 'UpdateStaffMemberUseCase',
    DeleteStaffMemberUseCase = 'DeleteStaffMemberUseCase',


    //* Thunks --------------------------------------------------
    StaffThunks = 'StaffThunks',


    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;