enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    EmployeeDataSource = 'EmployeeDataSource',
    AuthDataSources = 'AuthDataSources',
    VisitsDataSource = 'VisitsDataSource',


    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',
    VisitsRepository = 'VisitsRepository',


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

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;