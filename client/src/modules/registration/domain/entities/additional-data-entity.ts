import { Yup } from "@/core/shared/utils/validation";
import { AdditionalDataInterface } from "../interfaces/additional-data-interface";
import store from "@/core/state/store";

export default class AdditionalDataEntity {

    static defaultValue(): AdditionalDataInterface {
        return {
            comeFrom: 0,
            attendantName: "",
            attendantSSN: "",
            attendantSerialNumber: "",
            attendantRole: 0,
            carNum: "",
            firstChar: "",
            secondChar: "",
            thirdChar: "",
            reason: "",
            place: "",
            notes: "",
        }
    }

    static getSchema(): Yup.ObjectSchema<any> {
        const state = store.getState();
        const coditionCallback = (values: any[], schema: any, msg?: string, oneOfArr?: number[]) => {
            if (!values.every((value) => value === "" || value === undefined || value === 0)) {
                if (values[0] === 0 && oneOfArr) {
                    return schema.oneOf(oneOfArr, msg).required(msg)
                }
                return schema.required(msg)
            }
            return schema
        }

        return Yup.object().shape({
            comeFrom: Yup.number()
                .min(0)
                .max(state.lookups.lookups.cameFromOptions.length),
            attendantName: Yup.string()
                .when(["attendantSSN", "attendantRole", "attendantSerialNumber"], (values, schema) =>
                    coditionCallback(values, schema, "يجب إدخال اسم المحضر"))
                .min(3, "First name must be at least 3 characters")
                .max(45, "First name must be at most 45 characters"),
            attendantSSN: Yup.number().when(["attendantRole", "attendantSerialNumber", "attendantName"], (values, schema) =>
                coditionCallback(values, schema, "يجب إدخال الرقم القومي للمحضر")
            ),
            attendantSerialNumber: Yup.number()
                .when(["attendantName", "attendantSSN", "attendantRole"], (values, schema) =>
                    coditionCallback(values, schema, "يجب إدخال الرقم التعريفي")
                ),
            attendantRole: Yup.number()
                .when(["attendantRole", "attendantSerialNumber", "attendantName", "attendantSSN"], (values, schema) =>
                    coditionCallback(values, schema, "يجب اختيار نوع المحضر", state.lookups.lookups.attendantRoles.map((e) => +e.id))
                ),
            firstChar: Yup.string()
                .when(["secondChar", "thirdChar", "carNum"], (values, schema) =>
                    coditionCallback(values, schema, "يجب ادخال الحرف الاول ")
                )
                .max(1, "حرف واحد على الاكثر"),
            secondChar: Yup.string()
                .when(["firstChar"], (values, schema) =>
                    coditionCallback(values, schema, "يجب ادخال الحرف الثاني")
                )
                .max(1, "حرف واحد على الاكثر"),
            thirdChar: Yup.string()
                .max(1, "حرف واحد على الاكثر"),
            carNum: Yup.number()
                .when(["secondChar", "firstChar"], (values, schema) =>
                    coditionCallback(values, schema, "يجب إدخال رقم سيارة الاسعاف")
                ),
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
            ["attendantRole", "attendantRole"],
            ["firstChar", "secondChar"],
            ["firstChar", "carNum"],
        ]).defined();
    }


}


