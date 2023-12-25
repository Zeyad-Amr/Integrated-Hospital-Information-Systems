import { Yup } from "@/core/shared/utils/validation";
import UserInterface from "../interfaces/user-interface";
import store from "@/core/state/store";

export default class UserEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): UserInterface {
        return {
            id: '',
            role: undefined,
            shift: undefined,
            department: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            person: undefined,
            auth: undefined,
        };
    }

    static getSchema(): Yup.ObjectSchema<any> {
        const state = store.getState();
        return Yup.object().shape({
            role: Yup.number()
                .oneOf(state.lookups.lookups.roleTypes.map((e) => e.id)).required("الوظيفة مطلوب"),
            shift: Yup.number()
                .oneOf(state.lookups.lookups.shiftTypes.map((e) => e.id)).required("موعد العمل مطلوب"),
            department: Yup.string()
                .oneOf(state.lookups.lookups.departments.map((e) => e.id)).required("القسم مطلوب"),

        }).defined();
    }


}
