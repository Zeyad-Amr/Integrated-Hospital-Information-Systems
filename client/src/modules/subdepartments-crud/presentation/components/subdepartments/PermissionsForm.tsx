import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Box, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  FeaturesState,
  PermissionsState,
  RolesState,
} from "../../controllers/types";
import RoleInterface from "@/modules/subdepartments-crud/domain/interfaces/role-interface";
import FeatureInterface from "@/modules/subdepartments-crud/domain/interfaces/feature-interface";
import { updateSubDepartmentAssignFeatures } from "@/modules/subdepartments-crud/presentation/controllers/thunks/sub-departments-thunks ";
import PermissionInterface from "@/modules/subdepartments-crud/domain/interfaces/permission-interface";
import { SubDepartmentsInterface } from "@/modules/subdepartments-crud/domain/interfaces/sub-departments-interface";

interface PermissionsFormProps {
  subDepartmentData?: SubDepartmentsInterface;
  setShowPermissionsForm: (isShown: boolean) => void;
}

const PermissionsForm = ({
  subDepartmentData,
  setShowPermissionsForm,
}: PermissionsFormProps) => {
  //   get data from store
  const dispatch = useAppDispatch();
  const rolesState: RolesState = useAppSelector((state: any) => state.roles);
  const featuresState: FeaturesState = useAppSelector(
    (state: any) => state.features
  );
  const permissionsState: PermissionsState = useAppSelector(
    (state: any) => state.permissions
  );

  //   function to get name of item using its id by searching it on its list
  const getNameOfItemWithItsId = (id: string | number, listOfSearch: any) => {
    const targetEl = listOfSearch?.find((el: any) => el.id == id);
    return targetEl?.value ?? "";
  };

  //  initialize features to each role by combining data between roles list and permissions list
  const getListOfFeaturesWithItsRole = () => {
    const newRolesWithFeaturesList: { roleId: any; features: any[] }[] = [];

    rolesState?.rolesList?.forEach((role: RoleInterface) => {
      const featuresOfSpecificRole: any[] = [];

      permissionsState?.permissionsList.forEach(
        (permission: PermissionInterface) => {
          if (
            role.id == permission.roleId &&
            permission.subdepartmentId == subDepartmentData?.id
          ) {
            featuresOfSpecificRole.push(permission.featureId);
          }
        }
      );

      newRolesWithFeaturesList.push({
        roleId: role.id,
        features: featuresOfSpecificRole,
      });
    });
    return newRolesWithFeaturesList;
  };

  //  get removed features to each role by comparing between old data list and new one
  const getListOfRemovedFeaturesWithItsRoleId = (values: any): any => {
    let removedFeatures: any = [];
    let removedFeaturesWithItsRoleId: any = [];
    values.roles.forEach((newRole: any) => {
      getListOfFeaturesWithItsRole().forEach((oldRole: any) => {
        if (newRole.roleId == oldRole.roleId) {
          removedFeatures = oldRole?.features?.filter(
            (feature: string) => !newRole?.features?.includes(feature)
          );
        }
      });
      removedFeaturesWithItsRoleId.push({
        roleId: newRole.roleId,
        features: removedFeatures,
      });
    });
    return removedFeaturesWithItsRoleId;
  };

//   initialize form 
  useEffect(() => {
    getListOfFeaturesWithItsRole();
  }, []);

  return (
    <Formik
      initialValues={{
        roles: getListOfFeaturesWithItsRole() || [],
      }}
      onSubmit={async (values: any) => {
        const removedFeaturesWithItsRoleId =
          getListOfRemovedFeaturesWithItsRoleId(values);
        if (removedFeaturesWithItsRoleId) {
          dispatch(
            updateSubDepartmentAssignFeatures({
              id: subDepartmentData?.id,
              AddedFeatures: values.roles,
              RemovedFeatures: removedFeaturesWithItsRoleId,
            })
          ).then(() => {
            setShowPermissionsForm(false);
          });
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {values.roles?.map((roleEl: any, index: number) => (
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
                      roleEl.roleId,
                      rolesState?.rolesList
                    )}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
