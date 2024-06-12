import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CustomTextField from "@/core/shared/components/CustomTextField";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import FeaturedVideoRoundedIcon from "@mui/icons-material/FeaturedVideoRounded";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import { LookupsState } from "../modules/lookups/presentation/controllers/types";
import { useAppSelector } from "@/core/state/store";
import { ServiceKeys, sl } from "@/core/service-locator";
import { allValuesUndefined } from "../utils/object-operations";
import { GetPersonUseCase } from "../modules/person/domain/usecases";
import axios from "axios";
import OCR from "./ocr/OCR";
// import { getPerson } from "@/core/shared/modules/person/presentation/controllers/thunks/person-thunk";
interface PersonalDataProps {
  //   initialValues?: PersonInterface;
  //   onSubmit?: (values: PersonInterface) => void;
  //   refSubmitButton?: React.MutableRefObject<null>;
  //   validationSchema?: Yup.ObjectSchema<any>;
  //   isResetForm?: boolean;
  //   validateOnMount?: boolean;
  searchSSN?: boolean;
}

const extractSSNData = (
  SSN: string
): { gender: number; birthdate: string } | null => {
  if (SSN.length !== 14) {
    return null;
  }

  // Extract birthdate
  const twoDigitsYearBirth = parseInt(SSN.substring(1, 3), 10);
  const calculatedYear =
    (SSN.charAt(0) === "3" ? 2000 : 1900) + twoDigitsYearBirth;
  const month = parseInt(SSN.substring(3, 5), 10);
  const day = parseInt(SSN.substring(5, 7), 10);
  const birthdate = `${calculatedYear}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  // Extract gender
  const genderDigit = parseInt(SSN.charAt(12), 10);
  const gender = genderDigit % 2 === 0 ? 2 : 1; // 1 for male, 2 for female

  console.log(birthdate);

  return {
    gender,
    birthdate,
  };
};

// how to use useFormikContext mentioned in the documentation https://formik.org/docs/api/useFormikContext
const PersonalData = ({ searchSSN = true }: PersonalDataProps) => {
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  console.log(lookupsState, "lookupsState");

  const [loadingFront, setLoadingFront] = React.useState(false);
  const [successFront, setSuccessFront] = React.useState(false);

  const [loadingBack, setLoadingBack] = React.useState(false);
  const [successBack, setSuccessBack] = React.useState(false);
  const timer = React.useRef<number>();

  
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const fileInputRef = useRef<any>();
  const selectFile = () => {
    setShawDialog(true);
  };
  const [showDialog, setShawDialog] = useState<boolean>(false);
  const [sub, setSub] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedBack, setSelectedBack] = useState<any>(null);
  const [initialFormikValues, setInitialValues] = useState<PersonInterface>(
    PersonEntity.defaultValue()
  );

  const handleFileInput = (e: any) => {
    sub
      ? setSelectedFile(e.target.files[0])
      : setSelectedBack(e.target.files[0]);
    setSub(!sub);
    // setSelectedFile((prevSelectedFile:any) => {
    //   return [...prevSelectedFile, e.target.files[0]];
    // });
  };

  // integrate with model after take back SSN picture
  useEffect(() => {
    if (selectedBack !== null) {
      if (!loadingBack) {
        setSuccessBack(false);
        setLoadingBack(true);
        timer.current = window.setTimeout(() => {
          setSuccessBack(true);
          setLoadingBack(false);
        }, 2000);
      }
      axios.get("https://z749g.wiremockapi.cloud/ocr/extract").then(
        (response: any) => {
          console.log(response.data);
          const names = response.data.name.lastName.split(/\s+/);
          const updatedValues = {
            ...initialFormikValues,
            firstName: response.data.name.firstName,
            secondName: names[0],
            thirdName: names[1],
            fourthName: names[2],
            SSN: response.data.nationalId.nationalId,
            verificationMethod: 1,
          };
          setInitialValues(updatedValues);
          setTimeout(() => {
            setShawDialog(false);
          }, 2000);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }, [selectedBack]);

  useEffect(() => {
    if (!loadingFront) {
      setSuccessFront(false);
      setLoadingFront(true);
      timer.current = window.setTimeout(() => {
        setSuccessFront(true);
        setLoadingFront(false);
      }, 2000);
    }
  }, [selectedFile]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormikContext<PersonInterface>();

  useEffect(() => {
    const ssn = values?.SSN as string;

    if (ssn && ssn?.length === 14 && searchSSN) {
      const getPersonUseCase = sl.get<GetPersonUseCase>(
        ServiceKeys.GetPersonUseCase
      );

      const mergeSSNData = () => {
        const extractedData = extractSSNData(ssn);
        if (extractedData) {
          const updatedValues = {
            SSN: ssn,
            gender: extractedData.gender,
            birthDate: extractedData.birthdate,
            verificationMethod: 1,
          };
          setValues((prev) => ({ ...prev, ...updatedValues }));
        }
      };

      getPersonUseCase.call(ssn).then(
        (res: any) => {
          console.log(res, "res");
          if (!allValuesUndefined(res)) {
            setValues((prev) => ({
              ...prev,
              ...PersonEntity.handleFormValues(res),
            }));
          } else {
            mergeSSNData();
          }
        },
        (err: any) => {
          console.log("not find user by SSN Error", err);
          mergeSSNData();
        }
      );
    }
  }, [values.SSN, searchSSN]);

  return (
    <>
      {showDialog ? <OCR OCRStateController={setShawDialog} /> : null}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container columns={12} spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomSelectField<any>
              isRequired
              name="verificationMethod"
              label="نوع الهوية"
              value={values.verificationMethod}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.verificationMethod}
              touched={touched.verificationMethod}
              width="100%"
              options={lookupsState.lookups.identityTypes}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <CustomTextField
                isRequired
                name="SSN"
                label="رقم الهوية"
                value={values.SSN}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.SSN}
                touched={touched.SSN}
                width="100%"
                props={{
                  type: "text",
                }}
              />
              <Box
                sx={{
                  padding: "0",
                  marginLeft: "-0.5rem",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileInput}
                />
                <Box
                  sx={{
                    backgroundColor: "primary.dark",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomRightRadius: "10px",
                    borderTopRightRadius: "10px",
                    padding: "0.6rem 0.7rem 0.6rem 1rem",

                    cursor: "pointer",
                  }}
                  onClick={selectFile}
                >
                  <FeaturedVideoRoundedIcon />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomSelectField<any>
              isRequired
              name="gender"
              label="الجنس"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.gender}
              touched={touched.gender}
              width="100%"
              options={lookupsState.lookups.genderTypes}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomSelectField<any>
              isRequired
              name="governate"
              label="المحافظة"
              value={values.governate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.governate}
              touched={touched.governate}
              width="100%"
              options={lookupsState.lookups.governates}
            />
          </Grid>
        </Grid>
        <Grid container columns={12} spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="firstName"
              label="الاسم الأول"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName}
              touched={touched.firstName}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="secondName"
              label="الاسم الثاني"
              value={values.secondName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.secondName}
              touched={touched.secondName}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="thirdName"
              label="الاسم الثالث"
              value={values.thirdName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.thirdName}
              touched={touched.thirdName}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="fourthName"
              label="الاسم الرابع"
              value={values.fourthName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fourthName}
              touched={touched.fourthName}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
        </Grid>
        <Grid container columns={12} spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="birthDate"
              label="تاريخ الميلاد"
              value={values.birthDate?.toString()}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.birthDate}
              touched={touched.birthDate}
              width="100%"
              props={{
                type: "date",
              }}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <CustomTextField
              name="phone"
              label="رقم الهاتف"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <CustomTextField
              isRequired
              name="address"
              label="العنوان"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
              touched={touched.address}
              width="100%"
              props={{
                type: "text",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalData;
