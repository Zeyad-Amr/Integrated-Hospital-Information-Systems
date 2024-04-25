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
import { BaseVisitDataSource, VisitDataSource } from "@/modules/registration/data/datasources/visit-datasource";
import VisitRepository from "@/modules/registration/data/repositories/visit-repository";
import BaseVisitRepository from "@/modules/registration/domain/repositories/base-visit-repository";
import { CreateVisitUseCase, GetAnonymousVisitUseCase, GetVisitByCodeUseCase, UpdateVisitUseCase } from "@/modules/registration/domain/usecases/visit";
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
import { BaseIncidentDataSource, IncidentDataSource } from "@/modules/registration/data/datasources/incident-datasource";
import BaseIncidentRepository from "@/modules/registration/domain/repositories/base-incident-repository";
import IncidentRepository from "@/modules/registration/data/repositories/incident-repository";
import CreateIncidentUseCase from "@/modules/registration/domain/usecases/incident/create-incident-usecase";
import { BaseRoomDataSource, RoomDataSource } from "@/modules/subdepartments-crud/data/datasources/room-datasource";
import BaseRoomRepository from "@/modules/subdepartments-crud/domain/repositories/base-room-repository";
import RoomRepository from "@/modules/subdepartments-crud/data/repositories/room-repository";
import CreateRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/create-room-usecase";
import DeleteRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/delete-room-usecase";
import UpdateRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/update-room-usecase";
import GetAllRoomsUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/get-all-rooms-usecase";
import GetRoomByIdUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/get-room-by-Id-usecase";
import { BaseSpecializationDataSource, SpecializationDataSource } from "@/modules/subdepartments-crud/data/datasources/specialization-datasource";
import BaseSpecializationRepository from "@/modules/subdepartments-crud/domain/repositories/base-specialization-repository";
import SpecializationRepository from "@/modules/subdepartments-crud/data/repositories/specialization-repository";
import UpdateSpecializationUseCase from '@/modules/subdepartments-crud/domain/usecases/specializations/update-specialization-usecase';
import DeleteSpecializationUseCase from '@/modules/subdepartments-crud/domain/usecases/specializations/delete-specialization-usecase';
import GetAllSpecializationsUseCase from '@/modules/subdepartments-crud/domain/usecases/specializations/get-all-specializations-usecase';
import GetSpecializationByIdUseCase from '@/modules/subdepartments-crud/domain/usecases/specializations/get-specialization-by-Id-usecase';
import CreateSpecializationUseCase from "@/modules/subdepartments-crud/domain/usecases/specializations/create-specialization-usecase";
import { BaseDepartmentsDataSource, DepartmentsDataSource } from "@/modules/subdepartments-crud/data/datasources/departments-datasource";
import BaseDepartmentsRepository from "@/modules/subdepartments-crud/domain/repositories/base-departments-repository";
import DepartmentsRepository from "@/modules/subdepartments-crud/data/repositories/departments-repository";
import GetAllDepartmentsUseCase from "@/modules/subdepartments-crud/domain/usecases/departments/get-all-departments-usecase";
import { BaseSubDepartmentsDataSource, SubDepartmentsDataSource } from "@/modules/subdepartments-crud/data/datasources/sub-departments-datasource";
import BaseSubDepartmentsRepository from "@/modules/subdepartments-crud/domain/repositories/base-sub-departments-repository";
import SubDepartmentsRepository from "@/modules/subdepartments-crud/data/repositories/sub-departments-repository";
import CreateSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/create-sub-department-usecase";
import DeleteSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/delete-sub-department-usecase";
import UpdateSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/update-sub-department-usecase";
import GetAllSubDepartmentsUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/get-all-sub-departments-usecase";
import GetSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/get-sub-departments-by-Id-usecase";


