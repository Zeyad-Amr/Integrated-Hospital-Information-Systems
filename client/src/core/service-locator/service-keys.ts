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

    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',
    VisitRepository = 'VisitRepository',
    IncidentRepository = 'IncidentRepository',
    LookupsRepository = 'LookupsRepository',
    TriageAXRepository = 'TriageAXRepository',
    PersonRepository = 'PersonRepository',
    RoomRepository = 'RoomRepository',



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

    GetLookupsUseCase = 'GetLookupsUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    CreateVisitUseCase = 'CreateVisitUseCase',
    UpdateVisitUseCase = 'UpdateVisitUseCase',
    GetAnonymousVisitUseCase = 'GetAnonymousVisitUseCase',
    GetVisitByCodeUseCase = 'GetVisitByCodeUseCase',

    CreateTriageAXUseCase = 'CreateTriageAXUseCase',

    CreateIncidentUseCase = 'CreateIncidentUseCase',

    GetPersonUseCase = 'GetPersonUseCase',

    GetOcrDataUseCase = 'GetOcrDataUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;