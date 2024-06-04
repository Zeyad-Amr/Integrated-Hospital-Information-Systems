import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import SubDepartmentsEntity from "@/modules/management/domain/entities/sub-departments-entity";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { RoomState, SpecializationState } from "../../controllers/types";
import RoomInterface from "@/modules/management/domain/interfaces/room-interface";
import SpecializationInterface from "@/modules/management/domain/interfaces/specialization -interface";
import {
  createSubDepartment,
  updateSubDepartment,
} from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { DepartmentInterface } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";

interface SubDepartmentsFormProps {
  isEdit: boolean;
  propsIntialValues?: SubDepartmentInterface;
  setshowSubDepartmentForm: (isShown: boolean) => void;
}

const SubDepartmentsForm = ({
  propsIntialValues,
  setshowSubDepartmentForm,
  isEdit,
}: SubDepartmentsFormProps) => {
  // get data from store
  const roomsState: RoomState = useAppSelector((state: any) => state.rooms);
  const specializationsState: SpecializationState = useAppSelector(
    (state: any) => state.specializations
  );
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={
        isEdit && propsIntialValues
          ? propsIntialValues
          : SubDepartmentsEntity.defaultValue()
      }
      onSubmit={async (values) => {
        isEdit && propsIntialValues
          ? // in case edit mode
            dispatch(
              updateSubDepartment({
                id: String(propsIntialValues.id),
                name: values.name,
                departmentId: values.departmentId,
                roomId: values.roomId,
                specializationId: values.specializationId,
              })
            ).then(() => {
              setshowSubDepartmentForm(false);
            })
          : // in case not edit mode
            dispatch(createSubDepartment(values)).then(() => {
              setshowSubDepartmentForm(false);
            });
      }}
      validationSchema={SubDepartmentsEntity.subDepartmentsFormValidations()}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="name"
                label="الاســـم"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                width="100%"
                sx={{ margin: "0" }}
                props={{
                  type: "text",
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <CustomSelectField
                value={values.departmentId}
                options={lookupsState.lookups.departments?.map(
                  (department: DepartmentInterface) => {
                    return {
                      id: department.id,
                      value: department.value,
                    };
                  }
                )}
                isRequired
                name="departmentId"
                label="القســــم"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.departmentId}
                touched={touched.departmentId}
                width="100%"
                sx={{ margin: "0" }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <CustomSelectField
                options={roomsState?.rooms.items.map((room: RoomInterface) => {
                  return {
                    id: room.id,
                    value: room.name,
                  };
                })}
                isRequired
                name="roomId"
                label="الغـــرفة"
                value={values.roomId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.roomId}
                touched={touched.roomId}
                width="100%"
                sx={{ margin: "0" }}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomSelectField
                options={specializationsState?.specializations.items.map(
                  (specialization: SpecializationInterface) => {
                    return {
                      id: specialization.id,
                      value: specialization.name,
                    };
                  }
                )}
                isRequired
                name="specializationId"
                label="التخصص"
                value={values.specializationId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.specializationId}
                touched={touched.specializationId}
                width="100%"
                sx={{ margin: "0" }}
              />
            </Grid>
          </Grid>
          <PrimaryButton
            title={isEdit ? "حفــــظ" : "اضـــافة"}
            type="submit"
          />
        </Box>
      )}
    </Formik>
  );
};

export default SubDepartmentsForm;
