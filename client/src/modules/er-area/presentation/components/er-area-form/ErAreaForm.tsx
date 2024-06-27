import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomAlertHeaderData from "@/core/shared/components/CustomAlertHeaderData";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import VitalsForm from "@/modules/emr/view/components/vitals/VitalsForm";
import TriageForm from "@/modules/emr/view/components/triage/TriageForm";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import { SubDepartmentsState } from "@/modules/management/presentation/controllers/types";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import { Formik, FormikProps } from "formik";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import CustomTextField from "@/core/shared/components/CustomTextField";
import TriageAXEntity from "@/modules/er-area/domain/entities/triageAX-without-vitals-entity";
import {
  TriageAXInterface,
  TriageTransferInterface,
} from "@/modules/er-area/domain/interfaces/triageAX-interface";
import { createTriagAX } from "../../controllers/thunks/triagAX-thunk";
import { VitalsInterface } from "@/modules/emr/interfaces/vitals-interface";
import { TriageInterface } from "@/modules/emr/interfaces/triage-interface";

interface IErAreaFormProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  patientData: any;
}

const ErAreaForm = ({
  openDialog,
  setOpenDialog,
  patientData,
}: IErAreaFormProps) => {
  const dispatch = useAppDispatch();

  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);
  const [expandTriageAccordion, setExpandTriageAccordion] = useState(true);
  const [combinedValues, setCombinedValues] = useState<TriageAXInterface>();

  //* useState
  const [transferDataExpanded, setTransferDataExpanded] =
    useState<boolean>(true);

  //* buttons useRef
  const refSubmitTrigeData: any = useRef(null);
  const refSubmitVitalsData: any = useRef(null);
  const refSubmitTransferData: any = useRef(null);

  //* Form data refrence
  const triageData = useRef<TriageInterface>();
  const vitalsData = useRef<VitalsInterface>();
  const triageTransferData = useRef<TriageTransferInterface>();

  //* Submit functions
  const submitTriage = () => {
    if (refSubmitTrigeData.current) {
      refSubmitTrigeData.current.click();
    }
  };
  const submitVitals = () => {
    if (refSubmitVitalsData.current) {
      refSubmitVitalsData.current.click();
    }
  };
  const submitTransferData = () => {
    console.log(22);

    if (refSubmitTransferData.current) {
      refSubmitTransferData.current.click();
    }
  };

  //* Handle Triage Submit
  const handleTriageSubmit = (values: TriageInterface) => {
    triageData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      triage: values,
    }));
  };

  //* Handle Companion Submit
  const handleVitalsSubmit = (values: VitalsInterface) => {
    vitalsData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      vitals: values,
    }));
  };

  //* Handle Transfer Data Submit
  const handleTransferDataSubmit = (values: TriageTransferInterface) => {
    triageTransferData.current = values;
    setCombinedValues((previous) => ({
      ...previous,
      triageTransfer: values,
    }));
  };

  //* Handle Submit all Forms
  const handleSubmitAllForms = () => {
    submitTriage();
    submitVitals();
    submitTransferData();
  };

  useEffect(() => {
    if (
      triageData.current &&
      vitalsData.current &&
      triageTransferData.current
    ) {
      if (combinedValues) {
        dispatch(
          createTriagAX({
            ...combinedValues,
            visitCode: patientData?.code,
            patientId: patientData?.patientId,
          })
        ).then((res) => {
          if (res.meta.requestStatus == "fulfilled") {
            setOpenDialog(false);
          }
        });
        console.log(combinedValues);
      }
    }
  }, [combinedValues]);

  const formikRefTransferData =
    useRef<FormikProps<TriageTransferInterface>>(null);

  useEffect(() => {
    dispatch(getSubDepartmentsList([]));
  }, []);

  const subdepartmentState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
  );

  return (
    <div>
      <CustomFullScreenDialog
        navTitle="نموذج فحص الفرز الأولي"
        open={openDialog}
        setOpen={setOpenDialog}
      >
        <CustomAlertHeaderData
          color="primary.dark"
          dataList={[
            {
              title: "رقم المريض",
              message: patientData?.code,
            },
            {
              title: "اسم المريض",
              message: (
                <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  {patientData?.name}
                </span>
              ),
            },
            {
              title: "النوع",
              message: patientData?.gender,
            },
            {
              title: "السن",
              message: patientData?.age,
            },
          ]}
        />
        <Box
          sx={{
            width: "95%",
            margin: "1.5rem auto",
          }}
        >
          {/* //* Triage Form */}
          <CustomAccordion
            isClosable={false}
            title="فرز مريض"
            isDisabled={false}
            isExpanded={expandTriageAccordion}
            setExpanded={setExpandTriageAccordion}
          >
            <TriageForm
              setShowFormDialog={setExpandTriageAccordion}
              isViewMode={false}
              patientId={patientData?.patientId}
              visitCode={patientData?.code}
              initialValues={undefined}
              refSubmitButton={refSubmitTrigeData}
              onSubmit={handleTriageSubmit}
            />
          </CustomAccordion>

          {/* //* Vitals Data - need to reset  */}
          <CustomAccordion
            isClosable={false}
            title="الاشارات الحيوية"
            isDisabled={false}
            isExpanded={expandVitalsAccordion}
            setExpanded={setExpandVitalsAccordion}
          >
            <VitalsForm
              setShowFormDialog={setExpandVitalsAccordion}
              isViewMode={false}
              patientId={patientData?.patientId}
              visitCode={patientData?.code}
              initialValues={undefined}
              refSubmitButton={refSubmitVitalsData}
              onSubmit={(values) => {
                console.log(values);

                return handleVitalsSubmit(values);
              }}
            />
          </CustomAccordion>

          {/* //* Start Transfer Data *******************  */}
          <CustomAccordion
            isClosable={false}
            title="نقل مريض"
            isDisabled={false}
            isExpanded={transferDataExpanded}
            setExpanded={setTransferDataExpanded}
          >
            <Formik
              innerRef={formikRefTransferData}
              initialValues={TriageAXEntity.triageTransfereDefaultValue()}
              onSubmit={(values) => {
                console.log(values);
                handleTransferDataSubmit(values);
              }}
              validationSchema={TriageAXEntity.triageTransferSchema()}
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
                  <Grid container spacing={1}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <CustomTextField
                        isRequired
                        name="mainComplaint"
                        label="الشكوى"
                        value={values.mainComplaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.mainComplaint}
                        touched={touched.mainComplaint}
                        width="100%"
                        props={{
                          type: "text",
                        }}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <CustomSelectField
                        value={values.toSubDepId}
                        options={subdepartmentState?.subDepartments?.items.map(
                          (subdepartment: SubDepartmentInterface) => {
                            return {
                              id: subdepartment.id,
                              value: subdepartment.name,
                            };
                          }
                        )}
                        name="toSubDepId"
                        label="نقل المريض الي"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.toSubDepId}
                        touched={touched.toSubDepId}
                        width="100%"
                        sx={{ margin: "0" }}
                      />
                    </Grid>
                  </Grid>

                  <PrimaryButton
                    title="تأكيــد"
                    type="submit"
                    ref={refSubmitTransferData}
                    display="none"
                  />
                </Box>
              )}
            </Formik>
          </CustomAccordion>

          <SecondaryButton
            title="انهاء"
            type="button"
            sx={{ margin: "2rem 0rem 1rem 0rem" }}
            onClick={() => handleSubmitAllForms()}
          />
        </Box>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
