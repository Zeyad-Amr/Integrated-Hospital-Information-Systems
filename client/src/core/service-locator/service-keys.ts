enum ServiceKeys {

    //* Data Sources ----------------------------------------------
    EmployeeDataSource = 'EmployeeDataSource',
    AuthDataSources = 'AuthDataSources',


    //* Repositories ----------------------------------------------
    EmployeeRepository = 'EmployeeRepository',
    AuthRepository = 'AuthRepository',


    //* Use Cases --------------------------------------------------
    GetAllEmployeesUseCase = 'GetAllEmployeesUseCase',
    GetEmployeeByIdUseCase = 'GetEmployeeByIdUseCase',
    CreateEmployeeUseCase = 'CreateEmployeeUseCase',
    UpdateEmployeeUseCase = 'UpdateEmployeeUseCase',
    DeleteEmployeeUseCase = 'DeleteEmployeeUseCase',

    LoginUseCase = 'LoginUseCase',
    GetMeUseCase = 'GetMeUseCase',

    //* Exnternal Services --------------------------------------------------
    ApiClient = 'ApiClient',

}

export default ServiceKeys;