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


class AppServicesLocator {
    static init() {

        //* Data Sources ----------------------------------------------
        sl.registerFactory<BaseStaffDataSource>(ServiceKeys.StaffDataSource, () => new StaffDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));


        //* Repositories ----------------------------------------------
        sl.registerFactory<BaseStaffRepository>(ServiceKeys.StaffRepository, () => new StaffRepository(
            sl.get<BaseStaffDataSource>(ServiceKeys.StaffDataSource)
        ));


        //* Use Cases --------------------------------------------------
        sl.registerFactory<GetAllStaffMembersUseCase>(ServiceKeys.GetStaffListUseCase, () => new GetAllStaffMembersUseCase(
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


        //* Exnternal Services --------------------------------------------------
        sl.registerFactory<ApiClient>(ServiceKeys.ApiClient, () => new ApiClient());
    }

}

export default AppServicesLocator;