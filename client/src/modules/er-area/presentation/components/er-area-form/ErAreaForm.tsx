import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomAlertHeaderData from "@/core/shared/components/CustomAlertHeaderData";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import CustomMultiSelectField from "@/core/shared/components/CustomMultiSelectField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import VitalsData from "@/core/shared/components/VitalsData";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import TriageAXEntity from "@/modules/er-area/domain/entities/triageAX-without-vitals-entity";
import VitalsEntity from "@/modules/er-area/domain/entities/vitals-entity";
import VitalsInterface from "@/modules/er-area/domain/interfaces/vitals-interface";
import { Box, Button, Grid } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { createTriagAX } from "../../controllers/thunks/triagAX-thunk";
import { TriageAXInterface } from "@/modules/er-area/domain/interfaces/triageAX-interface";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import { getSubDepartmentsList } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import { SubDepartmentsState } from "@/modules/management/presentation/controllers/types";
import { TransferDataInterface } from "@/modules/registration/domain/interfaces/transfer-data-interface";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import VitalsForm from "@/modules/emr/view/components/vitals/VitalsForm";
import TriageForm from "@/modules/emr/view/components/triage/TriageForm";

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
  const [expandVitalsAccordion, setExpandVitalsAccordion] = useState(true);
  const [expandTriageAccordion, setExpandTriageAccordion] = useState(true);
  const [expandRestFormAccordion, setExpandRestFormAccordion] = useState(true);
  const refSubmitTriage: any = useRef(null);

  const dispatch = useAppDispatch();
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  //* buttons useRef
  const refSubmitVitals: any = useRef(null);

  //* Form data refrence
  const triageData = useRef<TriageAXInterface>();
  const vitalsData = useRef<VitalsInterface>();

  const handleSubmitTriageData = (values: TriageAXInterface) => {
    triageData.current = values;
  };

  const handleSubmitVitalsData = (values: VitalsInterface) => {
    vitalsData.current = values;
  };

  // const handleSubmitAllForms = () => {
  //   if (refSubmitTriage.current) {
  //     refSubmitTriage.current.click();
  //   }
  //   if (refSubmitVitals.current) {
  //     refSubmitVitals.current.click();
  //   }
  // }

  useEffect(() => {
    if (triageData.current && vitalsData.current) {
      dispatch(
        createTriagAX({
          assessment: {
            ...triageData.current,
            vitals: vitalsData.current,
          },
          visitCode: patientData.id,
        })
      ).then(() => {
        // reset data
        triageData.current = undefined;
        vitalsData.current = undefined;
        setOpenDialog(false);
      });
    }
  }, [triageData.current, vitalsData.current]);

  // ***************************************************************************

  //* useState
  const [transferDataExpanded, setTransferDataExpanded] =
    useState<boolean>(true);

  //* useRef
  const refSubmitTransferData: any = useRef(null);
  const transferData = useRef<TransferDataInterface>();

  const submitTransferData = () => {
    if (refSubmitTransferData.current) {
      refSubmitTransferData.current.click();
    }
  };

  //* Handle Transfer Data Submit
  const handleTransferDataSubmit = (values: TransferDataInterface) => {
    transferData.current = values;
    // setCombinedValues((previous) => ({
    //   ...previous,
    //   transfer: values,
    // }));
  };

  const formikRefTransferData =
    useRef<FormikProps<TransferDataInterface>>(null);

  useEffect(() => {
    dispatch(getSubDepartmentsList([]));
  }, []);

  const subdepartmentState: SubDepartmentsState = useAppSelector(
    (state: any) => state.subDepartments
  );

  console.log(patientData, "patientData");

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
            />
          </CustomAccordion>

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
            {/* //* Start Patient form ********************* */}
            <Formik
              innerRef={formikRefTransferData}
              initialValues={VisitEntity.transferDataValue()}
              onSubmit={(values) => {
                console.log(values);
                handleTransferDataSubmit(values);
              }}
              validationSchema={VisitEntity.transferDataSchema()}
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
                        name="transferDate"
                        label="تاريخ نقل المريض"
                        value={values.transferDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.transferDate}
                        touched={touched.transferDate}
                        width="100%"
                        props={{
                          type: "date",
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

                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={refSubmitTransferData}
                  ></Button>
                </Box>
              )}
            </Formik>
            <PrimaryButton
              title="تأكيــد"
              type="button"
              onClick={() => submitTransferData()}
            />
          </CustomAccordion>

          {/* ************************************************************************************************************** */}
          {/* er rest form */}
          {/* <CustomAccordion
            isClosable={false}
            isDisabled={false}
            isExpanded={expandRestFormAccordion}
            setExpanded={setExpandRestFormAccordion}
            title="الفرز"
          >
            <Formik
              initialValues={TriageAXEntity.defaultValue()}
              validationSchema={TriageAXEntity.getSchema()}
              onSubmit={(values) => {
                handleSubmitTriageData(values);
              }}
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
                  <Grid container columns={12} spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
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
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomSelectField<any>
                        isRequired
                        name="transferTo"
                        label="نقل إلى"
                        value={values.transferTo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.transferTo}
                        touched={touched.transferTo}
                        width="100%"
                        options={lookupsState.lookups.departments}
                      />
                    </Grid>
                  </Grid>
                  <Grid container columns={12} spacing={2}>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <CustomMultiSelectField<any>
                        name="comorbidityIds"
                        label="الأمراض المصاحبة"
                        value={values.comorbidityIds}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.comorbidityIds}
                        touched={touched.comorbidityIds}
                        width="100%"
                        options={lookupsState.lookups.comorbidities}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    sx={{ display: "none" }}
                    ref={refSubmitTriage}
                  ></Button>
                </Box>
              )}
            </Formik>
          </CustomAccordion> */}
          {/* <CustomAccordion
            title="الاشارات الحيوية"
            isClosable={false}
            isDisabled={false}
            isExpanded={expandVitalsAccordion}
            setExpanded={setExpandVitalsAccordion}
          >
            <VitalsData
              initialValues={VitalsEntity.defaultValue()}
              onSubmit={handleSubmitVitalsData}
              refSubmitButton={refSubmitVitals}
            />
          </CustomAccordion> */}
        </Box>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
