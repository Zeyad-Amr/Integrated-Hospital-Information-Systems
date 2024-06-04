import { Yup } from "@/core/shared/utils/validation";
import UserInterface from "../interfaces/user-interface";
export default class UserEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): UserInterface {
    return {
      id: "",
      roleId: undefined,
      shiftId: undefined,
      subDepartmentIds: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      person: undefined,
      auth: undefined,
    };
  }

  static getSchema(): Yup.ObjectSchema<any> {
    return Yup.object()
      .shape({
        roleId: Yup.string().required("الوظيفة مطلوبة"),
        shiftId: Yup.string().required("موعد العمل مطلوب"),
        subDepartmentIds: Yup.array()
          .of(
            Yup.mixed().test(
              "is-string-or-number",
              "يجب أن تحتوي القائمة على أرقام أو نصوص فقط",
              (value) => typeof value === "number" || typeof value === "string"
            )
          )
          .required("القسم الفرعي مطلوب")
          .min(1, "يجب أن تحتوي القائمة على عنصر واحد على الأقل"),
      })
      .defined();
  }
}
