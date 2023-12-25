"use client";
import { useAppDispatch } from "@/core/state/store";
import { useEffect } from "react";
import { getLookups } from "@/core/shared/modules/lookups/presentation/controllers/thunks/lookups-thuck";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLookups());
  }, []);

  return children;
};
