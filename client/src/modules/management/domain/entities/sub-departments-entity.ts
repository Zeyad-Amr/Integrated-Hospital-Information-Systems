import { Yup } from "@/core/shared/utils/validation";
import { SubDepartmentsInterface } from "../interfaces/sub-departments-interface";

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
        .required("الاسم مطلوب")
        .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل")
        .max(45, "يجب أن يتكون الاسم من 45 حرفًا كحد أقصى"),
      departmentId: Yup.string().required("القسم مطلوب"),
      roomId: Yup.string().required("الغرفة مطلوبة"),
      specializationId: Yup.string().required("التخصص مطلوب"),
    });
  }
}
