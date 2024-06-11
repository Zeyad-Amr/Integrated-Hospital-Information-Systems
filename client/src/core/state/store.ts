import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import employees from "@/modules/employees/presentation/controllers/slices/employee-slice";
import auth from "@/modules/auth/presentation/controllers/slices/auth-slice";
import registration from "@/modules/registration/presentation/controllers/slices/visits-slice";
import lookups from "@/core/shared/modules/lookups/presentation/controllers/slices/lookups-slice";
import person from "../shared/modules/person/presentation/controllers/slices/person-slice";
import rooms from "@/modules/management/presentation/controllers/slices/room-slice";
import specializations from "@/modules/management/presentation/controllers/slices/specialization-slice";
import permissions from "@/modules/management/presentation/controllers/slices/permissions-slice";
import subDepartments from "@/modules/management/presentation/controllers/slices/sub-departments-slice";
import incidents from "@/modules/registration/presentation/controllers/slices/incident-slice";
import allergies from "@/modules/emr/controllers/slices/allergies-slice";
import surgeries from "@/modules/emr/controllers/slices/surgeries-slice";
import medicalProblems from "@/modules/emr/controllers/slices/medical-problems-slice";
import medications from "@/modules/emr/controllers/slices/medications-slice";
import prescriptions from "@/modules/emr/controllers/slices/prescriptions-slice";
import diagnosis from "@/modules/emr/controllers/slices/diagnosis-slice";

const store = configureStore({
    reducer: {
        employees: employees,
        auth: auth,
        visits: registration,
        incidents,
        lookups: lookups,
        rooms,
        specializations,
        permissions,
        subDepartments,
        person,
        allergies,
        surgeries,
        medicalProblems,
        medications,
        prescriptions,
        diagnosis
    },
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
// export type RootState = ReturnType<typeof store.getState>
export default store