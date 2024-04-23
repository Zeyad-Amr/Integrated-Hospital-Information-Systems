import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import employees from "@/modules/employees/presentation/controllers/slices/employee-slice";
import auth from "@/modules/auth/presentation/controllers/slices/auth-slice";
import registration from "@/modules/registration/presentation/controllers/slices/visits-slice";
import lookups from "@/core/shared/modules/lookups/presentation/controllers/slices/lookups-slice";
import person from "../shared/modules/person/presentation/controllers/slices/person-slice";
import rooms from "@/modules/subdepartments-crud/presentation/controllers/slices/room-slice";
import specializations from "@/modules/subdepartments-crud/presentation/controllers/slices/specialization-slice";
import departments from "@/modules/subdepartments-crud/presentation/controllers/slices/departments-slice";

const store = configureStore({
    reducer: {
        employees: employees,
        auth: auth,
        visits: registration,
        lookups: lookups,
        rooms,
        specializations,
        departments,
        person
    },
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
// export type RootState = ReturnType<typeof store.getState>
export default store