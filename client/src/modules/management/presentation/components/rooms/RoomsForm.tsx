import CustomTextField from "@/core/shared/components/CustomTextField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import RoomEntity from "@/modules/management/domain/entities/room-entity";
import RoomInterface from "@/modules/management/domain/interfaces/room-interface";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import {
  createRoom,
  updateRoom,
} from "@/modules/management/presentation/controllers/thunks/room-thunks";
import { useAppDispatch } from "@/core/state/store";

interface RoomsFormProps {
  isEdit: boolean;
  setshowRoomForm: (isShown: boolean) => void;
  propsIntialValues?: RoomInterface;
}

const RoomsForm = ({
  isEdit,
  propsIntialValues,
  setshowRoomForm,
}: RoomsFormProps) => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={
        isEdit && propsIntialValues
          ? propsIntialValues
          : RoomEntity.defaultValue()
      }
      onSubmit={async (values) => {
        console.log(values);
        isEdit && propsIntialValues
          ? // in case edit mode
            dispatch(
              updateRoom({
                id: String(propsIntialValues.id),
                name: values.name,
                location: values.location,
              })
            ).then(() => {
              setshowRoomForm(false);
            })
          : // in case not edit mode
            dispatch(createRoom(values)).then(() => {
              setshowRoomForm(false);
            });
      }}
      validationSchema={RoomEntity.roomsFormValidations()}
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
            props={{
              type: "text",
            }}
          />
          <CustomTextField
            isRequired
            name="location"
            label="الموقع"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.location}
            touched={touched.location}
            width="100%"
            props={{
              type: "text",
            }}
          />

          <PrimaryButton
            title={isEdit ? "حفــــظ" : "اضـــافة"}
            type="submit"
          />
        </Box>
      )}
    </Formik>
  );
};

export default RoomsForm;
