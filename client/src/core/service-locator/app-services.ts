import sl from "./service-locator";
import ServiceKeys from "./service-keys";
//---------------------------------------------------------
import { StaffDataSource, BaseStaffDataSource } from "@/modules/staff/data/datasources/staff-datasource";
import { ApiClient } from "@/core/api/index";
import BaseStaffRepository from "@/modules/staff/domain/repositories/base-staff-repository";
import StaffRepository from "@/modules/staff/data/repositories/staff-repository";
import {
    GetStaffDetailsUseCase,
    GetAllStaffMembersUseCase,
    CreateStaffMemberUseCase,
    DeleteStaffMemberUseCase,
    UpdateStaffMemberUseCase,
} from "@/modules/staff/domain/usecases/index";
import { AuthDataSource, BaseAuthDataSource } from "@/modules/auth/data/datasources/auth-datasource";
import BaseAuthRepository from "@/modules/auth/domain/repositories/base-auth-repository";
import AuthRepository from "@/modules/auth/data/repositories/auth-repository";
import { LoginUseCase } from "@/modules/auth/domain/usecases";
import GetMeUseCase from "@/modules/auth/domain/usecases/get-me-usecase";

class AppServicesLocator {
    static init() {

        //* Data Sources ----------------------------------------------
        sl.registerFactory<BaseStaffDataSource>(ServiceKeys.StaffDataSource, () => new StaffDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
        sl.registerFactory<BaseAuthDataSource>(ServiceKeys.AuthDataSources, () => new AuthDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));


        //* Repositories ----------------------------------------------
        sl.registerFactory<BaseStaffRepository>(ServiceKeys.StaffRepository, () => new StaffRepository(
            sl.get<BaseStaffDataSource>(ServiceKeys.StaffDataSource)
        ));
        sl.registerFactory<BaseAuthRepository>(ServiceKeys.AuthRepository, () => new AuthRepository(
            sl.get<BaseAuthDataSource>(ServiceKeys.AuthDataSources)
        ));


        //* Use Cases --------------------------------------------------
        sl.registerFactory<GetAllStaffMembersUseCase>(ServiceKeys.GetAllStaffMembersUseCase, () => new GetAllStaffMembersUseCase(
            sl.get<BaseStaffRepository>(ServiceKeys.StaffRepository)
        ));
        sl.registerFactory<GetStaffDetailsUseCase>(ServiceKeys.GetStaffDetailsUseCase, () => new GetStaffDetailsUseCase(
            sl.get<BaseStaffRepository>(ServiceKeys.StaffRepository)
        ));
        sl.registerFactory<CreateStaffMemberUseCase>(ServiceKeys.CreateStaffMemberUseCase, () => new CreateStaffMemberUseCase(
            sl.get<BaseStaffRepository>(ServiceKeys.StaffRepository)
        ));
        sl.registerFactory<UpdateStaffMemberUseCase>(ServiceKeys.UpdateStaffMemberUseCase, () => new UpdateStaffMemberUseCase(
            sl.get<BaseStaffRepository>(ServiceKeys.StaffRepository)
        ));
        sl.registerFactory<DeleteStaffMemberUseCase>(ServiceKeys.DeleteStaffMemberUseCase, () => new DeleteStaffMemberUseCase(
            sl.get<BaseStaffRepository>(ServiceKeys.StaffRepository)
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