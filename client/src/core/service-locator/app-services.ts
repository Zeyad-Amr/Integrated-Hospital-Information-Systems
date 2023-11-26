import sl from "./service-locator";
import ServiceKeys from "./service-keys";
//---------------------------------------------------------
import { EmployeeDataSource, BaseEmployeeDataSource } from "@/modules/employees/data/datasources/employee-datasource";
import { ApiClient } from "@/core/api/index";
import BaseEmployeeRepository from "@/modules/employees/domain/repositories/base-employee-repository";
import EmployeeRepository from "@/modules/employees/data/repositories/employee-repository";
import {
    GetEmployeeByIdUseCase,
    GetAllEmployeesUseCase,
    CreateEmployeeUseCase,
    DeleteEmployeeUseCase,
    UpdateEmployeeUseCase,
} from "@/modules/employees/domain/usecases/index";
import { AuthDataSource, BaseAuthDataSource } from "@/modules/auth/data/datasources/auth-datasource";
import BaseAuthRepository from "@/modules/auth/domain/repositories/base-auth-repository";
import AuthRepository from "@/modules/auth/data/repositories/auth-repository";
import { LoginUseCase } from "@/modules/auth/domain/usecases";
import GetMeUseCase from "@/modules/auth/domain/usecases/get-me-usecase";

class AppServicesLocator {
    static init() {

        //* Data Sources ----------------------------------------------
        sl.registerFactory<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource, () => new EmployeeDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseAuthDataSource>(ServiceKeys.AuthDataSources, () => new AuthDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));


        //* Repositories ----------------------------------------------
        sl.registerFactory<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository, () => new EmployeeRepository(
            sl.get<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource)
        ));
        sl.registerFactory<BaseAuthRepository>(ServiceKeys.AuthRepository, () => new AuthRepository(
            sl.get<BaseAuthDataSource>(ServiceKeys.AuthDataSources)
        ));


        //* Use Cases --------------------------------------------------
        sl.registerFactory<GetAllEmployeesUseCase>(ServiceKeys.GetAllEmployeesUseCase, () => new GetAllEmployeesUseCase(
            sl.get<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository)
        ));
        sl.registerFactory<GetEmployeeByIdUseCase>(ServiceKeys.GetEmployeeByIdUseCase, () => new GetEmployeeByIdUseCase(
            sl.get<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository)
        ));
        sl.registerFactory<CreateEmployeeUseCase>(ServiceKeys.CreateEmployeeUseCase, () => new CreateEmployeeUseCase(
            sl.get<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository)
        ));
        sl.registerFactory<UpdateEmployeeUseCase>(ServiceKeys.UpdateEmployeeUseCase, () => new UpdateEmployeeUseCase(
            sl.get<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository)
        ));
        sl.registerFactory<DeleteEmployeeUseCase>(ServiceKeys.DeleteEmployeeUseCase, () => new DeleteEmployeeUseCase(
            sl.get<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository)
        ));

        sl.registerFactory<LoginUseCase>(ServiceKeys.LoginUseCase, () => new LoginUseCase(
            sl.get<BaseAuthRepository>(ServiceKeys.AuthRepository)
        ));
        sl.registerFactory<GetMeUseCase>(ServiceKeys.GetMeUseCase, () => new GetMeUseCase(
            sl.get<BaseAuthRepository>(ServiceKeys.AuthRepository)
        ));




        //* Exnternal Services --------------------------------------------------
        sl.registerFactory<ApiClient>(ServiceKeys.ApiClient, () => new ApiClient());
    }

}

export default AppServicesLocator;