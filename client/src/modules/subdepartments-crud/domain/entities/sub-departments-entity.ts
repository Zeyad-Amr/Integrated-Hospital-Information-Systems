import { Yup } from "@/core/shared/utils/validation";
import SubDepartmentsInterface from "../interfaces/sub-departments-interface";

export default class SubDepartmentsEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): SubDepartmentsInterface {
    return {
      id: "",
      name: "",
      roomId: "",
      departmentId: "",
      specializationId: "",
    };
  }

  static subDepartmentsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(45, "Name must be at most 45 characters"),
      departmentId: Yup.string().required("department is required"),
      roomId: Yup.string().required("room is required"),
      specializationId: Yup.string().required("specialization is required"),
    });
  }
}
