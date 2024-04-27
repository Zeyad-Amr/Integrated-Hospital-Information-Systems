enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    EmployeeDataSource = 'EmployeeDataSource',
    AuthDataSources = 'AuthDataSources',
    VisitDataSource = 'VisitDataSource',
    IncidentDataSource = 'IncidentDataSource',
    LookupsDataSource = 'LookupsDataSource',
    TriageAXDataSource = 'TriageAXDataSource',
    PersonDataSource = 'PersonDataSource',
    RoomDataSource = 'RoomDataSource',
    SpecializationDataSource = 'SpecializationDataSource',
    DepartmentsDataSource = 'DepartmentsDataSource',
    SubDepartmentsDataSource = 'SubDepartmentsDataSource',
    FeaturesDataSource = 'FeaturesDataSource',
    PermissionsDataSource = 'PermissionsDataSource',

    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',
    VisitRepository = 'VisitRepository',
    IncidentRepository = 'IncidentRepository',
    LookupsRepository = 'LookupsRepository',
    TriageAXRepository = 'TriageAXRepository',
    PersonRepository = 'PersonRepository',
    RoomRepository = 'RoomRepository',
    SpecializationRepository = 'SpecializationRepository',
    DepartmentsRepository = 'DepartmentsRepository',
    SubDepartmentsRepository = 'SubDepartmentsRepository',
    FeaturesRepository = 'FeaturesRepository',
    PermissionsRepository = 'PermissionsRepository',



    //* Use Cases --------------------------------------------------
    GetAllEmployeesUseCase = 'GetAllEmployeesUseCase',
    GetEmployeeByIdUseCase = 'GetEmployeeByIdUseCase',
    CreateEmployeeUseCase = 'CreateEmployeeUseCase',
    UpdateEmployeeUseCase = 'UpdateEmployeeUseCase',
    DeleteEmployeeUseCase = 'DeleteEmployeeUseCase',

    GetAllRoomsUseCase = 'GetAllRoomsUseCase',
    GetRoomByIdUseCase = 'GetRoomByIdUseCase',
    CreateRoomUseCase = 'CreateRoomUseCase',
    UpdateRoomUseCase = 'UpdateRoomUseCase',
    DeleteRoomUseCase = 'DeleteRoomUseCase',

    GetAllFeaturesUseCase = 'GetAllFeaturesUseCase',
    GetFeatureByIdUseCase = 'GetFeatureByIdUseCase',
    CreateFeatureUseCase = 'CreateFeatureUseCase',
    UpdateFeatureUseCase = 'UpdateFeatureUseCase',
    DeleteFeatureUseCase = 'DeleteFeatureUseCase',

    GetAllPermissionsUseCase = 'GetAllPermissionsUseCase',
    GetPermissionByIdUseCase = 'GetPermissionByIdUseCase',
    CreatePermissionUseCase = 'CreatePermissionUseCase',
    UpdatePermissionUseCase = 'UpdatePermissionUseCase',
    DeletePermissionUseCase = 'DeletePermissionUseCase',

    GetAllSpecializationsUseCase = 'GetAllSpecializationsUseCase',
    GetSpecializationByIdUseCase = 'GetSpecializationByIdUseCase',
    CreateSpecializationUseCase = 'CreateSpecializationUseCase',
    UpdateSpecializationUseCase = 'UpdateSpecializationUseCase',
    DeleteSpecializationUseCase = 'DeleteSpecializationUseCase',

    GetAllSubDepartmentsUseCase = 'GetAllSubDepartmentsUseCase',
    GetSubDepartmentByIdUseCase = 'GetSubDepartmentByIdUseCase',
    CreateSubDepartmentUseCase = 'CreateSubDepartmentUseCase',
    UpdateSubDepartmentUseCase = 'UpdateSubDepartmentUseCase',
    DeleteSubDepartmentUseCase = 'DeleteSubDepartmentUseCase',

    GetLookupsUseCase = 'GetLookupsUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    CreateVisitUseCase = 'CreateVisitUseCase',
    UpdateVisitUseCase = 'UpdateVisitUseCase',
    GetAnonymousVisitUseCase = 'GetAnonymousVisitUseCase',
    GetVisitByCodeUseCase = 'GetVisitByCodeUseCase',

    CreateTriageAXUseCase = 'CreateTriageAXUseCase',

    CreateIncidentUseCase = 'CreateIncidentUseCase',

    GetAllDepartmentsUseCase = 'GetAllDepartmentsUseCase',

    GetPersonUseCase = 'GetPersonUseCase',

    GetOcrDataUseCase = 'GetOcrDataUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;