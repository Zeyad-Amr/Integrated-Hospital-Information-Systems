export interface SubDepartmentInterface {
  id?: string | number;
  name: string;
  roomId: string | number;
  specializationId: string | number;
  departmentId: string | number;
}
export interface SubDepartmentAssignFeaturesInterface {
  id?: string | number;
  AddedFeatures: {
    roleId: string | number;
    features: string[] | number[];
  };
  RemovedFeatures: {
    roleId: string | number;
    features: string[] | number[];
  };
}
