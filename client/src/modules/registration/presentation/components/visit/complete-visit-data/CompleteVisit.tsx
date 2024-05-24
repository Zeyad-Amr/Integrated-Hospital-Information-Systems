// TODO: Refactor this component
// import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
// import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";
// import { Button, Box } from "@mui/material";
// import * as Yup from "yup";
// import { Formik } from "formik";
// import React, { useEffect, useRef, useState } from "react";
// import CustomTextField from "@/core/shared/components/CustomTextField";
// import CustomSelectField from "@/core/shared/components/CustomSelectField";
// import Dialog from "@/core/shared/components/Dialog";
// import PersonalDataComponent from "@/core/shared/components/PersonalDataComponent";
// import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
// import { useAppSelector } from "@/core/state/store";
// import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
// import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
// import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";

// interface CompleteVisitProps {
//   display: string;
//   DialogStateController: React.Dispatch<React.SetStateAction<string>>;
//   id?: string
// }

// const CompleteVisit = ({
//   display,
//   DialogStateController,
//   id,
// }: CompleteVisitProps) => {

//   const lookupsState: LookupsState = useAppSelector(
//     (state: any) => state.lookups
//   );

//   // useRef
//   const refSubmitFirstStepButton: any = useRef(null);
//   const refSubmitSecondStepButton: any = useRef(null);
//   const sequenceNumberValue: any = useRef("");
//   const kinshipValue: any = useRef("");
//   const patientData: any = useRef({});
//   const checkFirstRender = useRef(true);

//   // useState
//   const [submitPatientFlag, setSubmitPatientFlag] = useState<boolean>(false);
//   const [showCompanionFlag, setShowCompanionFlag] = useState<boolean>(false);
//   const [addCompanionClicked, setAddCompanionClicked] =
//     useState<boolean>(false);
//   const [submitCompanionFlag, setSubmitCompanionFlag] =
//     useState<boolean>(false);
//   const [combinedValues, setCombinedValues] = useState<any>({
//     patient: {},
//     companion: {},
//     visit: {
//       sequenceNumber: "",
//       kinship: "",
//     },
//   });

//   const sharedInitialValues = {
//     firstName: "",
//     secondName: "",
//     thirdName: "",
//     forthName: "",
//     email: "",
//     SSN: "",
//     phone: "",
//     id: "",
//     gender: "",
//     governate: "",
//     birthDate: null,
//     address: "",
//     verificationMethod: "",
//     search: "",
//   };

//   const handlePatientSubmit = (values: PersonInterface) => {
//     if (addCompanionClicked) {
//       setShowCompanionFlag(true);
//       patientData.current = values;
//     } else {
//       setCombinedValues((prevValues: any) => ({
//         ...prevValues,
//         patient: values,
//         companion: {},
//         visit: {
//           sequenceNumber: sequenceNumberValue.current,
//           kinship: "",
//         },
//       }));
//     }
//   };

//   const handleRestPatientSubmit = (values: { sequenceNumber: string }) => {
//     setSubmitPatientFlag(!submitPatientFlag);
//     sequenceNumberValue.current = values.sequenceNumber;
//   };

//   const onTriggerRestAndPatientForm = () => {
//     if (refSubmitFirstStepButton.current) {
//       refSubmitFirstStepButton.current.click();
//       if (showCompanionFlag) {
//         if (refSubmitSecondStepButton.current) {
//           refSubmitSecondStepButton.current.click();
//         }
//       }
//     }
//   };

//   const restPatientFormSchema = Yup.object({
//     sequenceNumber: Yup.string()
//       .required("يجب ادخال رقم التردد")
//       .matches(/^[0-9]+$/, "رقم التردد يجب ان يكون ارقام عددية"),
//   });

//   // second step
//   const restCompanionFormSchema = Yup.object({
//     kinship: Yup.string().required("يجب اختيار درجة القرابة"),
//   });

//   const handleRestCompanionSubmit = (values: { kinship: number }) => {
//     setSubmitCompanionFlag(!submitCompanionFlag);
//     kinshipValue.current = values.kinship;
//   };

