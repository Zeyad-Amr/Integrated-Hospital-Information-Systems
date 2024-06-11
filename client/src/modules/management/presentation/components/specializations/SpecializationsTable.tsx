import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import { Box } from "@mui/material";
import React, { useState } from "react";
import SpecializationsForm from "./SpecializationsForm";
import SpecializationInterface from "@/modules/management/domain/interfaces/specialization -interface";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  getSpecializationList,
  deleteSpecialization,
} from "@/modules/management/presentation/controllers/thunks/specialization-thunks";
import { SpecializationState } from "../../controllers/types";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { FilterQuery } from "@/core/api";

const SpecializationsTableHeader: HeaderItem[] = [
  {
    filterKey: "name",
    id: "name",
    label: "الأســـم",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "description",
    id: "description",
    label: "الــوصف",
    minWidth: 50,
    maxWidth: 50,
    tableCellProps: { align: "right" },
    sortable: true,
    filterable: false,
    searchable: true,
    onClick: () => {},
  },
  {
    filterKey: "update",
    id: "update",
    label: "",
    isComponent: true,
    minWidth: 100,
    tableCellProps: { align: "right" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
];

const SpecializationsTable = () => {
  const dispatch = useAppDispatch();
  const [showSpecializationForm, setShowSpecializationForm] =
    useState<boolean>(false);
  const [isEditSpecializationForm, setIsEditSpecializationForm] =
    useState<boolean>(false);
  const [specializationData, setSpecializationData] =
    useState<SpecializationInterface>();
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const specializationState: SpecializationState = useAppSelector(
    (state: any) => state.specializations
  );

  return (
    <Box>
      <ConfirmationDialog
        confirmFunction={async () =>
          dispatch(deleteSpecialization(String(specializationData?.id))).then(
            () => {
              setShowConfirmationDialog(false);
            }
          )
        }
        contentMessage="في حالة حذف التخصص لن تستطيع العودة اليه مجددا, هل انت متأكد من حذف هذا التخصص ؟"
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="حذف تخصص"
      />
      <PrimaryButton
        type="button"
        title="اضــافة تخصص"
        sx={{ marginBottom: "1rem" }}
        onClick={() => {
          setShowSpecializationForm(true);
          setIsEditSpecializationForm(false);
        }}
      />
      <CustomizedDialog
        open={showSpecializationForm}
        setOpen={setShowSpecializationForm}
        title={isEditSpecializationForm ? "تعديل تخصص" : "اضافة تخصص"}
      >
        <SpecializationsForm
          setShowSpecializationForm={setShowSpecializationForm}
          isEdit={isEditSpecializationForm}
          propsIntialValues={specializationData}
        />
      </CustomizedDialog>

      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getSpecializationList(filters));
        }}
        resetComponent={specializationState?.specializations.reset}
        totalItems={specializationState?.specializations.total}
        data={specializationState?.specializations.items.map(
          (item: SpecializationInterface) => {
            return {
              name: item.name ?? "",
              description: item.description ?? "",
              update: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    color: "primary.dark",
                  }}
                >
                  <EditRoundedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowSpecializationForm(true);
                      setIsEditSpecializationForm(true);
                      setSpecializationData({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                      });
                    }}
                  />
                  <DeleteRoundedIcon
                    sx={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setSpecializationData({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                      });
                      setShowConfirmationDialog(true);
                    }}
                  />
                </Box>
              ),
            };
          }
        )}
        headerItems={SpecializationsTableHeader}
        height="75vh"
      />
    </Box>
  );
};

export default SpecializationsTable;
