import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import SecondaryButton from "@/core/shared/components/btns/SecondaryButton";


import { Formik } from "formik";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Button } from "@mui/material";
import CustomAccordion from "@/core/shared/components/CustomAccordion";
import AlertDialog from "@/core/shared/components/AlertDialog";
import AdditionalData from "@/modules/registration/presentation/components/AdditionalData";
import AdditionalDataEntity from "@/modules/registration/domain/entities/additional-data-entity";
import IncidentEntity from "@/modules/registration/domain/entities/incident-entity";
import CompanionList from "../CompanionList";
import CompanionForm from "../../CompanionForm";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import { CompanionInterface } from "@/modules/registration/domain/interfaces/visit-interface";

const AddIncidentForm = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [AdditionalDataAccordion, setAdditionalDataAccordion] =
    useState<boolean>(true);
  const [userDataAccordion, setUserDataAccordion] = useState<boolean>(false);
  // const [clickedBtnId, setClickedBtnId] = useState("");
  const [editing, setEditing] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const [companionsArray, setCompanionsArray] = useState<{}[]>([]);


  const [searchSSN, setSearchSSN] = useState<boolean>(true);


  const formRef = useRef(null);
  //* buttons useRef
  const refSubmitNumOfPatients: any = useRef(null);
  const refSubmitAdditionalData: any = useRef(null);
  const refSubmitCompanion: any = useRef(null);

  //* Handle Companion Submit
  const handleCompanionSubmit = (values: CompanionInterface) => {
    if (editing) {
      setSearchSSN(true)
      setCompanionsArray((previous) => {
        previous[index] = values
        return previous
      })
      setEditing(false)
    } else {
      setCompanionsArray((previous) => ([
        ...previous,
        values,
      ]))
      setEditing(false)
    }
  };

  return (
    <>
      <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} />

      <Formik
        initialValues={{
          numOfPatients: "",
        }}
        validationSchema={IncidentEntity.getNumOfPatientsSchema()}
        onSubmit={() => { }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box
            sx={{ marginTop: "1rem" }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Box>
              <CustomTextField
                isRequired
                name="numOfPatients"
                label="عدد المرضى"
                value={values.numOfPatients}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.numOfPatients}
                touched={touched.numOfPatients}
                width="100%"
                props={{
                  type: "number",
                }}
              />
              <Button
                type="submit"
                sx={{ display: "none" }}
                ref={refSubmitNumOfPatients}
              ></Button>
            </Box>
          </Box>
        )}
      </Formik>

      {/* //* Start Additional Data Accordion************************************************* */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={AdditionalDataAccordion}
        setExpanded={setAdditionalDataAccordion}
        title="البيــانات الاضـــافية"
        isClosable={false}
      >
        <AdditionalData
          initialValues={AdditionalDataEntity.defaultValue()}
          onSubmit={() => { }}
          refSubmitButton={refSubmitAdditionalData}
        />
      </CustomAccordion>


      {/* //* Start Companion Accordion************************************************* */}
      <CustomAccordion
        isDisabled={false}
        isExpanded={userDataAccordion}
        setExpanded={setUserDataAccordion}
        title="بيــانات المـــرافقين"
        isClosable={false}
      >
        <Box sx={{ display: "flex" }}>

          {/* //* Start Companion Form */}
          <Box sx={{ width: "75%" }}>
            <CompanionForm
              isResetForm
              initialValues={VisitEntity.companionDefaultValue()}
              validationSchema={VisitEntity.getCompanionSchema(true)}
              onSubmit={(values) => { return handleCompanionSubmit(values) }}
              refSubmitButton={refSubmitCompanion}
              searchSSN={searchSSN}
              innerFormRef={formRef}
            // newValues={companionFormValues}
            />
            <SecondaryButton
              id="add-comp-btn"
              title={editing ? "حفــــظ" : "اضــــافة"}
              type="button"
              onClick={() => {
                if (refSubmitCompanion.current) {
                  refSubmitCompanion.current.click()
                }
              }}
            />
          </Box>

          {/* //* Start Companion List */}
          <Box
            sx={{
              width: `25%`,
              paddingLeft: `1rem`,
              transition: "0.3s",
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                backgroundColor: "#eee",
                width: "100%",
                height: "100%",
              }}
            >
              <CompanionList
                companionsArray={companionsArray}
                companionFormRef={formRef}
                setSearchSSN={setSearchSSN}
                setEditing={setEditing}
                setIndex={setIndex}
              />
            </Box>
          </Box>
        </Box>
      </CustomAccordion>

      <PrimaryButton
        id="confirm-btn"
        title="حفـــظ"
        type="button"
        onClick={() => { }}
      />
    </>
  );
};

export default AddIncidentForm;
