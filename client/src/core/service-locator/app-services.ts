import sl from "./service-locator";
import ServiceKeys from "./service-keys";
//---------------------------------------------------------
import { StaffDataSource, BaseStaffDataSource } from "@/modules/staff/data/datasources/staff-datasource";
import { ApiClient } from "@/core/api/index";

class AppServicesLocator {
    static init() {
        sl.registerFactory<ApiClient>(ServiceKeys.ApiClient, () => new ApiClient());
        sl.registerFactory<BaseStaffDataSource>(ServiceKeys.StaffDataSource, () => new StaffDataSource(
            sl.get<ApiClient>(ServiceKeys.ApiClient)
        ));
    }

}

export default AppServicesLocator;