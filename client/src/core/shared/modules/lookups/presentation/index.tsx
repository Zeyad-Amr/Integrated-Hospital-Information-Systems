"use client";
import { useAppDispatch } from "@/core/state/store";
import { useEffect } from "react";
import { getLookups } from "@/core/shared/modules/lookups/presentation/controllers/thunks/lookups-thuck";
import { getMe } from "@/modules/auth/presentation/controllers/thunks/auth-thunks";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getLookups());
  }, []);

  return children;
};