//   const handleCompanionSubmit = (values: PersonInterface) => {
//     console.log("totalSubmit", values);
//     setCombinedValues((prevValues: any) => ({
//       ...prevValues,
//       patient: patientData.current,
//       companion: values,
//       visit: {
//         sequenceNumber: sequenceNumberValue.current,
//         kinship: kinshipValue.current,
//       },
//     }));
//   };

//   const onDeleteCompanion = () => {
//     setShowCompanionFlag(false);
//     setAddCompanionClicked(false);
//   };

//   useEffect(() => {
//     if (checkFirstRender.current) {
//       checkFirstRender.current = false;
//     } else {
//       console.log(combinedValues);
//     }
//   }, [combinedValues]);

//   return (
//     <Dialog
//       display={display}
//       DialogStateController={DialogStateController}
//       title="استكمال بيانات زيارة"
//     >
//       {/* start rest patient form */}
//       <Box sx={{ width: "100%", overflowY: "scroll", padding: "2rem", height: '30rem' }}>
//         <Formik
//           initialValues={{ sequenceNumber: "" }}
//           validationSchema={restPatientFormSchema}
//           onSubmit={(values) => {
//             handleRestPatientSubmit(values);
//           }}
//         >
//           {({
//             values,
//             touched,
//             errors,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//           }) => (
//             <Box component="form" onSubmit={handleSubmit} noValidate>
//               <CustomTextField
//                 isRequired
//                 name="sequenceNumber"
//                 label="رقم التردد"
//                 value={values.sequenceNumber}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={errors.sequenceNumber}
//                 touched={touched.sequenceNumber}
//                 width="100%"
//                 props={{
//                   type: "text",
//                 }}
//               />
//               <Button
//                 type="submit"
//                 sx={{ display: "none" }}
//                 ref={refSubmitFirstStepButton}
//               ></Button>
//             </Box>
//           )}
//         </Formik>

//         {/* start patient form */}
//         <PersonalDataComponent
//           initialValues={PersonEntity.defaultValue()}
//           onSubmit={handlePatientSubmit}
//           isSubmitted={submitPatientFlag}
//         />

//         <br />
//         <hr />
//         <br />

//         {/* second step */}
//         {/* start rest companion form */}
//         <Box sx={{ display: showCompanionFlag === true ? "block" : "none" }}>
//           <Formik
//             initialValues={{ kinship: 0 }}
//             validationSchema={VisitEntity.kinshipSchema()}
//             onSubmit={(values) => {
//               handleRestCompanionSubmit(values);
//             }}
//           >
//             {({
//               values,
//               touched,
//               errors,
//               handleChange,
//               handleBlur,
//               handleSubmit,
//             }) => (
//               <Box component="form" onSubmit={handleSubmit} noValidate>
//                 <CustomSelectField<any>
//                   isRequired
//                   name="kinship"
//                   label="درجة القرابة"
//                   value={values.kinship}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.kinship}
//                   touched={touched.kinship}
//                   width="100%"
//                   options={lookupsState.lookups.kinshipTypes}
//                 />
//                 <Button
//                   type="submit"
//                   sx={{ display: "none" }}
//                   ref={refSubmitSecondStepButton}
//                 ></Button>
//               </Box>
//             )}
//           </Formik>

//           {/* start companion form */}
//           <PersonalDataComponent
//             initialValues={PersonEntity.defaultValue()}
//             onSubmit={handleCompanionSubmit}
//             isSubmitted={submitCompanionFlag}
//           />
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             height: "4rem",
//           }}
//         >
//           <PrimaryButton
//             title="تأكيــد"
//             type="button"
//             onClick={() => onTriggerRestAndPatientForm()}
//           />
//           <SecondaryButton
//             title="اضــــافة مـــرافق"
//             type="button"
//             onClick={() => {
//               setAddCompanionClicked(true);
//               onTriggerRestAndPatientForm();
//             }}
//             sx={{ display: showCompanionFlag ? "none" : "block" }}
//           />
//           <SecondaryButton
//             title="حذف مـــرافق"
//             type="button"
//             onClick={() => onDeleteCompanion()}
//             sx={{ display: showCompanionFlag ? "block" : "none" }}
//           />
//         </Box>
//       </Box>
//     </Dialog>
//   );
// };

// export default CompleteVisit;
