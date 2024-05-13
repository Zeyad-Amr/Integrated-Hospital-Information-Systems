import CustomSelectField from '@/core/shared/components/CustomSelectField';
import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/core/state/store';
import SubDepartmentsEntity from '@/modules/subdepartments-crud/domain/entities/sub-departments-entity';
import SubDepartmentsInterface from '@/modules/subdepartments-crud/domain/interfaces/sub-departments-interface';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { RoomState, SpecializationState, DepartmentsState } from '../../controllers/types';
import RoomInterface from '@/modules/subdepartments-crud/domain/interfaces/room-interface';
import SpecializationInterface from '@/modules/subdepartments-crud/domain/interfaces/specialization -interface';
import DepartmentsInterface from '@/modules/subdepartments-crud/domain/interfaces/departments-interface';
import { getDepartmentsList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/departments-thunks";
import { createSubDepartment , updateSubDepartment } from "@/modules/subdepartments-crud/presentation/controllers/thunks/sub-departments-thunks ";


interface SubDepartmentsFormProps {
    edit?: boolean;
    propsIntialValues?: SubDepartmentsInterface
}

const SubDepartmentsForm = ({ edit, propsIntialValues }: SubDepartmentsFormProps) => {

    
    const roomsState : RoomState = useAppSelector((state: any) => state.rooms);
    const specializationsState : SpecializationState = useAppSelector((state: any) => state.specializations);
    const departmentsState : DepartmentsState = useAppSelector((state: any) => state.departments);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getDepartmentsList())
    }, [])
    
    

    return (
        <Formik
            initialValues={edit && propsIntialValues ? propsIntialValues : SubDepartmentsEntity.defaultValue()}
            onSubmit={async (values) => { 
                console.log(values) ; 
                edit && propsIntialValues ? 
                // in case edit mode
                dispatch(updateSubDepartment({
                    id : String(propsIntialValues.id),
                    name : values.name,
                    departmentId : values.departmentId,
                    roomId : values.roomId,
                    specializationId : values.specializationId
                })).then(() => {
                    // setShowDialog('none')
                })
                : 
                // in case not edit mode
                dispatch(createSubDepartment(values)).then(() => {
                    // setShowDialog('none')
                })
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
                                sx={{ margin: '0' }}
                                props={{
                                    type: "text",
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                value={values.departmentId}
                                options={departmentsState?.departmentsList?.map((department: DepartmentsInterface) => {
                                    return {
                                      id: department.id,
                                      value: department.name,
                                    };
                                  })}
                                isRequired
                                name="departmentId"
                                label="القســــم"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.departmentId}
                                touched={touched.departmentId}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                options={roomsState?.roomList.map((room : RoomInterface) => {
                                    return {
                                    id : room.id, 
                                    value : room.name 
                                    }
                                } )}
                                isRequired
                                name="roomId"
                                label="الغـــرفة"
                                value={values.roomId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.roomId}
                                touched={touched.roomId}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <CustomSelectField
                                options={specializationsState?.specializationList.map((specialization: SpecializationInterface) => {
                                    return {
                                      id: specialization.id,
                                      value: specialization.name,
                                    };
                                  })}
                                isRequired
                                name="specializationId"
                                label="التخصص"
                                value={values.specializationId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.specializationId}
                                touched={touched.specializationId}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid>
                        {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                            <CustomSelectField
                                multiple
                                value={values.features}
                                options={[{ id: '1', value: 'one' }, { id: '2', value: 'two' }, { id: '3', value: 'three' }]}
                                isRequired
                                name="features"
                                label="الميــزات"
                                // value={values.features}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // error={errors.features}
                                // touched={touched.features}
                                width="100%"
                                sx={{ margin: '0' }}


                            />
                        </Grid> */}
                    </Grid>
                    <PrimaryButton
                        title={edit ? "حفــــظ" : "اضـــافة"}
                        type="submit"
                    />
                </Box>
            )}
        </Formik>
    )
}

export default SubDepartmentsForm