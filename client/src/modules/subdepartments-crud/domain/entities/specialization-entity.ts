import SpecializationInterface from "../interfaces/specialization -interface";
import { Yup } from "@/core/shared/utils/validation";

export default class SpecializationEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): SpecializationInterface {
    return {
      id: "",
      name: "",
      description: "",
    };
  }

  static specializationsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل")
        .max(45, "يجب أن يتكون الاسم من 45 حرفًا كحد أقصى"),
      description: Yup.string().required("الوصف مطلوب"),
    });
  }
}
