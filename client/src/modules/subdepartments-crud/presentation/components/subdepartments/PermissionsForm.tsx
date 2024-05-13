import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { FeaturesState, PermissionsState, RolesState } from "../../controllers/types";
import RoleInterface from "@/modules/subdepartments-crud/domain/interfaces/role-interface";
import FeatureInterface from "@/modules/subdepartments-crud/domain/interfaces/feature-interface";
import { getFeaturesList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/features-thunks";
import { getRolesList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/roles-thunks";
import { getPermissionsList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/permissions-thunks";
import PermissionInterface from "@/modules/subdepartments-crud/domain/interfaces/permission-interface";


const PermissionsForm = () => {
  const rolesState: RolesState = useAppSelector((state: any) => state.roles);
  const featuresState: FeaturesState = useAppSelector((state: any) => state.features);
  const permissionsState: PermissionsState = useAppSelector((state: any) => state.permissions);
  const getNameOfItemWithItsId = (id: string | number, listOfSearch: any) => {
    const targetEl = listOfSearch?.find((el: any) => el.id == id);
    return targetEl?.value ?? "";
  };
  const dispatch = useAppDispatch()

const getListOfFeaturesWithItsRole = () => {
    const newRolesWithFeaturesList: { id: any; features: any[] }[] = [];

    rolesState?.rolesList?.forEach((role: RoleInterface) => {
        const featuresOfSpecificRole: any[] = [];

        permissionsState?.permissionsList.forEach((permission: PermissionInterface) => {
            if (role.id == permission.roleId) {
                featuresOfSpecificRole.push(permission.featureId);
            }
        });

        newRolesWithFeaturesList.push({
            id: role.id,
            features: featuresOfSpecificRole
        });
    });
    return newRolesWithFeaturesList
};

  useEffect(() => {
    getListOfFeaturesWithItsRole()
  }, []);

  return (
    <Formik
      initialValues={{
        roles:
        getListOfFeaturesWithItsRole() || [],
      }}
      onSubmit={async (values: any) => {
        let removedFeatures : any = []
        let removedFeaturesWithItsRole : any = []
        values.roles.forEach((newRole: any) => {
            getListOfFeaturesWithItsRole().forEach((oldRole : any) => {
                if (newRole.id == oldRole.id) {
                    removedFeatures = oldRole?.features?.filter((feature: string) => !newRole?.features?.includes(feature)); 
                }
            })
            removedFeaturesWithItsRole.push({
                roleId : newRole.id,
                features : removedFeatures
            })
            console.log(removedFeaturesWithItsRole,'removedFeaturesForItsRole');
            console.log(values.roles,'values');
            console.log(getListOfFeaturesWithItsRole(),'getListOfFeaturesWithItsRole');
          });
      }}
      // validationSchema={SubDepartmentsEntity.subDepartmentsFormValidations()}
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
              {values.roles?.map((el: any, index: number) => (
                <Box key={index}>
                  <CustomSelectField
                    multiple
                    value={values.roles[index].features}
                    options={featuresState?.featuresList?.map(
                      (feature: FeatureInterface) => {
                        return {
                          id: feature.id,
                          value: feature.name,
                        };
                      }
                    )}
                    isRequired
                    name={`roles[${index}].features`}
                    label={`الميــزات ل ${getNameOfItemWithItsId(
                      el.id,
                      rolesState?.rolesList
                    )}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //   error={errors.features}
                    //   touched={touched.features}
                    width="100%"
                    sx={{ margin: "0" }}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
          <PrimaryButton title="حفــــظ" type="submit" />
        </Box>
      )}
    </Formik>
  );
};

export default PermissionsForm;
