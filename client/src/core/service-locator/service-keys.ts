enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    EmployeeDataSource = 'EmployeeDataSource',
    AuthDataSources = 'AuthDataSources',
    VisitsDataSource = 'VisitsDataSource',
    TriageAXDataSource = 'TriageAXDataSource',


    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',
    VisitsRepository = 'VisitsRepository',
    TriageAXRepository = 'TriageAXRepository',


    //* Use Cases --------------------------------------------------
    GetAllEmployeesUseCase = 'GetAllEmployeesUseCase',
    GetEmployeeByIdUseCase = 'GetEmployeeByIdUseCase',
    CreateEmployeeUseCase = 'CreateEmployeeUseCase',
    UpdateEmployeeUseCase = 'UpdateEmployeeUseCase',
    DeleteEmployeeUseCase = 'DeleteEmployeeUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    CreateVisitUseCase = 'CreateVisitUseCase',
    UpdateVisitUseCase = 'UpdateVisitUseCase',
    GetAnonymousVisitsUseCase = 'GetAnonymousVisitsUseCase',
    GetVisitByCodeUseCase = 'GetVisitByCodeUseCase',

    CreateTriageAXUseCase = 'CreateTriageAxUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;