import React, { useEffect } from "react";
import { Formik } from "formik";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { Box } from "@mui/system";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { VisitStatus } from "@/modules/registration/domain/entities/visit-entity";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { createVisitTransfer } from "@/modules/registration/presentation/controllers/thunks/visits-thunks";
import { useRouter } from "next/navigation";
import { SubDepartmentsState } from "@/modules/management/presentation/controllers/types";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";

const EndExaminationForm = ({
  visitId,
  discharge,
}: {
  visitId: string;
  discharge: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const transferPatientVisit = (status: VisitStatus, visitCode: string) => {
    dispatch(
      createVisitTransfer({ status: status, visitCode: visitCode })
    ).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        router.push("/dashboard/clinic/visits");
      }
    });
  };

  // get data from store
  const subDepartmentsState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
  );

  useEffect(() => {
    dispatch(getSubDepartmentsList([]));
  }, []);

  function filterAndTransform(items: any) {
    console.log(items);
    return items
      ?.filter(
        (item: SubDepartmentInterface) =>
          item.departmentId === 9 || item.departmentId === 10
      )
      .map((item: SubDepartmentInterface) => ({
        id: item.id,
        value: item.name,
      }));
  }

  filterAndTransform(subDepartmentsState.subDepartments.items);
  const dischargeOptions = [
    { id: 1, value: "نقل" },
    { id: 2, value: "تحسن" },
    { id: 3, value: "وفاة" },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={{ transfer: 0 }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
      validateOnChange={true}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <CustomSelectField
              name="transfer"
              noMargin
              height="2.5rem"
              label={""}
              value={values.transfer}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.transfer}
              touched={touched.transfer}
              options={
                discharge
                  ? dischargeOptions
                  : filterAndTransform(subDepartmentsState.subDepartments.items)
              }
              width="14rem"
            />
            <PrimaryButton
              title={!discharge ? "تحويل المريض" : "انهاء الزيارة"}
              sx={{ width: "12rem" }}
              onClick={() => {
                console.log("انهاء الزيارة");
                transferPatientVisit(VisitStatus.EXAMINED, visitId);
              }}
            />
          </Box>
        );
      }}
    </Formik>
  );
};

export default EndExaminationForm;
