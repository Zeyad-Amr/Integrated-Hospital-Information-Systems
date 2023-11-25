enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    StaffDataSource = 'StaffDataSource',
    AuthDataSources = 'AuthDataSources',


    //* Repositories ----------------------------------------------
    StaffRepository = 'StaffRepository',
    AuthRepository = 'AuthRepository',


    //* Use Cases --------------------------------------------------
    GetAllStaffMembersUseCase = 'GetAllStaffMembersUseCase',
    GetStaffDetailsUseCase = 'GetStaffDetailsUseCase',
    CreateStaffMemberUseCase = 'CreateStaffMemberUseCase',
    UpdateStaffMemberUseCase = 'UpdateStaffMemberUseCase',
    DeleteStaffMemberUseCase = 'DeleteStaffMemberUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;