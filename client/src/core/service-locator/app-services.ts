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
import { BaseRegistrationDataSource, RegistrationDataSource } from "@/modules/registration/data/datasources/registration-datasource";
import RegistrationRepository from "@/modules/registration/data/repositories/registration-repository";
import BaseRegistrationRepository from "@/modules/registration/domain/repositories/base-registration-repository";
import { CreateVisitUseCase, GetAnonymousVisitUseCase, GetVisitByCodeUseCase, UpdateVisitUseCase } from "@/modules/registration/domain/usecases";
import { BaseLookupsDataSource, LookupsDataSource } from "../shared/modules/lookups/data/datasources/lookups-datasource";
import BaseLookupsRepository from "../shared/modules/lookups/domain/repositories/base-lookups-repository";
import LookupsRepository from "../shared/modules/lookups/data/repositories/lookups-repository";
import { GetLookupsUseCase } from "../shared/modules/lookups/domain/usecases";
import { BaseTriageAXDataSource, TriageAXDataSource } from "@/modules/er-area/data/datasources/triageAX-datasource";
import BaseTriageAXRepository from "@/modules/er-area/domain/repositories/base-triageAX-repository";
import TriageAXRepository from "@/modules/er-area/data/repositories/triageAX-repository";
import CreateTriageAXUseCase from "@/modules/er-area/domain/usecases/create-triageAX-usecase";
import { BasePersonDataSource, PersonDataSource } from "../shared/modules/person/data/datasources/person-datasource";
import BasePersonRepository from "../shared/modules/person/domain/repositories/base-person-repository";
import PersonRepository from "../shared/modules/person/data/repositories/person-repository";
import { GetPersonUseCase } from "../shared/modules/person/domain/usecases";


class AppServicesLocator {
    static init() {

        //* Data Sources ----------------------------------------------
        sl.registerFactory<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource, () => new EmployeeDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseAuthDataSource>(ServiceKeys.AuthDataSources, () => new AuthDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseRegistrationDataSource>(ServiceKeys.RegistrationDataSource, () => new RegistrationDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseLookupsDataSource>(ServiceKeys.LookupsDataSource, () => new LookupsDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseTriageAXDataSource>(ServiceKeys.TriageAXDataSource, () => new TriageAXDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BasePersonDataSource>(ServiceKeys.PersonDataSource, () => new PersonDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));


        //* Repositories ----------------------------------------------
        sl.registerFactory<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository, () => new EmployeeRepository(
            sl.get<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource)
        ));
        sl.registerFactory<BaseAuthRepository>(ServiceKeys.AuthRepository, () => new AuthRepository(
            sl.get<BaseAuthDataSource>(ServiceKeys.AuthDataSources)
        ));
        sl.registerFactory<BaseRegistrationRepository>(ServiceKeys.RegistrationRepository, () => new RegistrationRepository(
            sl.get<BaseRegistrationDataSource>(ServiceKeys.RegistrationDataSource)
        ));
        sl.registerFactory<BaseLookupsRepository>(ServiceKeys.LookupsRepository, () => new LookupsRepository(
            sl.get<BaseLookupsDataSource>(ServiceKeys.LookupsDataSource)));
        sl.registerFactory<BaseTriageAXRepository>(ServiceKeys.TriageAXRepository, () => new TriageAXRepository(
            sl.get<BaseTriageAXRepository>(ServiceKeys.TriageAXDataSource)
        ));
        sl.registerFactory<BasePersonRepository>(ServiceKeys.PersonRepository, () => new PersonRepository(
            sl.get<BasePersonDataSource>(ServiceKeys.PersonDataSource)
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

        sl.registerFactory<CreateVisitUseCase>(ServiceKeys.CreateVisitUseCase, () => new CreateVisitUseCase(
            sl.get<BaseRegistrationRepository>(ServiceKeys.RegistrationRepository)
        ));
        sl.registerFactory<UpdateVisitUseCase>(ServiceKeys.UpdateVisitUseCase, () => new UpdateVisitUseCase(
            sl.get<BaseRegistrationRepository>(ServiceKeys.RegistrationRepository)
        ));
        sl.registerFactory<GetVisitByCodeUseCase>(ServiceKeys.GetVisitByCodeUseCase, () => new GetVisitByCodeUseCase(
            sl.get<BaseRegistrationRepository>(ServiceKeys.RegistrationRepository)
        ));
        sl.registerFactory<GetAnonymousVisitUseCase>(ServiceKeys.GetAnonymousVisitUseCase, () => new GetAnonymousVisitUseCase(
            sl.get<BaseRegistrationRepository>(ServiceKeys.RegistrationRepository)
        ));
        sl.registerFactory<GetLookupsUseCase>(ServiceKeys.GetLookupsUseCase, () => new GetLookupsUseCase(
            sl.get<BaseLookupsRepository>(ServiceKeys.LookupsRepository)
        ));

        sl.registerFactory<CreateTriageAXUseCase>(ServiceKeys.CreateTriageAXUseCase, () => new CreateTriageAXUseCase(
            sl.get<BaseTriageAXRepository>(ServiceKeys.TriageAXRepository)
        ));

        sl.registerFactory<GetPersonUseCase>(ServiceKeys.GetPersonUseCase, () => new GetPersonUseCase(
            sl.get<BasePersonRepository>(ServiceKeys.PersonRepository)
        ));

        //* Exnternal Services --------------------------------------------------
        sl.registerFactory<ApiClient>(ServiceKeys.ApiClient, () => new ApiClient());
    }

}

export default AppServicesLocator;