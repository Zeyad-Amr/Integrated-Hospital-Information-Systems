import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import staff from "@/modules/staff/presentation/controllers/slices/staff-slice";
export const store = configureStore({
    reducer: {
        staff,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;