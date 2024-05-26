import RoomInterface from "../interfaces/room-interface";
import { Yup } from "@/core/shared/utils/validation";

export default class RoomEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): RoomInterface {
    return {
      id: "",
      name: "",
      location: "",
    };
  }

  static roomsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
      location: Yup.string().required("الموقع مطلوب"),
    });
  }
}
