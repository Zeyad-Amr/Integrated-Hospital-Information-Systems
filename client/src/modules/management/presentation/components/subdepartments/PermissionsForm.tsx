import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  PermissionsState,
  RoomState,
  SpecializationState,
} from "../../controllers/types";
import { updateSubDepartmentAssignFeatures } from "@/modules/management/presentation/controllers/thunks/sub-departments-thunks";
import PermissionInterface from "@/modules/management/domain/interfaces/permission-interface";
import { SubDepartmentsInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import {
  FeatureInterface,
  RoleTypeInterface,
} from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";

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
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );

  const permissionsState: PermissionsState = useAppSelector(
    (state: any) => state.permissions
  );
  const roomsState: RoomState = useAppSelector((state: any) => state.rooms);
  const specializationsState: SpecializationState = useAppSelector(
    (state: any) => state.specializations
  );

  //   function to get name of item using its id by searching it on its list
  const getNameOfItemWithItsId = (id: any, listOfSearch: any) => {
    if (id && listOfSearch) {
      const targetEl = listOfSearch?.find((el: any) => el.id == id);
      return targetEl?.value ?? targetEl?.name ?? "";
    }
  };

  //  initialize features to each role by combining data between roles list and permissions list
  const getListOfFeaturesWithItsRole = () => {
    const newRolesWithFeaturesList: { roleId: any; features: any[] }[] = [];

    lookupsState.lookups.roleTypes?.forEach((role: RoleTypeInterface) => {
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
          <Box
            sx={{
              margin: "0rem 0rem 1rem 0rem",
              padding: "0.4rem 1rem",
              justifyContent: "space-between",
              display: "flex",
              backgroundColor: "#0f70f2",
              borderRadius: "6px",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ marginBottom: "0.5rem" }}>
                قسم فرعي : {subDepartmentData?.name}
              </Typography>
              <Typography>
                قسم :{" "}
                {getNameOfItemWithItsId(
                  subDepartmentData?.departmentId,
                  lookupsState.lookups.departments
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ marginBottom: "0.5rem" }}>
                غرفة :{" "}
                {getNameOfItemWithItsId(
                  subDepartmentData?.roomId,
                  roomsState?.rooms.items
                )}
              </Typography>
              <Typography>
                تخصص :
                {getNameOfItemWithItsId(
                  subDepartmentData?.specializationId,
                  specializationsState?.specializations.items
                )}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {values.roles?.map((roleEl: any, index: number) => (
                <Box key={index}>
                  <CustomSelectField
                    multiple
                    value={values.roles[index].features}
                    options={lookupsState.lookups.features
                      .filter(
                        (feature: FeatureInterface) =>
                          feature.subDepartmentId === subDepartmentData?.id
                      )
                      .map((feature: FeatureInterface) => {
                        return {
                          id: feature.id,
                          value: feature.value,
                        };
                      })}
                    isRequired
                    name={`roles[${index}].features`}
                    label={`الميــزات ل ${getNameOfItemWithItsId(
                      roleEl.roleId,
                      lookupsState.lookups.roleTypes
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
