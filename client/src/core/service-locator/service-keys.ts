enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    EmployeeDataSource = 'EmployeeDataSource',
    AuthDataSources = 'AuthDataSources',
    VisitsDataSource = 'VisitsDataSource',
    LookupsDataSource = 'LookupsDataSource',
    TriageAXDataSource = 'TriageAXDataSource',
    PersonDataSource = 'PersonDataSource',

    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',
    VisitsRepository = 'VisitsRepository',
    LookupsRepository = 'LookupsRepository',
    TriageAXRepository = 'TriageAXRepository',
    PersonRepository = 'PersonRepository',



    //* Use Cases --------------------------------------------------
    GetAllEmployeesUseCase = 'GetAllEmployeesUseCase',
    GetEmployeeByIdUseCase = 'GetEmployeeByIdUseCase',
    CreateEmployeeUseCase = 'CreateEmployeeUseCase',
    UpdateEmployeeUseCase = 'UpdateEmployeeUseCase',
    DeleteEmployeeUseCase = 'DeleteEmployeeUseCase',

    GetLookupsUseCase = 'GetLookupsUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    CreateVisitUseCase = 'CreateVisitUseCase',
    UpdateVisitUseCase = 'UpdateVisitUseCase',
    GetAnonymousVisitsUseCase = 'GetAnonymousVisitsUseCase',
    GetVisitByCodeUseCase = 'GetVisitByCodeUseCase',

    CreateTriageAXUseCase = 'CreateTriageAXUseCase',

    GetPersonUseCase = 'GetPersonUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;