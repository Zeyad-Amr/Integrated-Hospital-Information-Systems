import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import RoomEntity from '@/modules/subdepartments-crud/domain/entities/room-entity';
import RoomInterface from '@/modules/subdepartments-crud/domain/interfaces/room-interface';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { createRoom ,deleteRoom ,getRoomDetails ,getRoomList ,updateRoom } from "@/modules/subdepartments-crud/presentation/controllers/thunks/room-thunks";
import { useAppDispatch } from '@/core/state/store';


interface RoomsFormProps {
    edit?: boolean;
    setShawDialog : any
    propsIntialValues?: RoomInterface
}

const RoomsForm = ({ edit, propsIntialValues , setShawDialog }: RoomsFormProps) => {
    
    const dispatch = useAppDispatch();
    useEffect(() => {
    //   debugger  
      console.log(propsIntialValues,'propsIntialValues');
      const data = edit && propsIntialValues ? propsIntialValues: RoomEntity.defaultValue()
      console.log(String(data.id),'data');
      
    }, [propsIntialValues])
    
    return (
        <Formik
            initialValues={edit && propsIntialValues ? propsIntialValues : RoomEntity.defaultValue()}
            onSubmit={ async (values) => { 
                console.log(values) ; 
                edit && propsIntialValues ? dispatch(updateRoom({
                    id : String(propsIntialValues.id),
                    name : values.name,
                    location : values.location,
                })) : dispatch(createRoom(values))
                dispatch(getRoomList())
                setShawDialog('none')
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
                        title={edit ? "حفــــظ" : "اضـــافة"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default RoomsForm