class AppServicesLocator {
    static init() {

        //* Data Sources ----------------------------------------------
        sl.registerFactory<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource, () => new EmployeeDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseAuthDataSource>(ServiceKeys.AuthDataSources, () => new AuthDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseVisitDataSource>(ServiceKeys.VisitDataSource, () => new VisitDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseIncidentDataSource>(ServiceKeys.IncidentDataSource, () => new IncidentDataSource(
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
        sl.registerFactory<BaseRoomDataSource>(ServiceKeys.RoomDataSource, () => new RoomDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseSpecializationDataSource>(ServiceKeys.SpecializationDataSource, () => new SpecializationDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseDepartmentsDataSource>(ServiceKeys.DepartmentsDataSource, () => new DepartmentsDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseSubDepartmentsDataSource>(ServiceKeys.SubDepartmentsDataSource, () => new SubDepartmentsDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));


        //* Repositories ----------------------------------------------
        sl.registerFactory<BaseEmployeeRepository>(ServiceKeys.EmployeeRepository, () => new EmployeeRepository(
            sl.get<BaseEmployeeDataSource>(ServiceKeys.EmployeeDataSource)
        ));
        sl.registerFactory<BaseAuthRepository>(ServiceKeys.AuthRepository, () => new AuthRepository(
            sl.get<BaseAuthDataSource>(ServiceKeys.AuthDataSources)
        ));
        sl.registerFactory<BaseVisitRepository>(ServiceKeys.VisitRepository, () => new VisitRepository(
            sl.get<BaseVisitDataSource>(ServiceKeys.VisitDataSource)
        ));
        sl.registerFactory<BaseIncidentRepository>(ServiceKeys.IncidentRepository, () => new IncidentRepository(
            sl.get<BaseIncidentDataSource>(ServiceKeys.IncidentDataSource)
        ));
        sl.registerFactory<BaseLookupsRepository>(ServiceKeys.LookupsRepository, () => new LookupsRepository(
            sl.get<BaseLookupsDataSource>(ServiceKeys.LookupsDataSource)));
        sl.registerFactory<BaseTriageAXRepository>(ServiceKeys.TriageAXRepository, () => new TriageAXRepository(
            sl.get<BaseTriageAXRepository>(ServiceKeys.TriageAXDataSource)
        ));
        sl.registerFactory<BasePersonRepository>(ServiceKeys.PersonRepository, () => new PersonRepository(
            sl.get<BasePersonDataSource>(ServiceKeys.PersonDataSource)
        ));
        sl.registerFactory<BaseRoomRepository>(ServiceKeys.RoomRepository, () => new RoomRepository(
            sl.get<BaseRoomDataSource>(ServiceKeys.RoomDataSource)
        ));
        sl.registerFactory<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository, () => new SpecializationRepository(
            sl.get<BaseSpecializationDataSource>(ServiceKeys.SpecializationDataSource)
        ));
        sl.registerFactory<BaseDepartmentsRepository>(ServiceKeys.DepartmentsRepository, () => new DepartmentsRepository(
            sl.get<BaseDepartmentsDataSource>(ServiceKeys.DepartmentsDataSource)
        ));
        sl.registerFactory<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository, () => new SubDepartmentsRepository(
            sl.get<BaseSubDepartmentsDataSource>(ServiceKeys.SubDepartmentsDataSource)
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

        // Rooms 
        sl.registerFactory<CreateRoomUseCase>(ServiceKeys.CreateRoomUseCase, () => new CreateRoomUseCase(
            sl.get<BaseRoomRepository>(ServiceKeys.RoomRepository)
        ));
        sl.registerFactory<DeleteRoomUseCase>(ServiceKeys.DeleteRoomUseCase, () => new DeleteRoomUseCase(
            sl.get<BaseRoomRepository>(ServiceKeys.RoomRepository)
        ));
        sl.registerFactory<UpdateRoomUseCase>(ServiceKeys.UpdateRoomUseCase, () => new UpdateRoomUseCase(
            sl.get<BaseRoomRepository>(ServiceKeys.RoomRepository)
        ));
        sl.registerFactory<GetAllRoomsUseCase>(ServiceKeys.GetAllRoomsUseCase, () => new GetAllRoomsUseCase(
            sl.get<BaseRoomRepository>(ServiceKeys.RoomRepository)
        ));
        sl.registerFactory<GetRoomByIdUseCase>(ServiceKeys.GetRoomByIdUseCase, () => new GetRoomByIdUseCase(
            sl.get<BaseRoomRepository>(ServiceKeys.RoomRepository)
        ));

        // Sub departments 
        sl.registerFactory<CreateSubDepartmentUseCase>(ServiceKeys.CreateSubDepartmentUseCase, () => new CreateSubDepartmentUseCase(
            sl.get<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository)
        ));
        sl.registerFactory<DeleteSubDepartmentUseCase>(ServiceKeys.DeleteSubDepartmentUseCase, () => new DeleteSubDepartmentUseCase(
            sl.get<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository)
        ));
        sl.registerFactory<UpdateSubDepartmentUseCase>(ServiceKeys.UpdateSubDepartmentUseCase, () => new UpdateSubDepartmentUseCase(
            sl.get<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository)
        ));
        sl.registerFactory<GetAllSubDepartmentsUseCase>(ServiceKeys.GetAllSubDepartmentsUseCase, () => new GetAllSubDepartmentsUseCase(
            sl.get<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository)
        ));
        sl.registerFactory<GetSubDepartmentUseCase>(ServiceKeys.GetSubDepartmentByIdUseCase, () => new GetSubDepartmentUseCase(
            sl.get<BaseSubDepartmentsRepository>(ServiceKeys.SubDepartmentsRepository)
        ));
        
        // Specializations
        sl.registerFactory<CreateSpecializationUseCase>(ServiceKeys.CreateSpecializationUseCase, () => new CreateSpecializationUseCase(
            sl.get<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository)
        ));
        sl.registerFactory<UpdateSpecializationUseCase>(ServiceKeys.UpdateSpecializationUseCase, () => new UpdateSpecializationUseCase(
            sl.get<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository)
        ));
        sl.registerFactory<DeleteSpecializationUseCase>(ServiceKeys.DeleteSpecializationUseCase, () => new DeleteSpecializationUseCase(
            sl.get<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository)
        ));
        sl.registerFactory<GetAllSpecializationsUseCase>(ServiceKeys.GetAllSpecializationsUseCase, () => new GetAllSpecializationsUseCase(
            sl.get<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository)
        ));
        sl.registerFactory<GetSpecializationByIdUseCase>(ServiceKeys.GetSpecializationByIdUseCase, () => new GetSpecializationByIdUseCase(
            sl.get<BaseSpecializationRepository>(ServiceKeys.SpecializationRepository)
        ));

        // Departments
        sl.registerFactory<GetAllDepartmentsUseCase>(ServiceKeys.GetAllDepartmentsUseCase, () => new GetAllDepartmentsUseCase(
            sl.get<BaseDepartmentsRepository>(ServiceKeys.DepartmentsRepository)
        ));

        sl.registerFactory<LoginUseCase>(ServiceKeys.LoginUseCase, () => new LoginUseCase(
            sl.get<BaseAuthRepository>(ServiceKeys.AuthRepository)
        ));
        sl.registerFactory<GetMeUseCase>(ServiceKeys.GetMeUseCase, () => new GetMeUseCase(
            sl.get<BaseAuthRepository>(ServiceKeys.AuthRepository)
        ));

        sl.registerFactory<CreateIncidentUseCase>(ServiceKeys.CreateIncidentUseCase, () => new CreateIncidentUseCase(
            sl.get<BaseIncidentRepository>(ServiceKeys.IncidentRepository)
        ));

        sl.registerFactory<CreateVisitUseCase>(ServiceKeys.CreateVisitUseCase, () => new CreateVisitUseCase(
            sl.get<BaseVisitRepository>(ServiceKeys.VisitRepository)
        ));
        sl.registerFactory<UpdateVisitUseCase>(ServiceKeys.UpdateVisitUseCase, () => new UpdateVisitUseCase(
            sl.get<BaseVisitRepository>(ServiceKeys.VisitRepository)
        ));
        sl.registerFactory<GetVisitByCodeUseCase>(ServiceKeys.GetVisitByCodeUseCase, () => new GetVisitByCodeUseCase(
            sl.get<BaseVisitRepository>(ServiceKeys.VisitRepository)
        ));
        sl.registerFactory<GetAnonymousVisitUseCase>(ServiceKeys.GetAnonymousVisitUseCase, () => new GetAnonymousVisitUseCase(
            sl.get<BaseVisitRepository>(ServiceKeys.VisitRepository)
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