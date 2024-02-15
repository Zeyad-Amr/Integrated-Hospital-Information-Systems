import { Yup } from "@/core/shared/utils/validation";
import { AdditionalDataInterface } from "../interfaces/additional-data-interface";
import store from "@/core/state/store";

export default class AdditionalDataEntity {

    static defaultValue(): AdditionalDataInterface {
        return {
            comeFrom: undefined,
            attendantName: undefined,
            attendantSSN: undefined,
            attendantSerialNumber: undefined,
            attendantRole: undefined,
            carNum: undefined,
            firstChar: undefined,
            secondChar: undefined,
            thirdChar: undefined,
            reason: undefined,
            place: undefined,
            notes: undefined,
        }
    }

    static getSchema(): Yup.ObjectSchema<any> {
        const state = store.getState();
        return Yup.object().shape({
            isAllOptional: Yup.bool(),
            comeFrom: Yup.number()
                .oneOf(state.lookups.lookups.cameFromOptions.map((e) => e.id)),
            attendantName: Yup.string()
                .when(["attendantSSN", "attendantRole", "attendantSerialNumber"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب إدخال اسم المحضر")
                    }
                    return schema
                })
                .min(3, "First name must be at least 3 characters")
                .max(45, "First name must be at most 45 characters"),
            attendantSSN: Yup.number().when(["attendantRole", "attendantSerialNumber", "attendantName"], (values, schema) => {
                if (!values.every((value) => value === undefined || value === "")) {
                    return schema.required("يجب إدخال الرقم القومي للمحضر")
                }
                return schema
            }),
            attendantSerialNumber: Yup.number()
                .when(["attendantName", "attendantSSN", "attendantRole"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب إدخال الرقم التعريفي")
                    }
                    return schema
                }),
            attendantRole: Yup.number()
                .oneOf(state.lookups.lookups.attendantRoles.map((e) => e.id))
                .when(["attendantSerialNumber", "attendantName", "attendantSSN"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب اختيار نوع المحضر")
                    }
                    return schema
                }),
            firstChar: Yup.string()
                .when(["secondChar", "thirdChar", "carNum"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب ادخال الحرف الاول ")
                    }
                    return schema
                })
                .max(1, "حرف واحد على الاكثر"),
            secondChar: Yup.string()
                .when(["firstChar"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب ادخال الحرف الثاني")
                    }
                    return schema
                })
                .max(1, "حرف واحد على الاكثر"),
            thirdChar: Yup.string()
                .max(1, "حرف واحد على الاكثر"),
            carNum: Yup.number()
                .when(["secondChar", "firstChar"], (values, schema) => {
                    if (!values.every((value) => value === undefined || value === "")) {
                        return schema.required("يجب إدخال رقم سيارة الاسعاف")
                    }
                    return schema
                }),
            reason: Yup.string(),
            place: Yup.string(),
            notes: Yup.string(),
        }, [
            ["attendantName", "attendantSerialNumber"],
            ["attendantName", "attendantSSN"],
            ["attendantName", "attendantRole"],
            ["attendantSSN", "attendantRole"],
            ["attendantSSN", "attendantSerialNumber"],
            ["attendantSerialNumber", "attendantRole"],
            ["firstChar", "secondChar"],
            ["firstChar", "carNum"],
        ]).defined();
    }


}


