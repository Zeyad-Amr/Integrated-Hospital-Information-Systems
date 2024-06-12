import CustomAccordion from "@/core/shared/components/CustomAccordion";
import CustomAlertHeaderData from "@/core/shared/components/CustomAlertHeaderData";
import CustomFullScreenDialog from "@/core/shared/components/CustomFullScreenDialog";
import { useAppDispatch } from "@/core/state/store";
import { Box } from "@mui/material";
import React, { useState } from "react";

import VitalsForm from "@/modules/emr/view/components/vitals/VitalsForm";
import TriageForm from "@/modules/emr/view/components/triage/TriageForm";
import { createVisitTransfer } from "@/modules/registration/presentation/controllers/thunks/visits-thunks";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";

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

  //* useState
  // const [transferDataExpanded, setTransferDataExpanded] =
  //   useState<boolean>(true);

  //* useRef
  // const refSubmitTransferData: any = useRef(null);
  // const transferData = useRef<TransferDataInterface>();

  // const submitTransferData = () => {
  //   if (refSubmitTransferData.current) {
  //     refSubmitTransferData.current.click();
  //   }
  // };

  //* Handle Transfer Data Submit
  // const handleTransferDataSubmit = (values: TransferDataInterface) => {
  //   transferData.current = values;
  //   setCombinedValues((previous) => ({
  //     ...previous,
  //     transfer: values,
  //   }));
  // };

  // const formikRefTransferData =
  //   useRef<FormikProps<TransferDataInterface>>(null);

  // useEffect(() => {
  //   dispatch(getSubDepartmentsList([]));
  // }, []);

  // const subdepartmentState: SubDepartmentsState = useAppSelector(
  //   (state: any) => state.subDepartments
  // );

  // const lookupsState: LookupsState = useAppSelector(
  //   (state: any) => state.lookups
  // );
  const dispatch = useAppDispatch();

  const transferPatientVisit = () => {
    dispatch(createVisitTransfer({ status : "TRANSFERED", visitCode : patientData?.code  })).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        setOpenDialog(false)
      }
    })
  }


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

          <SecondaryButton
              title="انهاء"
              type="button"
              sx={{ margin : "2rem 0rem 1rem 0rem"}}
              onClick={() => transferPatientVisit()}
            />

          {/* //* Start Transfer Data *******************  */}
          {/* <CustomAccordion
            isClosable={false}
            title="نقل مريض"
            isDisabled={false}
            isExpanded={transferDataExpanded}
            setExpanded={setTransferDataExpanded}
          >
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
          </CustomAccordion> */}
        </Box>
      </CustomFullScreenDialog>
    </div>
  );
};

export default ErAreaForm;
