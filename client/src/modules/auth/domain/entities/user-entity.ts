import { Yup } from "@/core/shared/utils/validation";
import UserInterface from "../interfaces/user-interface";
export default class UserEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        return {
            id: '',
            roleId: undefined,
            shiftId: undefined,
            suDepartmentIds: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            person: undefined,
            auth: undefined,
        };
    }

    static getSchema(): Yup.ObjectSchema<any> {
        return Yup.object().shape({
            roleId: Yup.string().required("الوظيفة مطلوب"),
            shiftId: Yup.string().required("موعد العمل مطلوب"),
            // suDepartmentIds: 
            //        Yup.number()
            //     .oneOf(state.lookups.lookups.departments.map((e : any ) => e.id)).required("القسم الفرعي مطلوب"),

        }).defined();
    }


}
