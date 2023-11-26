import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import employee from "@/modules/employees/presentation/controllers/slices/employee-slice";
import auth from "@/modules/auth/presentation/controllers/slices/auth-slice";

const store = configureStore({
    reducer: {
        employee: employee,
        auth: auth
    },
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
// export type RootState = ReturnType<typeof store.getState>
export default store