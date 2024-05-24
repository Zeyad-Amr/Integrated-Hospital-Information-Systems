import { Yup } from "@/core/shared/utils/validation";
import UserInterface from "../interfaces/user-interface";
export default class UserEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        return {
            id: '',
            role: undefined,
            shift: undefined,
            suDepartmentIds: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            person: undefined,
            auth: undefined,
        };
    }

    static getSchema(): Yup.ObjectSchema<any> {
        return Yup.object().shape({
            // role: Yup.number()
            //     .oneOf(state.lookups.lookups.roleTypes.map((e : any) => e.id)).required("الوظيفة مطلوب"),
            // shift: Yup.number()
            //     .oneOf(state.lookups.lookups.shiftTypes.map((e : any) => e.id)).required("موعد العمل مطلوب"),
            // suDepartmentIds: 
            //        Yup.number()
            //     .oneOf(state.lookups.lookups.departments.map((e : any ) => e.id)).required("القسم الفرعي مطلوب"),

        }).defined();
    }


}
